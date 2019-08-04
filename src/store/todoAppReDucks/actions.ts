import { ActionCreatorWithPayload } from "types/ReduxTypes"
import { TodoId, VisibilityFilter } from "domain/models/Todo"

export enum ActionTypes {
  ADD_TODO = "todoAppReDucks/ADD_TODO",
  CHANGE_TODO_LABEL = "todoAppReDucks/CHANGE_TODO_LABEL",
  CHANGE_VISIBILITY_FILTER = "todoAppReDucks/CHANGE_VISIBILITY_FILTER",
  DELETE_TODO = "todoAppReDucks/DELETE_TODO",
  TOGGLE_TODO_STATUS = "todoAppReDucks/TOGGLE_TODO_STATUS",
}

export const addTodo: ActionCreatorWithPayload<
  ActionTypes.ADD_TODO,
  {
    label: string
  }
> = (payload) => {
  return {
    type: ActionTypes.ADD_TODO,
    payload,
  }
}

export const changeTodoLabel: ActionCreatorWithPayload<
  ActionTypes.CHANGE_TODO_LABEL,
  {
    targetId: TodoId
    label: string
  }
> = (payload) => {
  return {
    type: ActionTypes.CHANGE_TODO_LABEL,
    payload,
  }
}

export const changeVisibilityFilter: ActionCreatorWithPayload<
  ActionTypes.CHANGE_VISIBILITY_FILTER,
  {
    visibilityFilter: VisibilityFilter
  }
> = (payload) => {
  return {
    type: ActionTypes.CHANGE_VISIBILITY_FILTER,
    payload,
  }
}

export const deleteTodo: ActionCreatorWithPayload<
  ActionTypes.DELETE_TODO,
  {
    targetId: TodoId
  }
> = (payload) => {
  return {
    type: ActionTypes.DELETE_TODO,
    payload,
  }
}

export const toggleTodoStatus: ActionCreatorWithPayload<
  ActionTypes.TOGGLE_TODO_STATUS,
  {
    targetId: TodoId
  }
> = (payload) => {
  return {
    type: ActionTypes.TOGGLE_TODO_STATUS,
    payload,
  }
}
