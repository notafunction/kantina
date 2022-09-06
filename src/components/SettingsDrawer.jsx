import React from 'react'
import PropTypes from 'prop-types'
import { Button, Drawer, Space } from 'antd'

const SettingsDrawer = ({
  close,
  onOk,
  okButtonText,
  cancelButtonText,
  okButtonProps,
  cancelButtonProps,
  ...props
}) => {
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
      width={viewportWidth > 800 ? 400 : viewportWidth - 32}
      extra={
        <Space>
          <Button onClick={close} {...cancelButtonProps}>
            {cancelButtonText || 'Cancel'}
          </Button>
          <Button type="primary" onClick={onOk} {...okButtonProps}>
            {okButtonText || 'Save'}
          </Button>
        </Space>
      }
      {...props}>
      {props.children}
    </Drawer>
  )
}

SettingsDrawer.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onOk: PropTypes.func.isRequired,
  okButtonText: PropTypes.string,
  okButtonProps: PropTypes.object,
  cancelButtonText: PropTypes.string,
  cancelButtonProps: PropTypes.object
}

export default SettingsDrawer
