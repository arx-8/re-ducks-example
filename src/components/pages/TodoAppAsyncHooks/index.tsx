/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "src/components/atoms/Loading"
import { TodoInput } from "src/components/molecules/TodoInput"
import { TodoList } from "src/components/molecules/TodoList"
import { VisibilityFilterInput } from "src/components/molecules/VisibilityFilterInput"
import { RootState } from "src/store/store"
import {
  todoAppAsyncHooksOperations,
  todoAppAsyncHooksSelectors,
} from "src/store/todoAppAsyncHooks"

type OwnProps = {
  children?: never
}

export const TodoAppAsyncHooks: React.FC<OwnProps> = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("render")
    dispatch(todoAppAsyncHooksOperations.fetchAllTodos())

    return () => {
      console.log("u mount")
    }
  }, [dispatch])

  const todoList = useSelector(todoAppAsyncHooksSelectors.filteredTodoList)
  const isSomeLoading = useSelector(todoAppAsyncHooksSelectors.isSomeLoading)
  const visibilityFilter = useSelector(
    (s: RootState) => s.todoAppAsyncHooks.visibilityFilter
  )

  return (
    <div css={root}>
      <h1>TodoApp (re-ducks + async + hooks)</h1>
      <div>
        {isSomeLoading ? (
          <Loading exCss={[loadingIcon, loading]} isSpin />
        ) : (
          <Loading exCss={loadingIcon} />
        )}
      </div>
      <div css={separator}>
        <TodoInput
          onSubmit={(label) => {
            dispatch(todoAppAsyncHooksOperations.addTodo({ label }))
          }}
        />
      </div>
      <div css={separator}>
        <VisibilityFilterInput
          filterValue={visibilityFilter}
          onChange={(visibilityFilter) => {
            dispatch(
              todoAppAsyncHooksOperations.changeVisibilityFilter({
                visibilityFilter,
              })
            )
          }}
        />
      </div>
      <div css={separator}>
        <TodoList
          todoList={todoList}
          onChangeLabel={(targetId, label) => {
            dispatch(
              todoAppAsyncHooksOperations.changeTodoLabel({ targetId, label })
            )
          }}
          onClickDelete={(targetId) => {
            dispatch(todoAppAsyncHooksOperations.deleteTodo({ targetId }))
          }}
          onClickStatusToggle={(targetId) => {
            dispatch(todoAppAsyncHooksOperations.toggleTodoStatus({ targetId }))
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

const loadingIcon = css`
  font-size: x-large;
`

const loading = css`
  color: #2196f3;
`
