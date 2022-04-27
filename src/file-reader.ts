export class FileReader {
  private fileHandler: FileSystemFileHandle
  private options: OpenFilePickerOptions

  constructor() {
    this.options = {
      multiple: true,
      types: [
        {
          description: 'Text',
          accept: {
            'text/plain': ['.txt', '.md']
          }
        }
      ]
    }
  }

  get handler() {
    return this.fileHandler
  }

  async read() {
    const [fileHandle] = await showOpenFilePicker(this.options)

    const file = await fileHandle.getFile()
    const content = await file.text()
    this.fileHandler = fileHandle

    return {
      fileHandle,
      content
    }
  }

  async save(value: string) {
    const writable = await this.fileHandler.createWritable()
    await writable.write(value)
    await writable.close()
  }
}
