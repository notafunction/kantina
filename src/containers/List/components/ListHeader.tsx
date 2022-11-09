import React, { useContext } from 'react'
import ListToolbar from './ListToolbar'
import Styled from './Styled'
import { ListContext } from './ListContext'
import type { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

type Props = {
  dragHandleProps: DraggableProvidedDragHandleProps
}

const ListHeader: React.FunctionComponent<Props> = (props) => {
  const list = useContext(ListContext)

  return (
    <Styled.Header>
      <h3 {...props.dragHandleProps}>{list.title}</h3>
      <ListToolbar />
    </Styled.Header>
  )
}

export default ListHeader