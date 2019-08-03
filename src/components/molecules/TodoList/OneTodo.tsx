/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { CheckEmoji } from "components/atoms/CheckEmoji"
import { DeleteEmoji } from "components/atoms/DeleteEmoji"
import { EditEmoji } from "components/atoms/EditEmoji"
import { Todo, TodoId } from "domain/models/Todo"
import React, { useState } from "react"
import { LightBulbEmoji } from "components/atoms/LightBulbEmoji"

type OwnProps = {
  children?: never
  onChangeLabel: (targetId: TodoId, label: string) => void
  onClickDelete: (targetId: TodoId) => void
  onClickStatusToggle: (targetId: TodoId) => void
  todo: Todo
}

export const OneTodo: React.FC<OwnProps> = ({
  onChangeLabel,
  onClickDelete,
  onClickStatusToggle,
  todo,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTempValue, setEditTempValue] = useState("")

  const onClickEdit = (): void => {
    setIsEditing(true)
    setEditTempValue(todo.label)
  }

  const onSubmitEdit = (): void => {
    onChangeLabel(todo.id, editTempValue)
    setIsEditing(false)
  }

  const onCancelEdit = (): void => {
    setIsEditing(false)
  }

  return (
    <li css={root}>
      <span css={todo.status === "completed" && completed}>
        <button
          css={btn}
          onClick={() => onClickStatusToggle(todo.id)}
          disabled={isEditing}
        >
          <CheckEmoji />
        </button>

        <button css={btn} onClick={onClickEdit} disabled={isEditing}>
          <EditEmoji />
        </button>

        <button
          css={btn}
          onClick={() => onClickDelete(todo.id)}
          disabled={isEditing}
        >
          <DeleteEmoji />
        </button>

        <span css={todoLabel}>
          {isEditing ? (
            <input
              css={editInput}
              type="text"
              value={editTempValue}
              onChange={(e) => setEditTempValue(e.target.value)}
              onKeyDown={(e) => {
                switch (e.keyCode) {
                  case 13:
                    // Enter
                    onSubmitEdit()
                    return

                  case 27:
                    // ESC
                    onCancelEdit()
                    return

                  default:
                    break
                }
              }}
            />
          ) : (
            todo.label
          )}
        </span>
      </span>

      {isEditing && (
        <div css={usageHint}>
          <LightBulbEmoji />
          Press key! ESC: Cancel, Enter: Submit
        </div>
      )}
    </li>
  )
}

const root = css`
  margin-top: 8px;
`

const btn = css`
  margin-left: 1px;
`

const completed = css`
  text-decoration: line-through;
  color: darkgray;
`

const todoLabel = css`
  margin-left: 8px;
`

const editInput = css`
  width: -webkit-fill-available;
`

const usageHint = css`
  margin-left: 8px;
`
