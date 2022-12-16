import React, { useContext } from 'react'
import usePermission from '@/hooks/usePermission'
import { Permission } from '@/types'
import { useUser } from 'reactfire'

type Props = {
  to: Permission
  fallback?: JSX.Element | string
  children: React.ReactNode
}

const Restricted: React.FunctionComponent<Props> = ({ to, fallback, children }) => {
  const allowed = usePermission(to)
  const { data } = useUser()

  if (data?.emailVerified) {
    if (allowed) {
      return <>{children}</>
    }
  }

  return <>{fallback}</>
}

export default Restricted
