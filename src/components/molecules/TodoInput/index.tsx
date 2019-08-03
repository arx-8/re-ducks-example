/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { useState, FormEventHandler } from "react"

type OwnProps = {
  children?: never
  onSubmit: (inputValue: string) => void
}

export const TodoInput: React.FC<OwnProps> = ({ onSubmit }) => {
  const [value, setValue] = useState("")

  const onSubmitWrapper: FormEventHandler = (e) => {
    // @see https://github.com/ReactTraining/react-router/issues/1933#issuecomment-140158983
    e.preventDefault()
    onSubmit(value)
    setValue("")
  }

  return (
    <form css={root} onSubmit={onSubmitWrapper}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button css={addBtn} type="submit">
        Add
      </button>
    </form>
  )
}

const root = css``

const addBtn = css`
  margin-left: 8px;
`
