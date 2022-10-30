import React, { useContext } from 'react'
import PermissionContext from './PermissionContext'
import { Permission } from '@/types'

type Props = {
  to: Permission
}

const Restricted: React.FunctionComponent<Props> = ({to, children}) => {
  const { isAllowedTo } = useContext(PermissionContext)

  if (isAllowedTo(to)) {
    return <>
      { children }
    </>
  }

  return null
}

export default Restricted