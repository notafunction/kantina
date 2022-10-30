import React from 'react'
import { Permission } from '@/types'
import { PermissionContext } from './PermissionContext'

type Props = {
  permissions: Permission[]
}

const PermissionProvider: React.FunctionComponent<Props> = ({ permissions, children }) => {
  const isAllowedTo = (permission: Permission) => permissions.includes(permission)

  return <PermissionContext.Provider value={{ isAllowedTo }}>
    {children}
  </PermissionContext.Provider>
}

export default PermissionProvider