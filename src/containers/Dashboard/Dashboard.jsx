import React from 'react'
import { useSigninCheck } from 'reactfire'
import { Spin } from 'antd'
import PublicBoards from './components/PublicBoards'
import UserBoards from './components/UserBoards'

const Dashboard = () => {
  const auth = useSigninCheck()

  return (
    <div className="flex flex-col gap-4">
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
