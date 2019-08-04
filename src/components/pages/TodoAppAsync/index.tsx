/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { TodoInput } from "components/molecules/TodoInput"
import { TodoList } from "components/molecules/TodoList"
import { VisibilityFilterInput } from "components/molecules/VisibilityFilterInput"
import { Todo, TodoId, VisibilityFilter } from "domain/models/Todo"
import React from "react"
import { connect, MapStateToProps } from "react-redux"
import { RootState } from "store/store"
import {
  todoAppAsyncOperations,
  todoAppAsyncSelectors,
} from "store/todoAppAsync"
import { MapThunkDispatchToPropsFunction } from "types/ReduxTypes"
import { Loading } from "components/atoms/Loading"

type ReduxStateProps = {
  todoList: readonly Todo[]
  visibilityFilter: VisibilityFilter
  isSomeLoading: boolean
}

type ReduxDispatchProps = {
  addTodo: (label: string) => void
  changeTodoLabel: (targetId: TodoId, label: string) => void
  changeVisibilityFilter: (visibilityFilter: VisibilityFilter) => void
  deleteTodo: (targetId: TodoId) => void
  toggleTodoStatus: (targetId: TodoId) => void
}

type OwnProps = {
  children?: never
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps

const _TodoAppAsync: React.FC<Props> = ({
  todoList,
  visibilityFilter,
  isSomeLoading,
  addTodo,
  changeTodoLabel,
  changeVisibilityFilter,
  deleteTodo,
  toggleTodoStatus,
}) => {
  return (
    <div css={root}>
      <h1>TodoApp (re-ducks + async)</h1>
      <div>
        {isSomeLoading ? (
          <Loading exCss={[loadingIcon, loading]} isSpin />
        ) : (
          <Loading exCss={loadingIcon} />
        )}
      </div>
      <div css={separator}>
        <TodoInput onSubmit={addTodo} />
      </div>
      <div css={separator}>
        <VisibilityFilterInput
          filterValue={visibilityFilter}
          onChange={changeVisibilityFilter}
        />
      </div>
      <div css={separator}>
        <TodoList
          todoList={todoList}
          onChangeLabel={changeTodoLabel}
          onClickDelete={deleteTodo}
          onClickStatusToggle={toggleTodoStatus}
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

const mapStateToProps: MapStateToProps<ReduxStateProps, OwnProps, RootState> = (
  state
) => {
  return {
    todoList: todoAppAsyncSelectors.filterTodoList(state.todoAppAsync),
    visibilityFilter: state.todoAppAsync.visibilityFilter,
    isSomeLoading: todoAppAsyncSelectors.isSomeLoading(state.todoAppAsync),
  }
}

const mapDispatchToProps: MapThunkDispatchToPropsFunction<
  ReduxDispatchProps,
  OwnProps
> = (dispatch) => {
  return {
    addTodo: (label) => dispatch(todoAppAsyncOperations.addTodo({ label })),
    changeTodoLabel: (targetId, label) =>
      dispatch(todoAppAsyncOperations.changeTodoLabel({ targetId, label })),
    changeVisibilityFilter: (visibilityFilter) =>
      dispatch(
        todoAppAsyncOperations.changeVisibilityFilter({ visibilityFilter })
      ),
    deleteTodo: (targetId) =>
      dispatch(todoAppAsyncOperations.deleteTodo({ targetId })),
    toggleTodoStatus: (targetId) =>
      dispatch(todoAppAsyncOperations.toggleTodoStatus({ targetId })),
  }
}

export const TodoAppAsync = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TodoAppAsync)
