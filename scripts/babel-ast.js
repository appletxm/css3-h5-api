const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const parse = require('@babel/parser')
const t = require('@babel/types')
const path = require('path')
const fs = require('fs')

 //创建  CallExpression  Component({})
 function insertBeforeFn(path) {
  //提取属性并存储
  const propertiesAST = path.node.declaration.properties;
  const objectExpression = t.objectExpression(propertiesAST);
  const newAst = t.expressionStatement(
      t.callExpression(//创建名为 Compontents 的调用表达式，参数为 objectExpression
          t.identifier("Compontents"),[
            objectExpression
          ]
      )
  )

  return newAst
}

const code = `
const cfg = require('component-cfg')

export default {
  name: 'Button',
  props: {
    size: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    autofocus: Boolean,
  },
  data() {
    return {
      cfg
    }
  },
  computed: {
    buttonSize() {
      return this.size;
    },
    buttonDisabled() {
      return this.disabled;
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
}
`

let ast = parse.parse(code, {
  ast: true,
  allowUndeclaredExports: true,
  sourceType: 'module',
  "plugins": [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
})

traverse(ast, {
  enter(path) {
    console.info('path.node.name: ', path.node.type, path.node.name)

    const { type, name } = path.node
    if (type === 'Identifier' && name === 'props') {
      path.node.name = 'properties'
    }
  }
})

traverse(ast, {
  enter(path) {
    console.info('path.node.name: ', path.node.type, path.node.name)
    const { type } = path.node
    if (type === 'ExportDefaultDeclaration') {
      if (path.node.declaration.properties) {
        ast = insertBeforeFn(path)          
      }
    }
  }
})

// traverse(ast, {
//   enter(path) {
//     console.info('path.node.name: ', path.node.type, path.node.name)

//     const { type, name } = path.node
//     if (type === 'Identifier' && name === 'props') {
//       path.node.name = 'properties'
//     }
//   }
// })

// traverse(ast, {
//   enter(path) {
//     console.info('path.node.name: ', path.node.type, path.node.name)

//     const {type, name} = path.node
//     if (type === 'Identifier' && name === 'props') {
//       path.node.name = 'properties'
//     } else if (type === 'Identifier' && name === 'data') {
//       console.info('======1=======', path.node)
//     } else if (type === 'ExportDefaultDeclaration') {
//       console.info('======2=======', path.node)
//       if (path.node.declaration.properties) {
//         //创建 AST 包裹对象
//         insertBeforeFn(path)          
//       }
//     } else {
//       // console.info('======2=======', path.node)
//     }
//   }
// })

const genCode = generate(ast, {
  ast: true,
  filename: 'testComponent'
}, code)

fs.writeFileSync(path.join(__dirname, '../tmp/test-component.js'), genCode.code, {encoding: 'utf8'})




