const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const babelParser = require('@babel/parser')
const t = require('@babel/types')
const path = require('path')
const fs = require('fs')

const dataPros = []

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
    }
  },

  // ReturnStatement(path) {
  //   const parent = path.parentPath
  //   const ancester = parent && parent.parentPath

  //   if (ancester) {
  //     const node = ancester.node
  //     const key = node.key
  //     const name = key ? key.name : ''
  //     console.info('*****ReturnStatement****', name)
  //   }
  // },

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
  },

  // ObjectExpression(path) {
  //   const key = path.parent.key
  //   const name = key ? key.name : ''
  //   // console.info('*****objectExpression****', name)
    
  //   if (name === 'pros' || name === 'properties') {
  //     const pros = path.node.properties
  //     collectionDataProps('pros', pros)
  //   }
  // },

  MemberExpression(path) {
    const name = path.node.property.name
    const type = path.node.object.type

    console.info('*****MemberExpression****', name, dataPros)

    if (type === 'ThisExpression' && dataPros.includes(name)) {
      path.get('object').replaceWithSourceString('this.data');
      
      //判断是不是赋值操作
      if ((t.isAssignmentExpression(path.parentPath) && path.parentPath.get('left') === path) || t.isUpdateExpression(path.parentPath)) {
        const expressionStatement = path.findParent(parent =>
          parent.isExpressionStatement()
        )
      }
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

// traverse(ast, {
//   enter(path) {
//     console.info('path.node.name: ', path.node.type, path.node.name)
//     const { type } = path.node
//     if (type === 'ExportDefaultDeclaration') {
//       if (path.node.declaration.properties) {
//         const newNode = insertBeforeFn(path)
//         path.replaceWith(newNode)
//       }
//     }
//   }
// })

const genCode = generate(ast, {
  ast: true,
  filename: 'testComponent'
}, code)

fs.writeFileSync(path.join(__dirname, '../tmp/test-component.js'), genCode.code, {
  encoding: 'utf8'
})
