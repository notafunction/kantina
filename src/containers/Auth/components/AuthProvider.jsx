import React from 'react'
import PropTypes from 'prop-types'
import { useSigninCheck } from 'reactfire'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  const auth = useSigninCheck()

  return <AuthContext.Provider value={auth.data}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node)
}

export default AuthProvider
