import { Todo } from "src/domain/models/Todo"
import { State } from "./reducers"

export const filterTodoList = (state: State): Todo[] => {
  if (state.visibilityFilter === "all") {
    return state.todoList
  }
  return state.todoList.filter((t) => t.status === state.visibilityFilter)
}
