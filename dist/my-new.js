export default function myNew(fun) {
  var params = Array.prototype.slice.call(arguments, 1);
  var ret = {};

  ret.__proto__ = fun.prototype;
  fun.apply(ret, params);

  return ret;
}