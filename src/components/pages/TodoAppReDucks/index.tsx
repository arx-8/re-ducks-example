/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { TodoInput } from "components/molecules/TodoInput"
import { TodoList } from "components/molecules/TodoList"
import { VisibilityFilterInput } from "components/molecules/VisibilityFilterInput"
import { Todo, TodoId, VisibilityFilter } from "domain/models/Todo"
import React from "react"
import {
  connect,
  MapDispatchToPropsFunction,
  MapStateToProps,
} from "react-redux"
import { RootState } from "store/store"
import {
  todoAppReDucksOperations,
  todoAppReDucksSelectors,
} from "store/todoAppReDucks"

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

const _TodoAppReDucks: React.FC<Props> = ({
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
      <h1>TodoApp (re-ducks)</h1>
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
  return {
    todoList: todoAppReDucksSelectors.filterTodoList(state.todoAppReDucks),
    visibilityFilter: state.todoAppReDucks.visibilityFilter,
  }
}

const mapDispatchToProps: MapDispatchToPropsFunction<
  ReduxDispatchProps,
  OwnProps
> = (dispatch) => {
  return {
    addTodo: (label) => dispatch(todoAppReDucksOperations.addTodo({ label })),
    changeTodoLabel: (targetId, label) =>
      dispatch(todoAppReDucksOperations.changeTodoLabel({ targetId, label })),
    changeVisibilityFilter: (visibilityFilter) =>
      dispatch(
        todoAppReDucksOperations.changeVisibilityFilter({ visibilityFilter })
      ),
    deleteTodo: (targetId) =>
      dispatch(todoAppReDucksOperations.deleteTodo({ targetId })),
    toggleTodoStatus: (targetId) =>
      dispatch(todoAppReDucksOperations.toggleTodoStatus({ targetId })),
  }
}

export const TodoAppReDucks = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TodoAppReDucks)
