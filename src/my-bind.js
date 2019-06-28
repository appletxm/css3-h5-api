export default function init() {
  Function.prototype.myBind = function(context) {
    let ctx = context || window
    // let emptyFn = function() {}
    let boundFn
    let ctxType = ctx.constructor.name.toLowerCase()
    let self = this
    let params = Array.prototype.slice.call(arguments, 1)

    if (typeof this !== 'function') {
      throw new Error('need a function to be callable')
    }
    if (ctxType === 'function') {
      ctx = new ctx()
    } else if (ctxType === 'array') {
      ctx = context.__proto__
    }
    boundFn = function(...args) {
      args = params.concat(args)
      self.apply(ctx, args)
    }

    return boundFn
  }
}