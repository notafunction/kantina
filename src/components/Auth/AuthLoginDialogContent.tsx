import type { DialogProps } from '@blueprintjs/core'
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
  handleDialogTypeChange: (type: AuthDialogType) => void
}

const LoginSchema = Yup.object({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password')
})

export default function ({ handleDialogTypeChange }: Props) {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirm: ''
      }}
      validationSchema={LoginSchema}
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

          <Divider />

          <Button icon={<IoLogoGoogle />}>Login with Google</Button>
        </DialogBody>

        <DialogFooter
          actions={
            <Button intent="primary" type="submit">
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
