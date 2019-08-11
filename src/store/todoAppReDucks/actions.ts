import { ActionCreatorWithPayload } from "types/ReduxTypes"
import { TodoId, VisibilityFilter } from "domain/models/Todo"

export const ActionTypes = {
  ADD_TODO: "todoAppReDucks/ADD_TODO",
  CHANGE_TODO_LABEL: "todoAppReDucks/CHANGE_TODO_LABEL",
  CHANGE_VISIBILITY_FILTER: "todoAppReDucks/CHANGE_VISIBILITY_FILTER",
  DELETE_TODO: "todoAppReDucks/DELETE_TODO",
  TOGGLE_TODO_STATUS: "todoAppReDucks/TOGGLE_TODO_STATUS",
} as const

export const addTodo: ActionCreatorWithPayload<
  typeof ActionTypes.ADD_TODO,
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
  typeof ActionTypes.CHANGE_TODO_LABEL,
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
  typeof ActionTypes.CHANGE_VISIBILITY_FILTER,
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
  typeof ActionTypes.DELETE_TODO,
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
  typeof ActionTypes.TOGGLE_TODO_STATUS,
  {
    targetId: TodoId
  }
> = (payload) => {
  return {
    type: ActionTypes.TOGGLE_TODO_STATUS,
    payload,
  }
}
