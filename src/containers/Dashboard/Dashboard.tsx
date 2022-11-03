import React from 'react'
import { useSigninCheck } from 'reactfire'
import { Spin } from 'antd'

const PublicBoards = React.lazy(() => import('./components/PublicBoards'))
const UserBoards = React.lazy(() => import('./components/UserBoards'))

const Dashboard = () => {
  const auth = useSigninCheck()

  return (
    <div className="w-full">
      <PublicBoards />

      {auth.status === 'loading' ? (
        <Spin />
      ) : auth.data.signedIn ? (
        <UserBoards user={auth.data.user} />
      ) : null}
    </div>
  )
}

export default Dashboard
