/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Todo, TodoId } from "domain/models/Todo"
import React from "react"
import { OneTodo } from "./OneTodo"

type OwnProps = {
  children?: never
  onChangeLabel: (targetId: TodoId, label: string) => void
  onClickDelete: (targetId: TodoId) => void
  onClickStatusToggle: (targetId: TodoId) => void
  todoList: readonly Todo[]
}

export const TodoList: React.FC<OwnProps> = ({
  onChangeLabel,
  onClickDelete,
  onClickStatusToggle,
  todoList,
}) => {
  return (
    <ul css={root}>
      {todoList.map((t) => (
        <OneTodo
          key={t.id}
          todo={t}
          onChangeLabel={onChangeLabel}
          onClickDelete={onClickDelete}
          onClickStatusToggle={onClickStatusToggle}
        />
      ))}
    </ul>
  )
}

const root = css``
