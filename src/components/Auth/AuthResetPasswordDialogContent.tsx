import React from 'react'
import {
  Button,
  DialogBody,
  DialogFooter,
  FormGroup,
  InputGroup,
  Intent
} from '@blueprintjs/core'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { object, string } from 'yup'
import { AppToaster } from '~/src/toaster'

const schema = object({
  email: string().email().required().label('Email')
})

export default function (props: { handleClose?: () => void }) {
  const auth = getAuth()

  async function handleReset(email) {
    // For security, always show a success
    try {
      await sendPasswordResetEmail(auth, email)
    } finally {
      AppToaster.show({
        intent: Intent.SUCCESS,
        message: 'Check your email for how to reset your password.'
      })
    }
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: '' }}
      onSubmit={({ email }) => handleReset(email)}>
      <Form>
        <DialogBody>
          <Field name="email">
            {({ field, meta }) => (
              <FormGroup
                label="Email Address"
                labelFor="email"
                subLabel={<ErrorMessage name="email" />}
                intent={meta.error ? Intent.DANGER : null}>
                <InputGroup id="email" type="email" {...field} />
              </FormGroup>
            )}
          </Field>
        </DialogBody>

        <DialogFooter
          actions={
            <Button type="submit" intent={Intent.PRIMARY}>
              Reset Password
            </Button>
          }
        />
      </Form>
    </Formik>
  )
}
