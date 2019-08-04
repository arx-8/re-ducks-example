import { Todo, VisibilityFilter } from "domain/models/Todo"
import produce from "immer"
import { Reducer } from "redux"
import * as actions from "./actions"
import { ActionTypes } from "./actions"

export type State = Readonly<{
  todoList: Todo[]
  visibilityFilter: VisibilityFilter
  isLoading: {
    add: boolean
    delete: boolean
    fetch: boolean
    update: boolean
  }
}>

export const initialState: State = {
  todoList: [],
  visibilityFilter: "all",
  isLoading: {
    add: false,
    delete: false,
    fetch: false,
    update: false,
  },
}

type Action =
  | ReturnType<typeof actions.addTodoStarted>
  | ReturnType<typeof actions.addTodoDone>
  | ReturnType<typeof actions.updateTodoStarted>
  | ReturnType<typeof actions.updateTodoDone>
  | ReturnType<typeof actions.changeVisibilityFilter>
  | ReturnType<typeof actions.deleteTodoStarted>
  | ReturnType<typeof actions.deleteTodoDone>
  | ReturnType<typeof actions.fetchAllTodosStarted>
  | ReturnType<typeof actions.fetchAllTodosDone>

export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO_STARTED:
      return produce(state, (draft) => {
        draft.isLoading.add = true
      })

    case ActionTypes.ADD_TODO_DONE:
      return produce(state, (draft) => {
        draft.isLoading.add = false
      })

    case ActionTypes.UPDATE_TODO_STARTED:
      return produce(state, (draft) => {
        draft.isLoading.update = true
      })

    case ActionTypes.UPDATE_TODO_DONE:
      return produce(state, (draft) => {
        draft.isLoading.update = false
      })

    case ActionTypes.CHANGE_VISIBILITY_FILTER:
      return produce(state, (draft) => {
        const { visibilityFilter } = action.payload
        draft.visibilityFilter = visibilityFilter
      })

    case ActionTypes.DELETE_TODO_STARTED:
      return produce(state, (draft) => {
        draft.isLoading.delete = true
      })

    case ActionTypes.DELETE_TODO_DONE:
      return produce(state, (draft) => {
        draft.isLoading.delete = false
      })

    case ActionTypes.FETCH_ALL_TODOS_STARTED:
      return produce(state, (draft) => {
        draft.isLoading.fetch = true
      })

    case ActionTypes.FETCH_ALL_TODOS_DONE:
      return produce(state, (draft) => {
        const { result } = action.payload
        draft.todoList = result
        draft.isLoading.fetch = false
      })

    default: {
      // case の定義忘れ防止のため
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action
      return state
    }
  }
}
