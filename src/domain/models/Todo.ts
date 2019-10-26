import { Brand } from "src/types/Utils"
import { ulid } from "ulid"

export type TodoId = Brand<string, "TodoId">

export type TodoStatus = "active" | "completed"

export type Todo = {
  id: TodoId
  label: string
  status: TodoStatus
}

/**
 * 可視フィルタは、TodoStatusに加えて「全てのstatus」もある
 */
export type VisibilityFilter = "all" | TodoStatus

export const VisibilityFilterValue: Record<
  VisibilityFilter,
  VisibilityFilter
> = {
  active: "active",
  all: "all",
  completed: "completed",
}

export const createTodoId = (): TodoId => {
  return ulid() as TodoId
}
