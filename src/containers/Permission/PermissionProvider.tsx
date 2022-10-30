import React, { useEffect, useState } from 'react'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import { get, ref } from 'firebase/database'
import { Permission } from '@/types'
import PermissionContext from './PermissionContext'

enum Role {
  "admin",
  "editor",
  "viewer"
}

type Props = {
  role: Role
  children?: JSX.Element
}

const PermissionProvider: React.FunctionComponent<Props> = ({ role, children }) => {
  const db = useDatabase()
  const rolePermissions = useDatabaseObjectData(ref(db, `roles/${role}`), {
    idField: null
  })
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    if (rolePermissions.status === 'success') {
      if (rolePermissions.data) {
        return setPermissions(Object.keys(rolePermissions.data))
      }
    }
  }, [rolePermissions.data])

  const isAllowedTo = (permission: Permission) => permissions.includes(permission)

  return <PermissionContext.Provider value={{ isAllowedTo }}>
    {children}
  </PermissionContext.Provider>
}

export default PermissionProvider