import {
  push,
  ref,
  update,
  remove
} from 'firebase/database'
import { db } from '~/lib/firebase'
import type { Board } from '@/types'

type ReadUpdateDeleteParams = {
  board: Board
}

type BoardPayload = {
  title: string
  createdBy: string
  locked: boolean
  public: boolean
  color?: string
}

export const createBoard = async (
  payload: BoardPayload
) => {
  const path = `boards`
  const _ref = await push(ref(db, path), payload)

  await update(_ref, {
    id: _ref.key
  })

  return _ref
}

export const updateBoard = async (
  { board }: ReadUpdateDeleteParams,
  payload
) => {
  const path = `boards/${board.id}`
  const _ref = ref(db, path)
  await update(_ref, payload)

  return _ref
}

export const deleteBoard = async ({
  board
}: ReadUpdateDeleteParams) => {
  const path = `boards/${board.id}`
  const _ref = ref(db, path)
  return await remove(_ref)
}

export default {
  createBoard,
  updateBoard,
  deleteBoard
}
