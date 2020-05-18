const compose = function(...fns) {
  if (fns.length === 1) {
    return fns[0]
  }

  const curryFns = fns.reduce((a, b) => {
    return function(...args) {
      return b(a(...args))
    }
  })

  return curryFns
}

export default compose
