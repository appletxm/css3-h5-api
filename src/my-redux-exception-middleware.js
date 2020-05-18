const exceptionMiddleWare = function(store) {
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
      console.log('*****exception***')
      try {
        next(action)
      } catch (err) {
        console.error('错误报告: ', err)
      }
    }
  }
}

export default exceptionMiddleWare
