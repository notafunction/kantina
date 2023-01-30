import React from 'react'
import { Button } from '@blueprintjs/core'
import AuthLoginDialogContent from './AuthLoginDialogContent'
import AuthSignupDialogContent from './AuthSignupDialogContent'
import ButtonWithDialog from '../ButtonWithDialog'

export type AuthDialogType = 'login' | 'signup'

const AuthButton = () => {
  const [type, setType] = React.useState<AuthDialogType>('login')

  return (
    <ButtonWithDialog
      buttonText="Login or Signup"
      title={type === 'login' ? 'Login' : 'Signup'}>
      {type === 'login' ? (
        <AuthLoginDialogContent
          handleDialogTypeChange={(type) => setType(type)}
        />
      ) : (
        <AuthSignupDialogContent
          handleDialogTypeChange={(type) => setType(type)}
        />
      )}
    </ButtonWithDialog>
  )
}

export default AuthButton
