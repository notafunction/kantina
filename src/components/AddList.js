import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import styled from 'styled-components'

import { Button } from './Button'
import { Icon } from './Icon'
import { darken } from 'polished';

const A = styled.a`
  display: block;
  margin-bottom: 0.5rem;
  background: lightgrey;
  transition: all 0.2s;
  padding: 0.5rem;
  color: #333;

  :hover {
    color: #333;
    background: ${darken(0.1, 'lightgrey')};
  }
`
const Textarea = styled.textarea`
  border: none;
  border-radius: 3px;
  outline: none;
  width: 100%;
  resize: none;
  height: 55px;
  padding: 6px;
`
const Container = styled.div`
  background: lightgrey;
  padding: 0.5rem;
`
const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const enhance = compose(
  withState('toggle', 'setToggle', false),
  withState('value', 'setValue', ''),
  withHandlers({
    handleSubmit: props => () => {
      if (props.value) {
        props.onSubmit({ title: props.value })
        props.setToggle(false)
        props.setValue('')
      }
    },
    handleChange: props => event => {
      props.setValue(event.target.value)
    },
  })
)

const AddList = props => {
  if (!props.toggle) {
    return <A onClick={() => props.setToggle(true)}>Add a list...</A>
  }
  return (
    <Container>
      <Textarea
        autoFocus
        onChange={props.handleChange}
        value={props.value}
        onKeyDown={e => e.keyCode === 13 && props.handleSubmit()}
      />
      <Controls>
        <Button type="submit" onClick={props.handleSubmit}>Add</Button>
        <Icon onClick={() => props.setToggle(false)}><span role='img' aria-label='Cancel'>❌</span></Icon>
      </Controls>
    </Container>
  )
}

export default enhance(AddList)