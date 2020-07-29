export const toggleBold = function(range, selection) {
  console.info(range, selection)
  const cssText = 'span[bold-attr="bold"]'

  // var nodes = range.cloneContents()
  const nodes = range.extractContents()
  const alreadyBoldNode = nodes.querySelector(cssText)

  console.info('alreadyBoldNode:', alreadyBoldNode)

  if(!alreadyBoldNode) {
    const span = document.createElement('span')
    span.style.fontWeight = 'bold'
    span.setAttribute('bold-attr', 'bold')

    span.appendChild(nodes)
    range.insertNode(span)
    // range.surroundContents(span)
  } else {
    const subBoldNode = alreadyBoldNode.closest(cssText)
    if(subBoldNode === alreadyBoldNode) {
      const spanNew = document.createElement('span')
      let childNodes = Array.from(alreadyBoldNode.childNodes)

      childNodes.forEach(node => {
        console.info(node)
        spanNew.appendChild(node)
      })
      range.insertNode(spanNew)
    }
  }
}
