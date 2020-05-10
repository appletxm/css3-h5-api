let tempObj = {}
function arrayToObject(arr) {
  if (!Array.isArray(arr)) {
    return arr
  }

  let pos = tempObj
  arr.forEach(item => {
    if (Array.isArray(item)) {
      item.forEach(cell => {
        if (!pos[cell]) {
          pos[cell] = {}
        }
        pos = pos[cell]
      })

      pos = tempObj
    }
  })

  return tempObj
}

function getNode(obj, levelStr = '') {
  let keys = Object.keys(obj)
  let children = []

  keys.forEach((key, index) => {
    index = index + 1
    let idStr = index >= 10 ? (levelStr + index) : (levelStr + '0' + index)
    let item = {
      id: idStr,
      label: key
    }
    if (Object.keys(obj[key]).length > 0) {
      item.children = getNode(obj[key], idStr)
    }
    children.push(item)
  })

  return children
}

function arrayToTree(arr) {
  let arrayToObj = arrayToObject(arr)
  let tree = getNode(arrayToObj, '')

  return tree
}

export default arrayToTree
