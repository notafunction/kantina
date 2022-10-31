import React, { useEffect, useState } from 'react'
import { useDatabase, useDatabaseObjectData, useUser } from 'reactfire'
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
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const fetchRolePermissions = async () => {
      if (!role) {
        return setPermissions([])
      }

      const roleSnap = await get(ref(db, `roles/${role}`))

      if (!roleSnap.exists()) return setPermissions([])

      const permissionKeys = Object.keys(roleSnap.val())

      setPermissions(permissionKeys)
    }

    fetchRolePermissions().catch(console.error)
  }, [role])

  const isAllowedTo = (permission: Permission) => permissions.includes(permission)

  return <PermissionContext.Provider value={{ isAllowedTo }}>
    {children}
  </PermissionContext.Provider>
}

export default PermissionProvider