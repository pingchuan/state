// src/models/stores/index.ts
import { combineReducers, createStore } from 'redux'
import * as reducers from '../reducers'

const todoApp = combineReducers(reducers)
export default createStore(todoApp)