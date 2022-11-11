import { List } from '@/types'
import { createContext } from 'react'

export const ListContext: React.Context<List> =
  createContext(null)
