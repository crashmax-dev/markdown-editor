import { el } from 'redom'
import { marked } from 'marked'
import { FileReader } from './file-reader'

const app = document.querySelector('#app')!

async function main() {
  const reader = new FileReader()

  const openFile = el('div', {
    className: 'open-file',
    onclick: () => {
      reader
        .open()
        .then((file) => {
          textarea.value = file
          preview.innerHTML = marked(file)
          openFile.classList.add('hide')
        })
    }
  })

  const editor = el('div', {
    className: 'editor'
  })

  const preview = el('div', {
    className: 'preview'
  })

  const textarea = el('textarea', {
    oninput: () => {
      const text = textarea.value
      reader
        .save(text)
        .then(() => preview.innerHTML = marked(text))
    },
    onkeydown: (event: KeyboardEvent) => {
      if (event.key == 'Tab') {
        event.preventDefault()
        document.execCommand('insertText', false, '  ')
      }
    },
    onscroll: () => {
      preview.scrollTop = textarea.scrollTop
    }
  })

  app.appendChild(openFile)
  editor.appendChild(textarea)
  editor.appendChild(preview)
  app.appendChild(editor)
}

main()
