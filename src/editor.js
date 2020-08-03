import * as editorUI from './editor-ui.js'
import { doDomObserver, disableObserver } from './editor-observer-dom.js'
import { toggleBold } from './editor-font-bold.js'
import { toggleItalic } from './editor-font-italic.js'
import { init as fontSizeInit, toggleSizeList} from './editor-font-size.js'

const defaultConfig = {
  bindObj: document.body
}

const Editor = class {
  constructor(config) {
    this.config = Object.assign(defaultConfig, config)
    this.domIsReady = false
    this.init()
  }

  init() {
    const { bindObj } = this.config
    const { editorHtml, optListHtml } = editorUI

    doDomObserver(bindObj, () => {
      this.domIsReady = true
      disableObserver()
      this.addEvent()
      fontSizeInit(this.config)
    })

    bindObj.innerHTML = editorHtml + optListHtml
  }

  addEvent() {
    const { bindObj } = this.config
    // const editorPanel = bindObj.querySelector('#editor')
    const editorIconPanel = bindObj.querySelector('.editor-opt')

    editorIconPanel.addEventListener('click', (event) => {
      event.stopPropagation()
      
      const eventName = event.target.getAttribute('event')
      const selection = document.getSelection()

      if (selection.isCollapsed) {
        return false
      }

      const range = selection.getRangeAt(0)

      // console.dir(eventName)

      if(eventName === 'text-bold') {
        toggleBold(range, selection)
      } else if (eventName === 'text-italic') {
        toggleItalic(range, selection)
      } else if (eventName === 'text-change-size') {
        toggleSizeList(range, selection)
      }
    })
  }

  removeEvent() {}
}

export default Editor
