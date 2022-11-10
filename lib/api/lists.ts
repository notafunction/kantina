import { push, ref, update, remove } from 'firebase/database'
import { db } from '~/lib/firebase'
import type { Board, List } from '@/types'

type CreateParams = {
  board: Board,
}

type ReadUpdateDeleteParams = {
  board: Board
  list: List
}

type ListPayload = {
  title: string
  createdBy: string
  color?: string
}

export const createList = async ({ board }: CreateParams, payload: ListPayload) => {
  const path = `boards/${board.id}/lists`
  const _ref = await push(ref(db, path), {
    ...payload,
    board: board.id,
    position: board.lists ? Object.keys(board.lists).length : 0
  })

  await update(_ref, {
    id: _ref.key
  })

  return _ref
}

export const updateList = async ({ board, list }: ReadUpdateDeleteParams, payload) => {
  const path = `boards/${board.id}/lists/${list.id}`
  const _ref = ref(db, path)
  await update(_ref, payload)

  return _ref
}

export const deleteList = async ({ board, list }: ReadUpdateDeleteParams) => {
  const path = `boards/${board.id}/lists/${list.id}`
  const _ref = ref(db, path)
  return await remove(_ref)
}

export default {
  createList,
  updateList,
  deleteList,
}