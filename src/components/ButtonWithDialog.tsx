import React from 'react'
import { Button, ButtonProps, Dialog, DialogProps } from '@blueprintjs/core'
import { isFunction } from '~/utils'

export default function ({
  children,
  buttonText,
  buttonProps,
  ...props
}: Omit<DialogProps, 'isOpen'> & {
  buttonText: string
  buttonProps: ButtonProps
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const handleButtonClick = React.useCallback(() => setIsOpen(!isOpen), [])
  const handleClose = React.useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Button onClick={handleButtonClick} text={buttonText} {...buttonProps} />
      <Dialog {...props} isOpen={isOpen} onClose={handleClose}>
        {isFunction(children) ? children({ handleClose }) : children}
      </Dialog>
    </>
  )
}
