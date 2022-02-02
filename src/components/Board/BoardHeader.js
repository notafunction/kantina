import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledHeader = styled.header`
  display: flex;
  position: relative;
  flex-direction: row;
  padding: 1rem;
  height: auto;
  justify-content: space-between;
`

const BoardHeader = (props) => {
  return (
    <StyledHeader>
      <h2>{props.text}</h2>
      {props.actions}
    </StyledHeader>
  )
}

BoardHeader.propTypes = {
  text: PropTypes.string.isRequired,
  actions: PropTypes.node
}

export default BoardHeader
