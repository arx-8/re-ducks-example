import { toUniq } from "utils/ArrayUtils"
import { ActionTypes as TodoAppOldReduxActionTypes } from "./todoAppOldRedux/actions"
import { ActionTypes as TodoAppReDucksActionTypes } from "./todoAppReDucks/actions"

describe("ActionType", () => {
  it("No duplicate definition", () => {
    expect.hasAssertions()
    // ## Arrange ##
    const original: string[] = [
      ...Object.values(TodoAppOldReduxActionTypes),
      ...Object.values(TodoAppReDucksActionTypes),
    ]

    // ## Act ##
    const unique = toUniq(original)

    // ## Assert ##
    expect(unique).toHaveLength(original.length)
  })
})
