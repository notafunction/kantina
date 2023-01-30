import type { AuthDialogType } from './AuthButton'

import React from 'react'
import {
  Divider,
  InputGroup,
  Button,
  FormGroup,
  DialogFooter,
  DialogBody
} from '@blueprintjs/core'
import { IoLogoGoogle } from 'react-icons/io5'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'

type Props = {
  handleDialogTypeChange: (string: AuthDialogType) => void
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

export default function ({ handleDialogTypeChange }: Props) {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirm: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={console.log}>
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

          <Divider />

          <Button icon={<IoLogoGoogle />}>Signup with Google</Button>
        </DialogBody>

        <DialogFooter
          actions={
            <Button intent="primary" type="submit">
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
