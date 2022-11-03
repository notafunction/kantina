import React from 'react'
import { useSigninCheck } from 'reactfire'
import { AuthContext } from './AuthContext'

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const auth = useSigninCheck()

  return <AuthContext.Provider value={auth.data}>{children}</AuthContext.Provider>
}

export default AuthProvider
