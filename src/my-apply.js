export default function init() {
  Function.prototype.myApply = function(context, ...params) {
    let ctx = context || window
    let args = []
    let result
    // console.info(this, context, params)
    ctx.fn = this
    params.forEach(function(param, index) {
      args.push('params[' + index + ']')
    })
    console.info('fun string:', 'ctx.fn(' + args + ')')
    result = eval('ctx.fn(' + args + ')')
    delete ctx.fn

    return result
  }
}