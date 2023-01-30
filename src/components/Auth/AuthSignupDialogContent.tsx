import type { AuthDialogType } from './AuthButton'

import React from 'react'
import {
  InputGroup,
  Button,
  FormGroup,
  DialogFooter,
  DialogBody,
  Intent
} from '@blueprintjs/core'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { AppToaster } from '@/toaster'
import { AuthErrorMessage } from '~/utils'

type Props = {
  handleDialogTypeChange: (string: AuthDialogType) => void
  handleClose: () => void
}

type State = {
  email: string
  password: string
  passwordConfirm: string
}

const SignupSchema = Yup.object({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
  passwordConfirm: Yup.string()
    .required('Must confirm password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export default function ({ handleDialogTypeChange, handleClose }: Props) {
  const auth = getAuth()
  const db = getDatabase()
  const [loading, setLoading] = React.useState(false)

  async function handleSignupWithEmailAndPassword(email, password) {
    setLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      performPostSignInActions(user)
    } catch (error) {
      AppToaster.show({
        message: AuthErrorMessage[error.code],
        intent: Intent.DANGER
      })
    } finally {
      setLoading(false)
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
        password: '',
        passwordConfirm: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={({ email, password }) =>
        handleSignupWithEmailAndPassword(email, password)
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

          <Field name="passwordConfirm">
            {({ field, meta }) => (
              <FormGroup
                label="Confirm Password"
                labelFor="password-confirm"
                subLabel={<ErrorMessage name="passwordConfirm" />}
                intent={meta.error ? 'danger' : null}>
                <InputGroup
                  id="password-confirm"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormGroup>
            )}
          </Field>
        </DialogBody>

        <DialogFooter
          actions={
            <Button intent="primary" type="submit" loading={loading}>
              Signup
            </Button>
          }>
          <Button minimal onClick={() => handleDialogTypeChange('login')}>
            Already a user? Login
          </Button>
        </DialogFooter>
      </Form>
    </Formik>
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
