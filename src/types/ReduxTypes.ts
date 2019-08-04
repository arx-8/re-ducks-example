import { Action } from "redux"

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
