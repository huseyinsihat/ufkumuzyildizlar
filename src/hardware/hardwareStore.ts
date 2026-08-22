import { create } from 'zustand'
import { applyHardwareCommand, parseHardwareLine } from './commands'

type HardwareStatus = 'idle' | 'connected' | 'unsupported' | 'error'

interface HardwareState {
  status: HardwareStatus
  lastLine: string
  message: string
  connect: (options?: { request?: boolean }) => Promise<void>
  disconnect: () => Promise<void>
  writeLine: (line: string) => Promise<void>
}

let port: SerialPort | null = null
let reader: ReadableStreamDefaultReader<Uint8Array> | null = null
let writer: WritableStreamDefaultWriter<Uint8Array> | null = null
let closed = true
let opening = false
const encoder = new TextEncoder()

async function closePort(): Promise<void> {
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
  reader = null
  try {
    await port?.close()
  } catch {
    /* already closed */
  }
  port = null
}

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
    useHardwareStore.setState({ status: 'error', message: 'Kart koptu. USB’yi takınca yeniden bağlanır.' })
  } finally {
    try {
      reader.releaseLock()
    } catch {
      /* already released */
    }
    reader = null
  }
}

async function openPort(next: SerialPort): Promise<void> {
  await closePort()
  port = next
  await port.open({ baudRate: 115200 })
  writer = port.writable?.getWriter() ?? null
  closed = false
  useHardwareStore.setState({ status: 'connected', message: '', lastLine: '' })
  void readLoop()
}

export const useHardwareStore = create<HardwareState>((set) => ({
  status: typeof navigator !== 'undefined' && navigator.serial ? 'idle' : 'unsupported',
  lastLine: '',
  message: '',
  connect: async (options) => {
    if (!navigator.serial) {
      set({ status: 'unsupported', message: '' })
      return
    }
    if (opening || (port && useHardwareStore.getState().status === 'connected')) return
    opening = true
    try {
      const known = await navigator.serial.getPorts()
      let next = known[0]
      if (!next && options?.request) next = await navigator.serial.requestPort()
      if (!next) return
      await openPort(next)
    } catch {
      if (options?.request) {
        set({ status: 'idle', message: '' })
      } else {
        set({ status: 'idle', message: '' })
      }
    } finally {
      opening = false
    }
  },
  disconnect: async () => {
    await closePort()
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

export function watchHardwarePorts(): () => void {
  const serial = navigator.serial
  if (!serial) return () => {}
  const onConnect = () => {
    void useHardwareStore.getState().connect()
  }
  const onDisconnect = () => {
    void useHardwareStore.getState().disconnect()
  }
  serial.addEventListener('connect', onConnect)
  serial.addEventListener('disconnect', onDisconnect)
  void useHardwareStore.getState().connect()
  const timer = window.setInterval(() => {
    if (useHardwareStore.getState().status === 'connected') return
    void useHardwareStore.getState().connect()
  }, 4000)
  return () => {
    serial.removeEventListener('connect', onConnect)
    serial.removeEventListener('disconnect', onDisconnect)
    window.clearInterval(timer)
  }
}
