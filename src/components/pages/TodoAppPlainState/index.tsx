/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import produce from "immer"
import React, { useState } from "react"
import { TodoInput } from "src/components/molecules/TodoInput"
import { TodoList } from "src/components/molecules/TodoList"
import { VisibilityFilterInput } from "src/components/molecules/VisibilityFilterInput"
import {
  createTodoId,
  Todo,
  TodoId,
  VisibilityFilter,
} from "src/domain/models/Todo"

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
          onChange={setVisibilityFilter}
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
