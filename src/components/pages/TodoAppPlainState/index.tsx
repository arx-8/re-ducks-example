/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"

type OwnProps = {
  children?: never
}

export const TodoAppPlainState: React.FC<OwnProps> = () => {
  return (
    <div css={root}>
      <h1>TodoApp (Plain state)</h1>
    </div>
  )
}

const root = css``
