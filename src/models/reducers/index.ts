// src/models/reducers/index.ts
import {
  CREATE_TODO,
  DELETE_TODO,
  CREATE_TYPE,
  DELETE_TYPE,
} from '../actions'

interface TodoAction {
  type: string;
  id: number;
  text: string;
}
interface OperateAction {
  type: string;
}
export interface TodoState {
  id: number;
  text: string;
  completed: boolean;
}
export interface OperateState {
  createCounter: number;
  deleteCounter: number;
}

export function todos(state: TodoState[] = [], action: TodoAction) {
  switch (action.type) {
    case CREATE_TODO: {
      return [...state, { id: action.id, text: action.text, completed: false }]
    }
    case DELETE_TODO: {
      return [...state].filter(({ id }) => id !== action.id)
    }
    default: {
      return state;
    }
  }
}

export function operateCounter(state: OperateState = { createCounter: 0, deleteCounter: 0 }, action: OperateAction) {
  const { createCounter, deleteCounter } = state;
  switch (action.type) {
    case CREATE_TYPE: {
      return { ...state, createCounter: createCounter + 1 }
    }
    case DELETE_TYPE: {
      return { ...state, deleteCounter: deleteCounter + 1 }
    }
    default: {
      return state;
    }
  }
}