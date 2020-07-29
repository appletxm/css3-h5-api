export const toggleBold = function(range, selection) {
  console.info(range, selection)

  // var nodes = range.cloneContents()
  const nodes = range.extractContents()
  console.dir(nodes.querySelector('span[bold-attr="bold"]'))

  const span = document.createElement('span')
  span.style.fontWeight = 'bold'
  span.setAttribute('bold-attr', 'bold')

  span.appendChild(nodes)
  range.insertNode(span)
  // range.surroundContents(span)


}
