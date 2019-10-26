import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  DeepPartial,
  Store,
} from "redux"
import thunkMiddleWare from "redux-thunk"
import { isDevelopment } from "src/constants/Env"
import { todoAppAsyncReducer, TodoAppAsyncState } from "./todoAppAsync"
import { todoAppOldReduxReducer, TodoAppOldReduxState } from "./todoAppOldRedux"
import { todoAppReDucksReducer, TodoAppReDucksState } from "./todoAppReDucks"

export type RootState = Readonly<{
  todoAppOldRedux: TodoAppOldReduxState
  todoAppReDucks: TodoAppReDucksState
  todoAppAsync: TodoAppAsyncState
}>

export const configureStore = (
  initialState: DeepPartial<RootState> = {}
): Store<RootState, AnyAction> => {
  const rootReducer = combineReducers<RootState>({
    todoAppOldRedux: todoAppOldReduxReducer,
    todoAppReDucks: todoAppReDucksReducer,
    todoAppAsync: todoAppAsyncReducer,
  })

  // Connect Chrome Redux DevTools, if installed.
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleWares = []
  middleWares.push(thunkMiddleWare)
  if (isDevelopment) {
    middleWares.push(require("redux-immutable-state-invariant").default())
    middleWares.push(
      require("redux-starter-kit").createSerializableStateInvariantMiddleware()
    )
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleWares))
  )
  return store
}
