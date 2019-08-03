/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"

type OwnProps = {
  children?: never
}

export const TodoAppOldRedux: React.FC<OwnProps> = () => {
  return (
    <div css={root}>
      <h1>TodoApp (Old design redux)</h1>
    </div>
  )
}

const root = css`
  padding: 16px;
`
