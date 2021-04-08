const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const babelParser = require('@babel/parser')
const t = require('@babel/types')
const path = require('path')
const fs = require('fs')

const dataPros = []
const events = {
  '$emit': 'triggerEvent'
}
const lifeCycles = {
  'beforeCreated': 'created',
  'created': 'attached',
  'mounted': 'ready',
  'destroyed': 'detached'
}

const dataObserver = {
  'watch': 'observers',
  'computed': 'observers'
}

function collectionDataProps(nodeName, pros) {
  for (node of pros) {
    dataPros.push(node.key.name)
  }
}

function getComponentsNode(path) {
  const propertiesAST = path.node.declaration.properties;
  const objectExpression = t.objectExpression(propertiesAST);
  const newAst = t.expressionStatement(
    t.callExpression(
      t.identifier('Compontents'), [
        objectExpression
      ]
    )
  )

  return newAst
}

function getDataObjNode(path) {
  const node = path.node
  const dataProps = node.body.body[0]['argument']['properties']

  collectionDataProps('data', dataProps)

  const objectExpression = t.objectExpression(dataProps)
  const ideData = t.identifier('data')
  const dataObjNode = t.objectProperty(ideData, objectExpression)

  return dataObjNode
}

function getDataProsNode(path) {
  const parent = path.parentPath
  if ((t.isAssignmentExpression(parent) && parent.get('left') === path) || t.isUpdateExpression(parent)) {
    const expressOld = path.findParent(parent =>
      parent.isExpressionStatement()
    )
    const { left, right } = expressOld.node.expression
    // const getLeft = expressOld.get('left')
    // const getRight = expressOld.get('right')
    const objKey = left.property
    const objVal = right
    const property = t.objectProperty(objKey, objVal)
    const objExpress = t.objectExpression([property])

    const idenProp = t.identifier('setData')
    const thisExpress = t.thisExpression()
    const memExpress = t.memberExpression(thisExpress, idenProp)
    const callExpress = t.callExpression(memExpress, [objExpress])

    const expressNew = t.expressionStatement(callExpress)

    expressOld.replaceWith(expressNew)

  } else {
    path.get('object').replaceWithSourceString('this.data')
  }
}

function getEventNode(path) {
  const name = path.node.property.name
  path.node.property.name = events[name]
}

function getLifeCycelsNode(path, name) {
  path.node.key.name = lifeCycles[name]
}

function hintObserver(path) {
  const nextPath = path.getAllNextSiblings()
  const prePath = path.getAllPrevSiblings()
  const allPath = [...prePath, ...nextPath]

  // const allProperties = path.parentPath.node.value.properties
  let alReadyHasObservers = false
  let oldObserverPath = null
  
  for (let subPath of allPath) {
    if (subPath.node.key.name === 'observers') {
      alReadyHasObservers = true
      oldObserverPath = subPath
      break
    }
  }

  return {
    alReadyHasObservers,
    oldObserverPath
  }
}

function hitDataPath(currentPath) {
  const allSiblings = [...currentPath.getAllPrevSiblings(), ...currentPath.getAllNextSiblings()]
  const dataPathIndex = allSiblings.findIndex(sib => {
    const name = sib.node.key ? sib.node.key.name : ''
    return name === 'data'
  })
  const dataPath = allSiblings[dataPathIndex]
  // const dataType = dataPath.node.type
  // console.info('***dataType: ', dataType)

  return {
    allParentPath: allSiblings,
    dataPath,
    dataPathIndex
  }
}

function createObserverProperty(observerProperties) {
  const property = t.objectProperty(t.identifier('observers'), t.objectExpression(observerProperties))
  return property
}

function getWatchObserversNode(path, name) {
  // find(callback) findParent(callback) // 'getAllPrevSiblings' // 'getAllNextSiblings'

  const { alReadyHasObservers, oldObserverPath } = hintObserver(path)
  const { properties } = path.node.value

  for(let property of properties) {
    let keyName = property.key.name
    if (!t.isStringLiteral(property.key)) {
      property.key = t.stringLiteral(keyName)
    }
  }

  if (!alReadyHasObservers) {
    path.node.key.name = dataObserver[name]
  } else {
    const oldProperties = oldObserverPath.node.value.properties
    oldObserverPath.node.value.properties = [...oldProperties, ...properties]
    path.remove()
  }
}

function genObserverBody(fnPath) {
  // const resStr = 'res'
  // const returnNode = t.returnStatement(t.identifier(resStr))
  // const fnExpress = t.functionExpression(null, [], fnPath.node.body)
  // const fnCall = t.callExpression(fnExpress, [])
  // const varDeclarator = t.variableDeclarator(t.identifier(resStr), fnCall)
  // const constStament = t.variableDeclaration('const', [varDeclarator])
  // const body = t.blockStatement([constStament, returnNode])

  // return body

  const fnName = fnPath.node.key ? fnPath.node.key.name : ''
  const fnExpress = t.functionExpression(null, [], fnPath.node.body)
  const fnCall = t.callExpression(fnExpress, [])
  
  const property = t.objectProperty(t.identifier(fnName), fnCall)
  const properties = t.objectExpression([property])

  const memberExpress = t.memberExpression(t.thisExpression(), t.identifier('setData'))
  const arguments = [properties]

  const expressBody = t.expressionStatement(t.callExpression(memberExpress, arguments))
  const body = t.blockStatement([expressBody])

  return body
}

