import { el } from '@zero-dependency/dom'
import { marked } from 'marked'
import { FileReader } from './file-reader.js'
import './index.css'

const app = document.querySelector('#app')!
const reader = new FileReader()

const openFile = el('div', {
  className: 'open-file',
  onclick: () => {
    reader.open().then((file) => {
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
    reader.save(text).then(() => (preview.innerHTML = marked(text)))
  },
  onkeydown: (event) => {
    if (event.key == 'Tab') {
      event.preventDefault()
      document.execCommand('insertText', false, '  ')
    }
  },
  onscroll: () => {
    preview.scrollTop = textarea.scrollTop
  }
})

app.append(openFile, editor)
editor.append(textarea, preview)
