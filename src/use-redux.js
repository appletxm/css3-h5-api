import { combineReducers, createStore } from './my-redux'

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
