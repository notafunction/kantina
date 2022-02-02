import React from 'react'
import PropTypes from 'prop-types'
import { Button, Drawer, Space } from 'antd'

const SettingsDrawer = (props) => {
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
      title={props.title}
      visible={props.visible}
      onClose={props.close}
      width={viewportWidth > 800 ? 700 : viewportWidth - 32}
      extra={
        <Space>
          <Button onClick={props.close}>{props.cancelButtonText || 'Cancel'}</Button>
          <Button type="primary" onClick={props.onOk}>
            {props.okButtonText || 'Save'}
          </Button>
        </Space>
      }>
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
  cancelButtonText: PropTypes.string
}

export default SettingsDrawer
