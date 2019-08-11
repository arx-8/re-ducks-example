import { Todo, VisibilityFilter } from "domain/models/Todo"
import { ActionCreator, ActionCreatorWithPayload } from "types/ReduxTypes"

export const ActionTypes = {
  ADD_TODO_STARTED: "todoAppAsync/ADD_TODO_STARTED",
  ADD_TODO_DONE: "todoAppAsync/ADD_TODO_DONE",
  UPDATE_TODO_STARTED: "todoAppAsync/UPDATE_TODO_STARTED",
  UPDATE_TODO_DONE: "todoAppAsync/UPDATE_TODO_DONE",
  CHANGE_VISIBILITY_FILTER: "todoAppAsync/CHANGE_VISIBILITY_FILTER",
  DELETE_TODO_STARTED: "todoAppAsync/DELETE_TODO_STARTED",
  DELETE_TODO_DONE: "todoAppAsync/DELETE_TODO_DONE",
  FETCH_ALL_TODOS_STARTED: "todoAppAsync/FETCH_ALL_TODOS_STARTED",
  FETCH_ALL_TODOS_DONE: "todoAppAsync/FETCH_ALL_TODOS_DONE",
} as const

export const addTodoStarted: ActionCreator<
  typeof ActionTypes.ADD_TODO_STARTED
> = () => {
  return {
    type: ActionTypes.ADD_TODO_STARTED,
  }
}

export const addTodoDone: ActionCreator<
  typeof ActionTypes.ADD_TODO_DONE
> = () => {
  return {
    type: ActionTypes.ADD_TODO_DONE,
  }
}

export const updateTodoStarted: ActionCreator<
  typeof ActionTypes.UPDATE_TODO_STARTED
> = () => {
  return {
    type: ActionTypes.UPDATE_TODO_STARTED,
  }
}

export const updateTodoDone: ActionCreator<
  typeof ActionTypes.UPDATE_TODO_DONE
> = () => {
  return {
    type: ActionTypes.UPDATE_TODO_DONE,
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

export const deleteTodoStarted: ActionCreator<
  typeof ActionTypes.DELETE_TODO_STARTED
> = () => {
  return {
    type: ActionTypes.DELETE_TODO_STARTED,
  }
}

export const deleteTodoDone: ActionCreator<
  typeof ActionTypes.DELETE_TODO_DONE
> = () => {
  return {
    type: ActionTypes.DELETE_TODO_DONE,
  }
}

export const fetchAllTodosStarted: ActionCreator<
  typeof ActionTypes.FETCH_ALL_TODOS_STARTED
> = () => {
  return {
    type: ActionTypes.FETCH_ALL_TODOS_STARTED,
  }
}

export const fetchAllTodosDone: ActionCreatorWithPayload<
  typeof ActionTypes.FETCH_ALL_TODOS_DONE,
  {
    result: Todo[]
  }
> = (payload) => {
  return {
    type: ActionTypes.FETCH_ALL_TODOS_DONE,
    payload,
  }
}
