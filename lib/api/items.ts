import {
  push,
  ref,
  update,
  remove
} from 'firebase/database'
import { db } from '~/lib/firebase'
import type { Board, List, Item, ItemType } from '@/types'

type CreateParams = {
  board: Board
  list: List
}

type ReadUpdateDeleteParams = {
  board: Board
  list: List
  item: Item
}

type ItemPayload = {
  content: string
  createdBy: string
  color?: string
  position?: number
  type?: ItemType
}

export const createItem = async (
  { board, list }: CreateParams,
  payload: ItemPayload
) => {
  const path = `boards/${board.id}/lists/${list.id}/items`
  const _ref = await push(ref(db, path), {
    ...payload,
    board: board.id,
    list: list.id,
    position: list.items
      ? Object.keys(list.items).length
      : 0
  })

  await update(_ref, {
    id: _ref.key
  })

  return _ref
}

export const updateItem = async (
  { board, list, item }: ReadUpdateDeleteParams,
  payload
) => {
  const path = `boards/${board.id}/lists/${list.id}/items/${item.id}`
  const _ref = ref(db, path)
  await update(_ref, payload)

  return _ref
}

export const deleteItem = async ({
  board,
  list,
  item
}: ReadUpdateDeleteParams) => {
  const path = `boards/${board.id}/lists/${list.id}/items/${item.id}`
  const _ref = ref(db, path)
  return await remove(_ref)
}

export default {
  createItem,
  updateItem,
  deleteItem
}
