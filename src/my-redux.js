function createStore (reducer, initialState) {
  let state = initialState
  let listeners = []

  function subscribe(listener) {
    listeners.push(listener)
  }

  function dispatch(action) {
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  function getState() {
    return state
  }

  return {
    subscribe,
    dispatch,
    getState,
    combineReducers
  }
}

function combineReducers(reducers) {
  const reducersKeys = Object.keys(reducers)
  return function combination(state = {}, action) {
    const nextState = {}
    for (let i = 0; i < reducersKeys.length; i++) {
      const key = reducersKeys[i]
      const reducer = reducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)

      nextState[key] = nextStateForKey
    }

    return nextState
  }
}

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

function InfoReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state
  }
}

const initialState = {
  counter: {
    count: 0
  },
  info: {
    name: '',
    description: ''
  }
}
const reducers = combineReducers({
  counter: counterReducer,
  info: InfoReducer
})
const store = createStore(reducers, initialState)

store.subscribe(() => {
  let state = store.getState()
  console.log(state.counter.count, state.info.name, state.info.description)
})
store.dispatch({
  type: 'INCREMENT'
})
store.dispatch({
  type: 'SET_NAME',
  name: '前端九部2号'
})
