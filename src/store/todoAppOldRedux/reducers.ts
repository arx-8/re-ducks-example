import produce from "immer"
import { Reducer } from "redux"
import { createTodoId, Todo, VisibilityFilter } from "src/domain/models/Todo"
import { FixMeAny } from "src/types/Utils"
import { ActionTypes } from "./actions"

export type State = Readonly<{
  todoList: Todo[]
  visibilityFilter: VisibilityFilter
}>

export const initialState: State = {
  todoList: [],
  visibilityFilter: "all",
}

type Action = {
  type:
    | typeof ActionTypes.ADD_TODO
    | typeof ActionTypes.CHANGE_TODO_LABEL
    | typeof ActionTypes.CHANGE_VISIBILITY_FILTER
    | typeof ActionTypes.DELETE_TODO
    | typeof ActionTypes.TOGGLE_TODO_STATUS
  payload: Record<string, FixMeAny>
}

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
      return state
    }
  }
}
