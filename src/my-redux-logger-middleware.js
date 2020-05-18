const logMiddleWare = function(store) {
  // return {
  //   ...store,
  //   dispatch(action) {
  //     console.log('current state', store.getState())
  //     console.log('action', action)
  //     next(action)
  //     console.log('next state', store.getState())
  //   }
  // }

  return function(next) {
    // do own way and then next
    return function(action) {
      console.log('*****logger***')
      // console.log('current state', store.getState())
      // console.log('action', action)
      next(action)
      // console.log('next state', store.getState())
    }
  }
}

export default logMiddleWare
