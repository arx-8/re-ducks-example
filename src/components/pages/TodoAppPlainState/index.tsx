/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { TodoInput } from "components/molecules/TodoInput"
import { TodoList } from "components/molecules/TodoList"
import { VisibilityFilterInput } from "components/molecules/VisibilityFilterInput"
import { Todo, TodoId, VisibilityFilterValue } from "domain/models/Todo"
import React from "react"

type OwnProps = {
  children?: never
}

const dummyData: Todo[] = [
  {
    id: "1" as TodoId,
    label: "label1",
    status: "active",
  },
  {
    id: "2" as TodoId,
    label:
      "iyfiyqeibylqeonqevqeinpvqeonmvqe fiwecvbqwvuw iygwrqelbiovcwjvb qiouf bqovbqe oui hfohv",
    status: "completed",
  },
]

export const TodoAppPlainState: React.FC<OwnProps> = () => {
  return (
    <div css={root}>
      <h1>TodoApp (Plain state)</h1>
      <div>
        <TodoInput
          onSubmit={(v) => {
            console.log(v)
          }}
        />
      </div>
      <div css={separator}>
        <VisibilityFilterInput
          filterValue={VisibilityFilterValue.all}
          onChange={(f) => {
            console.log(f)
          }}
        />
      </div>
      <div css={separator}>
        <TodoList
          todoList={dummyData}
          onChangeLabel={(targetId, label) => {
            console.log(targetId)
            console.log(label)
          }}
          onClickDelete={(targetId) => {
            console.log(targetId)
          }}
          onClickStatusToggle={(targetId) => {
            console.log(targetId)
          }}
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
