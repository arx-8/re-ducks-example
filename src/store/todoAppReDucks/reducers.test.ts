import produce from "immer"
import { TodoId } from "src/domain/models/Todo"
import { ActionTypes } from "./actions"
import { initialState, reducer } from "./reducers"

describe("ADD_TODO", () => {
  it("prev state = initialState", () => {
    expect.hasAssertions()
    // ## Arrange ##
    const prevState = initialState

    // ## Act ##
    const result = reducer(prevState, {
      type: ActionTypes.ADD_TODO,
      payload: {
        label: "new task name",
      },
    })

    // ## Assert ##
    expect(result.todoList).toHaveLength(1)
    expect(result.todoList[0].id).not.toBeNull()

    // ランダムな ulid のテストが面倒なため置き換える
    const modifiedResult = produce(result, (draft) => {
      draft.todoList.forEach((t) => {
        t.id = `id.length:${t.id.length}` as TodoId
      })
    })
    expect(modifiedResult).toMatchSnapshot()
  })

  it("prev state = todoList 1 or more", () => {
    expect.hasAssertions()
    // ## Arrange ##
    const prevState = produce(initialState, (draft) => {
      draft.todoList.push({
        id: "id1" as TodoId,
        label: "id1-label",
        status: "active",
      })
      draft.todoList.push({
        id: "id2" as TodoId,
        label: "id2-label",
        status: "completed",
      })
    })

    // ## Act ##
    const result = reducer(prevState, {
      type: ActionTypes.ADD_TODO,
      payload: {
        label: "the task",
      },
    })

    // ## Assert ##
    expect(result.todoList).toHaveLength(3)
    expect(result.todoList[2].id).not.toBeNull()

    // ランダムな ulid のテストが面倒なため置き換える
    const modifiedResult = produce(result, (draft) => {
      draft.todoList.forEach((t) => {
        t.id = `id.length:${t.id.length}` as TodoId
      })
    })
    expect(modifiedResult).toMatchSnapshot()
  })
})
