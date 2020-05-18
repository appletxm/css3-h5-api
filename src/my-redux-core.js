export default function createStore (reducer, initialState, rewriteCreateStoreFunc) {
  if (typeof initialState === 'function') {
    rewriteCreateStoreFunc = initialState
    initialState = undefined
  }

  if (typeof rewriteCreateStoreFunc === 'function') {
    const newCreateStore = rewriteCreateStoreFunc(createStore)
    return newCreateStore(reducer, initialState)
  }

  let state = initialState
  let listeners = []

  function subscribe(listener) {
    listeners.push(listener)
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  function dispatch(action) {
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  function replaceReducer(nextReducer) {
    reducer = nextReducer
    dispatch({ type: Symbol('init state') })
  }

  function getState() {
    return state
  }

  return {
    subscribe,
    dispatch,
    getState,
    replaceReducer
  }
}
