import React from 'react'
import { Button, ButtonProps, Drawer, DrawerProps, Space } from 'antd'

export type Props = DrawerProps & {
  close: () => void
  onOk: () => void
  okButtonText?: string
  cancelButtonText?: string
  cancelButtonProps?: ButtonProps
  okButtonProps?: ButtonProps
  children?: object
}

const SettingsDrawer = ({ close, onOk, okButtonText, cancelButtonText, ...props }: Props) => {
  const [viewportWidth, setViewportWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <Drawer
      onClose={close}
      width={viewportWidth > 800 ? 700 : viewportWidth - 32}
      extra={
        <Space>
          <Button onClick={close} {...props.cancelButtonProps}>
            {cancelButtonText || 'Cancel'}
          </Button>
          <Button type="primary" onClick={onOk} {...props.okButtonProps}>
            {okButtonText || 'Save'}
          </Button>
        </Space>
      }
      {...props}>
      {props.children}
    </Drawer>
  )
}

export default SettingsDrawer
