/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import {
  connect,
  MapDispatchToPropsFunction,
  MapStateToProps,
} from "react-redux"
import { TodoInput } from "src/components/molecules/TodoInput"
import { TodoList } from "src/components/molecules/TodoList"
import { VisibilityFilterInput } from "src/components/molecules/VisibilityFilterInput"
import { Todo, TodoId, VisibilityFilter } from "src/domain/models/Todo"
import { RootState } from "src/store/store"
import { todoAppOldReduxActionTypes } from "src/store/todoAppOldRedux"

type ReduxStateProps = {
  todoList: readonly Todo[]
  visibilityFilter: VisibilityFilter
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

const _TodoAppOldRedux: React.FC<Props> = ({
  todoList,
  visibilityFilter,
  addTodo,
  changeTodoLabel,
  changeVisibilityFilter,
  deleteTodo,
  toggleTodoStatus,
}) => {
  return (
    <div css={root}>
      <h1>TodoApp (Old design redux)</h1>
      <div>
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

const mapStateToProps: MapStateToProps<ReduxStateProps, OwnProps, RootState> = (
  state
) => {
  const { todoList, visibilityFilter } = state.todoAppOldRedux
  const filteredTodoList =
    visibilityFilter === "all"
      ? todoList
      : todoList.filter((t) => t.status === visibilityFilter)

  return {
    todoList: filteredTodoList,
    visibilityFilter,
  }
}

const mapDispatchToProps: MapDispatchToPropsFunction<
  ReduxDispatchProps,
  OwnProps
> = (dispatch) => {
  return {
    addTodo: (label) => {
      dispatch({
        type: todoAppOldReduxActionTypes.ADD_TODO,
        payload: {
          label,
        },
      })
    },
    changeTodoLabel: (targetId, label) => {
      dispatch({
        type: todoAppOldReduxActionTypes.CHANGE_TODO_LABEL,
        payload: {
          targetId,
          label,
        },
      })
    },
    changeVisibilityFilter: (visibilityFilter) => {
      dispatch({
        type: todoAppOldReduxActionTypes.CHANGE_VISIBILITY_FILTER,
        payload: {
          visibilityFilter,
        },
      })
    },
    deleteTodo: (targetId) => {
      dispatch({
        type: todoAppOldReduxActionTypes.DELETE_TODO,
        payload: {
          targetId,
        },
      })
    },
    toggleTodoStatus: (targetId) => {
      dispatch({
        type: todoAppOldReduxActionTypes.TOGGLE_TODO_STATUS,
        payload: {
          targetId,
        },
      })
    },
  }
}

export const TodoAppOldRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TodoAppOldRedux)
