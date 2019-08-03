/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"

type OwnProps = {
  children?: never
}

export const LightBulbEmoji: React.FC<OwnProps> = () => {
  return (
    <span role="img" aria-label="light bulb">
      💡
    </span>
  )
}
