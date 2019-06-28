export function myNew(fun) {
  let params = Array.prototype.slice.call(arguments, 1)
  let ret = {}

  ret.__proto__ = fun.prototype
  fun.appy(ret, params)
  return ret
}