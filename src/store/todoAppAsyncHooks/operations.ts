import * as todoAPIClient from "src/data/apis/TodoAPIClient"
import { TodoId } from "src/domain/models/Todo"
import { AppThunkAction } from "src/types/ReduxTypes"
import * as actions from "./actions"

export const addTodo = (payload: { label: string }): AppThunkAction => {
  return async (dispatch) => {
    dispatch(actions.addTodoStarted())
    await todoAPIClient.callPostTodo({
      label: payload.label,
      status: "active",
    })
    dispatch(actions.addTodoDone())
    dispatch(fetchAllTodos())
  }
}

export const changeTodoLabel = (payload: {
  targetId: TodoId
  label: string
}): AppThunkAction => {
  return async (dispatch) => {
    dispatch(actions.updateTodoStarted())
    await todoAPIClient.callPutTodo({
      id: payload.targetId,
      label: payload.label,
    })
    dispatch(actions.updateTodoDone())
    dispatch(fetchAllTodos())
  }
}

export const changeVisibilityFilter = actions.changeVisibilityFilter

export const deleteTodo = (payload: { targetId: TodoId }): AppThunkAction => {
  return async (dispatch) => {
    dispatch(actions.updateTodoStarted())
    await todoAPIClient.callDeleteTodo({ id: payload.targetId })
    dispatch(actions.updateTodoDone())
    dispatch(fetchAllTodos())
  }
}

export const toggleTodoStatus = (payload: {
  targetId: TodoId
}): AppThunkAction => {
  return async (dispatch, getState) => {
    dispatch(actions.updateTodoStarted())

    const target = getState().todoAppAsync.todoList.find(
      (t) => t.id === payload.targetId
    )!
    const toggledStatus = target.status === "active" ? "completed" : "active"
    await todoAPIClient.callPutTodo({
      id: payload.targetId,
      status: toggledStatus,
    })

    dispatch(actions.updateTodoDone())
    dispatch(fetchAllTodos())
  }
}

export const fetchAllTodos = (): AppThunkAction => {
  return async (dispatch) => {
    dispatch(actions.fetchAllTodosStarted())
    const result = await todoAPIClient.callGetAllTodos()
    dispatch(actions.fetchAllTodosDone({ result }))
  }
}
