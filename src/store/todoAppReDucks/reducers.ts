import produce from "immer"
import { Reducer } from "redux"
import { createTodoId, Todo, VisibilityFilter } from "src/domain/models/Todo"
import * as actions from "./actions"
import { ActionTypes } from "./actions"

export type State = Readonly<{
  todoList: Todo[]
  visibilityFilter: VisibilityFilter
}>

export const initialState: State = {
  todoList: [],
  visibilityFilter: "all",
}

type Action =
  | ReturnType<typeof actions.addTodo>
  | ReturnType<typeof actions.changeTodoLabel>
  | ReturnType<typeof actions.changeVisibilityFilter>
  | ReturnType<typeof actions.deleteTodo>
  | ReturnType<typeof actions.toggleTodoStatus>

export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return produce(state, (draft) => {
        const { label } = action.payload
        draft.todoList.push({
          id: createTodoId(),
          label,
          status: "active",
        })
      })

    case ActionTypes.CHANGE_TODO_LABEL:
      return produce(state, (draft) => {
        const { targetId, label } = action.payload
        draft.todoList.find((t) => t.id === targetId)!.label = label
      })

    case ActionTypes.CHANGE_VISIBILITY_FILTER:
      return produce(state, (draft) => {
        const { visibilityFilter } = action.payload
        draft.visibilityFilter = visibilityFilter
      })

    case ActionTypes.DELETE_TODO:
      return produce(state, (draft) => {
        const { targetId } = action.payload
        draft.todoList = draft.todoList.filter((t) => t.id !== targetId)
      })

    case ActionTypes.TOGGLE_TODO_STATUS:
      return produce(state, (draft) => {
        const { targetId } = action.payload
        const found = draft.todoList.find((t) => t.id === targetId)!
        if (found.status === "active") {
          found.status = "completed"
        } else {
          found.status = "active"
        }
      })

    default: {
      // case の定義忘れ防止のため
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action
      return state
    }
  }
}
