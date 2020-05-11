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

function getNode(obj) {
  let keys = Object.keys(obj)
  let child = []

  keys.forEach(key => {
    let item = {
      name: key
    }
    item.child = Object.keys(obj[key]).length > 0 ? getNode(obj[key]) : []
    child.push(item)
  })

  return child
}

function arrayToTree(arr) {
  let arrayToObj = arrayToObject(arr)
  let tree = getNode(arrayToObj)

  return tree
}

let array = [
  ['a', 'aa', 'aaa', 'aaaa'],
  ['b', 'bb', 'bbb'],
  ['a', 'ab', 'aba'],
  ['a', 'aa', 'aab']
]

console.info(arrayToTree(array))
