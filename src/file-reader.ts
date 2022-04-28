export class FileReader {
  private fileHandler: FileSystemFileHandle
  private options: OpenFilePickerOptions

  constructor() {
    this.options = {
      multiple: false,
      types: [
        {
          description: 'Markdown',
          accept: {
            'text/plain': ['.md']
          }
        }
      ]
    }
  }

  get handlers(): FileSystemFileHandle {
    return this.fileHandler
  }

  async open(): Promise<string> {
    const [fileHandler] = await showOpenFilePicker(this.options)
    await fileHandler.requestPermission({ mode: 'readwrite' })
    this.fileHandler = fileHandler

    const file = await fileHandler.getFile()
    const text = await file.text()
    return text
  }

  async save(data: string): Promise<void> {
    const writable = await this.fileHandler.createWritable()
    await writable.write(data)
    await writable.close()
  }
}
