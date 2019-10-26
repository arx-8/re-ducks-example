import { Todo } from "src/domain/models/Todo"
import { RootState } from "src/store/store"

export const filteredTodoList = (rootState: RootState): Todo[] => {
  const s = rootState.todoAppAsyncHooks

  if (s.visibilityFilter === "all") {
    return s.todoList
  }
  return s.todoList.filter((t) => t.status === s.visibilityFilter)
}

export const isSomeLoading = (rootState: RootState): boolean => {
  const s = rootState.todoAppAsyncHooks

  return Object.values(s.isLoading).some((isLoading) => isLoading)
}
