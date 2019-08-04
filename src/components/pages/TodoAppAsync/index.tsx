/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import {
  connect,
  MapDispatchToPropsFunction,
  MapStateToProps,
} from "react-redux"
import { RootState } from "store/store"

type ReduxStateProps = {}

type ReduxDispatchProps = {}

type OwnProps = {
  children?: never
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps

const _TodoAppAsync: React.FC<Props> = () => {
  return (
    <div css={root}>
      <h1>TodoApp (re-ducks + async)</h1>
    </div>
  )
}

const root = css`
  padding: 16px;
`

const mapStateToProps: MapStateToProps<
  ReduxStateProps,
  OwnProps,
  RootState
> = () => {
  return {}
}

const mapDispatchToProps: MapDispatchToPropsFunction<
  ReduxDispatchProps,
  OwnProps
> = () => {
  return {}
}

export const TodoAppAsync = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TodoAppAsync)
