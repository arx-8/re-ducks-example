import { isDevelopment } from "constants/Env"
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from "redux"
import { todoAppOldReduxReducer, todoAppOldReduxState } from "./todoAppOldRedux"

export type RootState = Readonly<{
  todoAppOldRedux: todoAppOldReduxState
}>

export const configureStore = (
  initialState: Partial<RootState> = {}
): Store<RootState, AnyAction> => {
  const rootReducer = combineReducers<RootState>({
    todoAppOldRedux: todoAppOldReduxReducer,
  })

  // Connect Chrome Redux DevTools, if installed.
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleWares = []
  if (isDevelopment) {
    /* eslint-disable @typescript-eslint/no-var-requires */
    middleWares.push(require("redux-immutable-state-invariant").default())
    const {
      createSerializableStateInvariantMiddleware,
    } = require("redux-starter-kit/dist/redux-starter-kit.esm")
    middleWares.push(createSerializableStateInvariantMiddleware())
    /* eslint-enable */
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleWares))
  )
  return store
}
