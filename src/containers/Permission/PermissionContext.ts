import { createContext } from 'react'
import { Permission } from '@/types'

type PermissionContextType = {
  isAllowedTo: (permission: Permission) => boolean
}

const defaultBehavior: PermissionContextType = {
  isAllowedTo: () => false
}

const PermissionContext =
  createContext<PermissionContextType>(defaultBehavior)

export default PermissionContext
