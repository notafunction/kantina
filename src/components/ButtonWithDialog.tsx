import React from 'react'
import { Button, Dialog, DialogProps } from '@blueprintjs/core'

export default function ({
  buttonText,
  ...props
}: Omit<DialogProps, 'isOpen'> & { buttonText: string }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const handleButtonClick = React.useCallback(() => setIsOpen(!isOpen), [])
  const handleClose = React.useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Button onClick={handleButtonClick} text={buttonText} />
      <Dialog {...props} isOpen={isOpen} onClose={handleClose}>
        {props.children}
      </Dialog>
    </>
  )
}
