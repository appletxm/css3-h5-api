const { Parser, parseDOM, DomUtils } = require("htmlparser2")
const path = require('path')
const fs = require('fs')

let configOptions = null

let directives = {
  'v-show': '',
  'v-if': 'wx:if',
  'v-for': 'wx:for',
  'v-module': 'model:value',
  ':key': 'wx:key',
  'v-key': 'wx:key'
}

function resetStates() {
  dataPros = []
  componentsNodes = {}
  defaultComInmportIndexs = []
}

function analyseNode(parentNode) {
  
}

/***
 * Object {}
 * {
 *  src 
 *  dest
 *  ignore
 * }
*/
function doTransfer(options) {
  const { src, dest } = options

  configOptions = options

  const code = fs.readFileSync(src, { encoding: 'utf8' })
  
  resetStates()

  const parserDom = parseDOM(code)
  
  // const parser = new Parser({
  //   onopentag(tagname, attributes) {
  //     if (attributes.hasOwnProperty(':class')) {
  //       console.info('======', this)
  //       attributes[':class'] = '99999999999999'
  //       parser.updatePosition(-1)
  //     }
  //   },

  //   onattribname(attr) {
  //     console.info('##########', this, attr)
  //   },

  //   // ontext(text) {
  //   //   console.log("=====ontext ", text);
  //   // },
  //   // onclosetag(tagname) {
  //   //   console.info('===onclosetag ', tagname)
  //   // }
  // });
  // parser.write(code)
  // parser.end()

  console.info(parserDom[0]['attribs'][':disabled'])

  parserDom[0]['attribs'][':disabled'] = '9999'
  parserDom[0]['attribs'][':test'] = '{{cfg.prefix}}'

  console.info(DomUtils.getOuterHTML(parserDom[0]))

  let html = DomUtils.getOuterHTML(parserDom[0])
  
  html =  html.replace(/&apos;/g, '\'')

  fs.writeFileSync(dest, html, {encoding: 'utf8'})
}

doTransfer({
  src: path.join(__dirname, '../assets/vuejs/template.html'), 
  dest: path.join(__dirname, '../tmp/index.wxml')
})

module.exports = {
  doTransfer
}