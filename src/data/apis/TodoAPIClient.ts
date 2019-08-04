import { createTodoId, Todo, TodoId } from "domain/models/Todo"

/*** *** *** for Fake API call *** *** ***/
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}

const STORAGE_KEY = "todoAppAsync/todos"

const readLocalStorage = (): Todo[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
}

const writeToLocalStorage = (data: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
/*** *** *** for Fake API call *** *** ***/

/**
 * GET
 */
export const callGetAllTodos = async (): Promise<Todo[]> => {
  console.log("API call start: callGetAllTodos")
  await sleep(2000)
  console.log("API call end: callGetAllTodos")

  return readLocalStorage()
}

/**
 * POST
 */
export type CallPostTodoParam = Omit<Todo, "id">

export const callPostTodo = async (
  param: CallPostTodoParam
): Promise<TodoId> => {
  console.log("API call start: callPostTodo")
  await sleep(2000)
  console.log("API call end: callPostTodo")

  // read
  const data = readLocalStorage()

  // write
  const createData = {
    id: createTodoId(),
    label: param.label,
    status: param.status,
  }
  data.push(createData)
  writeToLocalStorage(data)

  return createData.id
}

/**
 * PUT
 */
export type CallPutTodoReq = Partial<Todo> & {
  id: TodoId
}

export const callPutTodo = async (params: CallPutTodoReq): Promise<TodoId> => {
  console.log("API call start: callPutTodo")
  await sleep(2000)
  console.log("API call end: callPutTodo")

  // read
  const todoList = readLocalStorage()
  const todo = todoList.find((t) => t.id === params.id)!

  // update
  if (params.label != null) {
    todo.label = params.label
  }
  if (params.status != null) {
    todo.status = params.status
  }

  // write
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList))

  return todo.id
}

/**
 * Delete
 */
export type CallDeleteTodoReq = {
  id: TodoId
}

export const callDeleteTodo = async (
  params: CallDeleteTodoReq
): Promise<void> => {
  console.log("API call start: callDeleteTodo")
  await sleep(2000)
  console.log("API call end: callDeleteTodo")

  // get
  const todoList = readLocalStorage()

  // delete
  const deletedTodoList = todoList.filter((t) => t.id !== params.id)

  // write
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deletedTodoList))
}
