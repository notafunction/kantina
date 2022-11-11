import { createContext } from 'react'
import { UserProfile } from '@/types'

export const UserProfileContext: React.Context<UserProfile> = createContext(null)
