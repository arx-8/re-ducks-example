/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Component, ReactNode } from "react"
import { TodoInput } from "src/components/molecules/TodoInput"
import { TodoList } from "src/components/molecules/TodoList"
import { VisibilityFilterInput } from "src/components/molecules/VisibilityFilterInput"
import {
  createTodoId,
  Todo,
  TodoId,
  VisibilityFilter,
} from "src/domain/models/Todo"

type OwnProps = {
  children?: never
}

type State = {
  todoList: readonly Todo[]
  visibilityFilter: VisibilityFilter
}

export class TodoAppOldPlainState extends Component<OwnProps, State> {
  constructor(props: OwnProps) {
    super(props)
    this.state = {
      todoList: [],
      visibilityFilter: "all",
    }
  }

  private readonly addTodo = (label: string): void => {
    this.setState((prev) => ({
      todoList: prev.todoList.concat({
        id: createTodoId(),
        label,
        status: "active",
      }),
    }))
  }

  private readonly setVisibilityFilter = (
    filterValue: VisibilityFilter
  ): void => {
    this.setState({
      visibilityFilter: filterValue,
    })
  }

  private readonly changeTodoLabel = (
    targetId: TodoId,
    label: string
  ): void => {
    this.setState((prev) => {
      const next = [...prev.todoList]
      next.find((t) => t.id === targetId)!.label = label
      return {
        todoList: next,
      }
    })
  }

  private readonly deleteTodo = (targetId: TodoId): void => {
    this.setState((prev) => {
      const next = prev.todoList.filter((t) => t.id !== targetId)
      return {
        todoList: next,
      }
    })
  }

  private readonly toggleTodoStatus = (targetId: TodoId): void => {
    this.setState((prev) => {
      const next = [...prev.todoList]
      const found = next.find((t) => t.id === targetId)!
      if (found.status === "active") {
        found.status = "completed"
      } else {
        found.status = "active"
      }
      return {
        todoList: next,
      }
    })
  }

  render(): ReactNode {
    const { todoList, visibilityFilter } = this.state

    const filteredTodoList =
      visibilityFilter === "all"
        ? todoList
        : todoList.filter((t) => t.status === visibilityFilter)

    return (
      <div css={root}>
        <h1>TodoApp (Old plain state)</h1>
        <div>
          <TodoInput onSubmit={this.addTodo} />
        </div>
        <div css={separator}>
          <VisibilityFilterInput
            filterValue={visibilityFilter}
            onChange={this.setVisibilityFilter}
          />
        </div>
        <div css={separator}>
          <TodoList
            todoList={filteredTodoList}
            onChangeLabel={this.changeTodoLabel}
            onClickDelete={this.deleteTodo}
            onClickStatusToggle={this.toggleTodoStatus}
          />
        </div>
      </div>
    )
  }
}

const root = css`
  padding: 16px;
`

const separator = css`
  margin-top: 16px;
`
