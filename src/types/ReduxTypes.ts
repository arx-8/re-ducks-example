import { Action, AnyAction } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { RootState } from "store/store"

/**
 * Type utility for redux
 */

/**
 * Action creator with NO payload
 * @template T type
 */
export type ActionCreator<T> = () => Action<T>

/**
 * Flux Standard Action に準拠した Action
 */
type ActionWithPayload<T, P> = {
  payload: P
} & Action<T>

/**
 * Action creator with payload
 * @template T type
 * @template P payload
 */
export type ActionCreatorWithPayload<T, P> = (
  payload: P
) => ActionWithPayload<T, P>

/**
 * redux-thunk ASYNC action shorthand for this application.
 *
 * ThunkAction の <R> を、デフォルトで Promise<void> にしてる理由は以下。
 * - 複雑化を避けるため、thunk を使う action は非同期処理のみとするため
 * - 複雑化を避けるため、Promise.resolve の結果を受け取って Component 側でロジックを実装することを防ぐため
 *
 * @template TReturn type of return
 * @template TAction acceptable action type
 */
export type AppAsyncThunkAction<
  TReturn = Promise<void>,
  TAction extends Action = AnyAction
> = ThunkAction<TReturn, RootState, void, TAction>

/**
 * redux-thunk SYNC action shorthand for this application.
 */
export type AppThunkAction<
  TReturn = void,
  TAction extends Action = AnyAction
> = ThunkAction<TReturn, RootState, void, TAction>

/**
 * redux-thunk dispatch shorthand for this application.
 *
 * State と extraArgument (<S, E>) は、applyMiddleware の時点で決定するため、決め打ち
 * Action (<A>) は、型定義するコスパが悪い(ActionCreatorを使うため、タイポや未定義の可能性は低い)ため、AnyAction
 */
type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

/**
 * redux-thunk compatible MapDispatchToPropsFunction.
 *
 * @see node_modules/@types/react-redux/index.d.ts
 */
export type MapThunkDispatchToPropsFunction<TDispatchProps, TOwnProps> = (
  dispatch: AppThunkDispatch,
  ownProps: TOwnProps
) => TDispatchProps
