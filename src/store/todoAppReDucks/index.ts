import * as operations from "./operations"
import { reducer, State } from "./reducers"
import * as selectors from "./selectors"

export const todoAppReDucksOperations = operations
export const todoAppReDucksReducer = reducer
export const todoAppReDucksSelectors = selectors
export type TodoAppReDucksState = State
