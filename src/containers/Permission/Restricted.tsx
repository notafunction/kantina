import React, { useContext } from 'react'
import usePermission from '@/hooks/usePermission'
import { Permission } from '@/types'

type Props = {
  to: Permission
  fallback?: JSX.Element | string
  children?: JSX.Element | string
}

const Restricted: React.FunctionComponent<Props> = ({to, fallback, children}) => {
  const allowed = usePermission(to)

  if (allowed) {
    return <>
      { children }
    </>
  }

  return <>{ fallback }</>
}

export default Restricted