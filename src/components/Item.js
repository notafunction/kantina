import React from 'react'
import { pure } from 'recompose'
import styled from 'styled-components'
import DeleteButton from '../components/DeleteButton'

const ItemContainer = styled.div`
  box-shadow: ${({ isDragging }) => (isDragging ? '2px 2px 1px grey' : 'none')};
  padding: 0 8px;
  margin-bottom: 8px;
  user-select: none;
  transition: background-color: 0.1s ease;

  &:focus {
    outline: 2px solid eggplant;
    box-shadow: none;
  }

  display: flex;
  align-items: center;
`
const ItemContent = styled.div`
  background-color: ${({ isDragging }) => (isDragging ? 'lightsteelblue' : 'white')};
  flex-grow: 1;
  padding: 0 0.5rem;
  min-height: 40px;
  flex-basis: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Title = styled.div`
  flex-grow: 1;
  white-space: pre-line;
`
const ItemDeleteButton = styled(DeleteButton)`
  opacity: 0;
  align-self: start;
  transition: all 0.2s;
  ${ItemContent}:hover & {
    opacity: 1;
  }
`

const Item = pure((props) => {
  return (
    <ItemContainer
    innerRef={props.provided.innerRef}
    {...props.provided.draggableProps}
    {...props.provided.dragHandleProps}
    >
      <ItemContent
        isDragging={props.isDragging}
      >
        <Title>
          {props.title}
        </Title>
        {props.isLoggedIn && <ItemDeleteButton for='item' onConfirm={props.onDeleteItem} /> }
      </ItemContent>
    </ItemContainer>
  )
})

export default Item