/** @jsx jsx */
import { css, jsx, SerializedStyles } from "@emotion/core"
import React from "react"

type OwnProps = {
  children?: never
  exCss?: SerializedStyles | SerializedStyles[]
  isSpin?: boolean
}

export const Loading: React.FC<OwnProps> = ({ exCss, isSpin }) => {
  return (
    <span css={isSpin ? [exCss, root, spin] : [exCss, root]}>
      <span role="img" aria-label="done">
        🔃
      </span>
    </span>
  )
}

const root = css`
  display: inline-block;
`

const spin = css`
  animation: rotate-anime infinite 2s linear;

  @keyframes rotate-anime {
    100% {
      transform: rotate(360deg);
    }
  }
`
