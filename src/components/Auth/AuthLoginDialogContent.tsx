import type { AuthDialogType } from './AuthButton'

import React from 'react'
import {
  Divider,
  InputGroup,
  Intent,
  Button,
  FormGroup,
  DialogFooter,
  DialogBody
} from '@blueprintjs/core'
import { IoLogoGoogle } from 'react-icons/io5'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ButtonWithDialog from '../ButtonWithDialog'
import AuthResetPasswordDialogContent from './AuthResetPasswordDialogContent'
import { getDatabase, ref, update } from 'firebase/database'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { AppToaster } from '~/src/toaster'
import { AuthErrorMessage } from '~/utils'

type Props = {
  handleDialogTypeChange: (type: AuthDialogType) => void
  handleClose: () => void
}

const LoginSchema = Yup.object({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password')
})

export default function ({ handleDialogTypeChange, handleClose }: Props) {
  const auth = getAuth()
  const db = getDatabase()
  const [loading, setLoading] = React.useState(false)

  async function handleLoginWithEmailAndPassword(email, password) {
    setLoading(true)

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      performPostSignInActions(user)
      handleClose()
    } catch (error) {
      AppToaster.show({
        message: AuthErrorMessage[error.code],
        intent: Intent.DANGER
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleLoginWithGoogleProvider() {
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider())
      performPostSignInActions(user)
      handleClose()
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') return
      AppToaster.show({
        message: AuthErrorMessage[error.code],
        intent: Intent.DANGER
      })
    }
  }

  function performPostSignInActions(user) {
    populateProfile(db, user)
    AppToaster.show({
      message: 'You are now logged in',
      intent: Intent.SUCCESS
    })
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={LoginSchema}
      onSubmit={({ email, password }) =>
        handleLoginWithEmailAndPassword(email, password)
      }>
      <Form>
        <DialogBody>
          <Field name="email">
            {({ field, meta }) => (
              <FormGroup
                label="Email"
                labelFor="email"
                subLabel={<ErrorMessage name="email" />}
                intent={meta.error ? 'danger' : null}>
                <InputGroup
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...field}
                />
              </FormGroup>
            )}
          </Field>

          <Field name="password">
            {({ field, meta }) => (
              <FormGroup
                label="Password"
                labelFor="password"
                subLabel={<ErrorMessage name="password" />}
                helperText={<ForgotPasswordButton />}
                intent={meta.error ? 'danger' : null}>
                <InputGroup
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormGroup>
            )}
          </Field>

          <Divider />

          <Button
            onClick={handleLoginWithGoogleProvider}
            icon={<IoLogoGoogle />}>
            Login with Google
          </Button>
        </DialogBody>

        <DialogFooter
          actions={
            <Button intent="primary" type="submit" loading={loading}>
              Login
            </Button>
          }>
          <Button minimal onClick={() => handleDialogTypeChange('signup')}>
            Need an account? Signup
          </Button>
        </DialogFooter>
      </Form>
    </Formik>
  )
}

function ForgotPasswordButton() {
  return (
    <ButtonWithDialog
      buttonProps={{ minimal: true, small: true }}
      buttonText="Forgot password?"
      title="Reset Password">
      {/* @ts-ignore */}
      {(props) => <AuthResetPasswordDialogContent {...props} />}
    </ButtonWithDialog>
  )
}

async function populateProfile(db, user) {
  const userRef = ref(db, `users/${user.uid}`)

  return await update(userRef, {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL
  })
}
