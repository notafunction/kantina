import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'antd'

const FormDangerZone = ({ dividerProps, ...props }) => {
  return (
    <>
      <Divider orientation="left" orientationMargin={0} style={{ color: 'red' }} {...dividerProps}>
        Danger Zone
      </Divider>
      {props.children}
    </>
  )
}

FormDangerZone.propTypes = {
  dividerProps: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default FormDangerZone
