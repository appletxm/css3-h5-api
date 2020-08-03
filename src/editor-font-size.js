let options = {}
let range = null
let selection = null

function closeList() {
  const list = options.bindObj.querySelector('.font-size-list')
  const button = list.parentNode

  if (button.classList.contains('show-list')) {
    button.classList.toggle('show-list')
  }
}

function showList() {
  const list = options.bindObj.querySelector('.font-size-list')
  const button = list.parentNode
  button.classList.toggle('show-list')
}

function setFontSize(event) {
  const dom = event.target
  const size = dom.getAttribute('size')
  const cssText = 'span[size-attr="font-size"]'

  // var nodes = range.cloneContents()
  const nodes = range.extractContents()
  const alreadyBoldNode = nodes.querySelector(cssText)
  // console.info('alreadyBoldNode:', alreadyBoldNode)

  let spanDom = null
  if(!alreadyBoldNode) {
    spanDom = document.createElement('span')
    spanDom.appendChild(nodes)
    // range.surroundContents(span)
  } else {
    const subBoldNode = alreadyBoldNode.closest(cssText)
    if(subBoldNode === alreadyBoldNode) {
      spanDom = document.createElement('span')
      let childNodes = Array.from(alreadyBoldNode.childNodes)
      childNodes.forEach(node => {
        // console.info(node)
        spanDom.appendChild(node)
      })
    }
  }

  spanDom.setAttribute('size-attr', 'font-size')
  spanDom.style.fontSize = size + 'px'
  range.insertNode(spanDom)
}

export const toggleSizeList = function(curRange, curSelection) {
  range = curRange
  selection = curSelection
  showList()
}

export const addEvent = function() {
  const list = options.bindObj.querySelector('.font-size-list')
  document.addEventListener('click', () => {
    closeList()
  })

  list.addEventListener('click', (event) => {
    setFontSize(event)
  })
}

export const init = function(config) {
  options = config
  addEvent()
}
