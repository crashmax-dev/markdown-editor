import { el } from 'redom'
import { FileReader } from './file-reader'

const app = document.querySelector('#app')!

async function main() {
  const reader = new FileReader()
  const textarea = el('textarea', {
    onchange: () => reader
      .save(textarea.value)
  })

  const openButton = el('button', {
    onclick: () => reader
      .read()
      .then((v) => textarea.value = v.content)
  }, 'Open file')

  app.appendChild(openButton)
  app.appendChild(textarea)
}

main()
