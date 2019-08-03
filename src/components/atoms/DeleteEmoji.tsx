/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"

type OwnProps = {
  children?: never
}

export const DeleteEmoji: React.FC<OwnProps> = () => {
  return (
    <span role="img" aria-label="delete">
      ✖
    </span>
  )
}
