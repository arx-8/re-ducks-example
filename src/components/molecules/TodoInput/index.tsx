/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { useState } from "react"

type OwnProps = {
  children?: never
  onSubmit: (inputValue: string) => void
}

export const TodoInput: React.FC<OwnProps> = ({ onSubmit }) => {
  const [value, setValue] = useState("")

  const onSubmitWrapper = (): void => {
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
