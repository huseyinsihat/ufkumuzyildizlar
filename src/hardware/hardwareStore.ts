import { create } from 'zustand'
import { applyHardwareCommand, parseHardwareLine } from './commands'

type HardwareStatus = 'idle' | 'connected' | 'unsupported' | 'error'

interface HardwareState {
  status: HardwareStatus
  lastLine: string
  message: string
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  writeLine: (line: string) => Promise<void>
}

let port: SerialPort | null = null
let reader: ReadableStreamDefaultReader<Uint8Array> | null = null
let writer: WritableStreamDefaultWriter<Uint8Array> | null = null
let closed = true
const encoder = new TextEncoder()

async function readLoop(): Promise<void> {
  if (!port?.readable) return
  const decoder = new TextDecoder()
  let buffer = ''
  reader = port.readable.getReader()
  try {
    while (!closed) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split(/\r?\n/)
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        const command = parseHardwareLine(line)
        if (!command) continue
        applyHardwareCommand(command)
        useHardwareStore.setState({ lastLine: line.trim() })
      }
    }
  } catch {
    closed = true
    useHardwareStore.setState({ status: 'error', message: 'Bağlantı koptu. USB kablosunu kontrol et.' })
  } finally {
    reader.releaseLock()
    reader = null
  }
}

export const useHardwareStore = create<HardwareState>((set) => ({
  status: typeof navigator !== 'undefined' && navigator.serial ? 'idle' : 'unsupported',
  lastLine: '',
  message: '',
  connect: async () => {
    if (!navigator.serial) {
      set({ status: 'unsupported', message: 'USB için Chrome veya Edge kullan.' })
      return
    }
    try {
      closed = true
      try {
        await reader?.cancel()
      } catch {
        /* already closed */
      }
      try {
        writer?.releaseLock()
      } catch {
        /* already closed */
      }
      writer = null
      try {
        await port?.close()
      } catch {
        /* already closed */
      }
      port = null
      reader = null
      port = await navigator.serial.requestPort()
      await port.open({ baudRate: 115200 })
      writer = port.writable?.getWriter() ?? null
      closed = false
      set({ status: 'connected', message: 'DeneyapKart bağlı.', lastLine: '' })
      void readLoop()
    } catch {
      set({ status: 'error', message: 'Kart seçilmedi veya port açılamadı. Yeniden bağla.' })
    }
  },
  disconnect: async () => {
    closed = true
    try {
      await reader?.cancel()
    } catch {
      /* already closed */
    }
    try {
      writer?.releaseLock()
    } catch {
      /* already closed */
    }
    writer = null
    try {
      await port?.close()
    } catch {
      /* already closed */
    }
    port = null
    set({ status: 'idle', message: '', lastLine: '' })
  },
  writeLine: async (line) => {
    if (!writer) return
    try {
      await writer.write(encoder.encode(`${line}\n`))
    } catch {
      /* port closed */
    }
  },
}))
