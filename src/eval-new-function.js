window.x = 'window global'
let x = 'module global'
export default {
  evalInner() {
    let x = 'eval inner'
    eval('console.info(x)')
  },

  evalCall() {
    let x = 'eval inner'
    eval.call(null, 'console.info(x)')
  },

  newFunction() {
    let x = 'function inner'
    let fn = new Function('console.info(x)')
    fn()
  }
}



// const regexp = RegExp('foo*', 'g');
// const str = 'table football, foosball';
// let matches = str.matchAll(regexp);

// for (const match of matches) {
//   console.log(match);
// }
// matches = str.matchAll(regexp);