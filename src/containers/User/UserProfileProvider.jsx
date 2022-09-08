import React from 'react'
import PropTypes from 'prop-types'
import { UserProfileContext } from './UserProfileContext'

const UserProfileProvider = (props) => {
  return <UserProfileContext.Provider>{props.children}</UserProfileContext.Provider>
}

UserProfileProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}
