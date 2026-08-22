export {}

declare global {
  interface SerialPort {
    open(options: { baudRate: number }): Promise<void>
    close(): Promise<void>
    readable: ReadableStream<Uint8Array> | null
    writable: WritableStream<Uint8Array> | null
  }

  interface SerialPortEventMap {
    connect: Event
    disconnect: Event
  }

  interface Serial {
    requestPort(): Promise<SerialPort>
    getPorts(): Promise<SerialPort[]>
    addEventListener<K extends keyof SerialPortEventMap>(
      type: K,
      listener: (this: Serial, ev: SerialPortEventMap[K]) => void,
    ): void
    removeEventListener<K extends keyof SerialPortEventMap>(
      type: K,
      listener: (this: Serial, ev: SerialPortEventMap[K]) => void,
    ): void
  }

  interface Navigator {
    serial?: Serial
  }
}
