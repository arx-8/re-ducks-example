import { toUniq } from "src/utils/ArrayUtils"
import { ActionTypes as TodoAppAsyncActionTypes } from "./todoAppAsync/actions"
import { ActionTypes as TodoAppOldReduxActionTypes } from "./todoAppOldRedux/actions"
import { ActionTypes as TodoAppReDucksActionTypes } from "./todoAppReDucks/actions"

describe("ActionType", () => {
  it("No duplicate definition", () => {
    expect.hasAssertions()
    // ## Arrange ##
    const original: string[] = [
      ...Object.values(TodoAppOldReduxActionTypes),
      ...Object.values(TodoAppReDucksActionTypes),
      ...Object.values(TodoAppAsyncActionTypes),
    ]

    // ## Act ##
    const unique = toUniq(original)

    // ## Assert ##
    expect(unique).toHaveLength(original.length)
  })
})
