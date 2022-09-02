import React from 'react'
import PropTypes from 'prop-types'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Dnd = (props) => {
  return <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>
}

Dnd.propTypes = {
  children: PropTypes.object.isRequired
}

export const DndItemTypes = {
  LIST: 'list',
  ITEM: 'item'
}

export default Dnd
