import { Item } from '@/types'
import React, { createContext } from 'react'

export const ItemContext: React.Context<Item | null> = createContext(null)
