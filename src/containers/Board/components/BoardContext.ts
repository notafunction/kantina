import { Board } from '@/types'
import { createContext } from 'react'

export const BoardContext: React.Context<Board> =
  createContext(null)