function getComputedObserversNode(currentPath) {
  const { allParentPath, dataPath } = hitDataPath(currentPath)
  // dataPath.node.value.properties
  let { alReadyHasObservers, oldObserverPath } = hintObserver(currentPath)
  const observerProperties = []

  currentPath.traverse({
    ObjectMethod(fnPath) {
      const fnName = fnPath.node.key ? fnPath.node.key.name : ''
      const observerPropsNames = []

      // console.info('****ObjectMethod****', fnName)

      fnPath.traverse({
        MemberExpression(path) {
          const name = path.node.property.name
          const type = path.node.object.type
          // console.info('*****ThisExpression*****', type, name)

          if (type === 'ThisExpression' && dataPros.includes(name)) {
            observerPropsNames.push(name)
            getDataProsNode(path)
          }
        }
      }, fnPath)
      
      // console.info('****observerPropsNames****', observerPropsNames)

      if (observerPropsNames.length > 0 && fnName) {
        const dataPro = t.objectProperty(t.identifier(fnName), t.stringLiteral(''))
        dataPath.node.value.properties.push(dataPro)

        const observerBody = genObserverBody(fnPath)
        const observerPropsItem = t.objectMethod('method', t.stringLiteral(observerPropsNames.join(', ')), [], observerBody)
        observerProperties.push(observerPropsItem)
      }
    }
  }, currentPath)

  if (!alReadyHasObservers) {
    observerNode = createObserverProperty(observerProperties)
    const observerIndex = allParentPath.findIndex(sPath => {
      const name = sPath.node.key ? sPath.node.key.name : ''
      return name === 'methods'
    })
    currentPath.parentPath.node.properties.splice(observerIndex - 1, 0, observerNode)
  } else {
    oldObserverPath.node.properties = oldObserverPath.node.properties.concat(observerProperties)
  }
  currentPath.remove()
}

const code = fs.readFileSync(path.join(__dirname, '../assets/vuejs/index.vue'), {
  encoding: 'utf8'
})

let ast = babelParser.parse(code, {
  ast: true,
  allowUndeclaredExports: true,
  sourceType: 'module'
  // 'plugins': [
  //   ['@babel/plugin-proposal-decorators', { 'legacy': true }]
  // ]
})

traverse(ast, {
  // enter(path) {
  //   // // console.info('path.node.name: ', path.node.type, path.node.name)
  //   // const { type, name } = path.node
  //   // if (type === 'Identifier' && name === 'props') {
  //   //   path.node.name = 'properties'
  //   // }
  //   console.info('*****enter****', path.node.type, path.node.name || path.node.kind)
  // },

  ObjectMethod(path) {
    const node = path.node
    const key = node.key
    const name = key ? key.name : ''

    // console.info('*****ObjectMethod****', name)

    if (name === 'data') {
      const datdObjNode = getDataObjNode(path)
      path.replaceWith(datdObjNode)
    } else if (lifeCycles.hasOwnProperty(name)) {
      getLifeCycelsNode(path, name)
    } else {}
  },

  ObjectProperty(path) {
    const { type, key } = path.node
    const { name } = key

    // console.info('*****ObjectProperty****', type, name)

    if (name === 'props') {
      path.node.key.name = 'properties'
      const pros = path.node.value.properties
      collectionDataProps('pros', pros)
    }

    if (name === 'default') {
      path.node.key.name = 'value'
    }

    if (name === 'watch') {
      getWatchObserversNode(path, name)
    }

    if (name === 'computed') {
      getComputedObserversNode(path)
    }
  },

  // ObjectExpression(path) {
  //   const key = path.parent.key
  //   const name = key ? key.name : ''

  //   console.info('*****objectExpression****', name)

  //   if (name === 'computed') {
  //     getComputedObserversNode(path, name)
  //   }
  // },

  MemberExpression(path) {
    const name = path.node.property.name
    const type = path.node.object.type

    // console.info('*****MemberExpression****', name, dataPros)

    if (type === 'ThisExpression' && dataPros.includes(name)) {
      getDataProsNode(path)
    }

    if (type === 'ThisExpression' && events.hasOwnProperty(name)) {
      getEventNode(path)
    }
  },

  ExportDefaultDeclaration(path) {
    if (path.node.type === 'ExportDefaultDeclaration') {
      if (path.node.declaration.properties) {
        const newNode = getComponentsNode(path)
        path.replaceWith(newNode)
      }
    }
  }
})

const genCode = generate(ast, {
  ast: true,
  filename: 'testComponent'
}, code)

fs.writeFileSync(path.join(__dirname, '../tmp/test-component.js'), genCode.code, {
  encoding: 'utf8'
})
