/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { TodoInput } from "components/molecules/TodoInput"
import { TodoList } from "components/molecules/TodoList"
import { VisibilityFilterInput } from "components/molecules/VisibilityFilterInput"
import {
  createTodoId,
  Todo,
  TodoId,
  VisibilityFilter,
} from "domain/models/Todo"
import produce from "immer"
import React, { useState } from "react"

type OwnProps = {
  children?: never
}

export const TodoAppPlainState: React.FC<OwnProps> = () => {
  // state
  const [todoList, setTodoList] = useState<readonly Todo[]>([])
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>(
    "all"
  )

  // calculated state
  const filteredTodoList =
    visibilityFilter === "all"
      ? todoList
      : todoList.filter((t) => t.status === visibilityFilter)

  // events
  const addTodo = (label: string): void => {
    const next = produce(todoList, (draft) => {
      draft.push({
        id: createTodoId(),
        label,
        status: "active",
      })
    })
    setTodoList(next)
  }

  const changeTodoLabel = (targetId: TodoId, label: string): void => {
    const next = produce(todoList, (draft) => {
      draft.find((t) => t.id === targetId)!.label = label
    })
    setTodoList(next)
  }

  const deleteTodo = (targetId: TodoId): void => {
    setTodoList(todoList.filter((t) => t.id !== targetId))
  }

  const toggleTodoStatus = (targetId: TodoId): void => {
    const next = produce(todoList, (draft) => {
      const found = draft.find((t) => t.id === targetId)!
      if (found.status === "active") {
        found.status = "completed"
      } else {
        found.status = "active"
      }
    })
    setTodoList(next)
  }

  // render
  return (
    <div css={root}>
      <h1>TodoApp (Plain state)</h1>
      <div>
        <TodoInput onSubmit={addTodo} />
      </div>
      <div css={separator}>
        <VisibilityFilterInput
          filterValue={visibilityFilter}
          onChange={(f) => setVisibilityFilter(f)}
        />
      </div>
      <div css={separator}>
        <TodoList
          todoList={filteredTodoList}
          onChangeLabel={changeTodoLabel}
          onClickDelete={deleteTodo}
          onClickStatusToggle={toggleTodoStatus}
        />
      </div>
    </div>
  )
}

const root = css`
  padding: 16px;
`

const separator = css`
  margin-top: 16px;
`
