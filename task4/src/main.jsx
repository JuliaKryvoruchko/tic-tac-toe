import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const defaultState = {
  board: Array(9).fill(null),
  isXPlaying: true,
  messages: new Array(),
  currentWinner: null,
  scores: {
    x: 0,
    o: 0
  }
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_WINNER':
      return { ...state, currentWinner: action.payload };
    case 'UPDATE_BOARD':
      return { ...state, board: action.payload };
    case 'UPDATE_ISXPLAYING':
      return { ...state, isXPlaying: action.payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case 'UPDATE_SCORE':
      return {
        ...state,
        scores: {
          ...state.scores, [action.payload.player]: state.scores[action.payload.player] + 1
        }
      }
    default:
      return state
  }
}

const store = configureStore({
  reducer: reducer
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
