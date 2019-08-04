/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { RoutePath } from "constants/RoutePaths"
import React from "react"
import { Link } from "react-router-dom"

type OwnProps = {
  children?: never
}

export const Header: React.FC<OwnProps> = () => {
  return (
    <header css={root}>
      <Link css={link} to={RoutePath.TodoAppPlainState}>
        TodoApp (Plain state)
      </Link>
      <Link css={[link, behind]} to={RoutePath.TodoAppOldRedux}>
        TodoApp (Old design redux)
      </Link>
      <Link css={[link, behind]} to={RoutePath.TodoAppReDucks}>
        TodoApp (re-ducks)
      </Link>
    </header>
  )
}

const root = css`
  text-align: center;
  background: #111;
  display: flex;
  justify-content: space-around;
`

const link = css`
  display: block;
  flex: 1;
  margin: 8px;
  color: #92ddff;
`

const behind = css`
  border-left: 1px dotted white;
`
