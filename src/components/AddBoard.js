import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import styled from 'styled-components'

import Button from '../components/Button'
import { Modal, Input } from 'antd'

const A = styled.a`
  margin-bottom: 0.5rem;
  transition: all 0.2s;
  padding: 0.5rem;

  :hover {
    background: rgba(0,0,0,0.1);
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
  padding: 0 0.5rem;
`
const Controls = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const enhance = compose(
  withState('isVisible', 'setIsVisible', false),
  withState('value', 'setValue', ''),
  withHandlers({
    handleSubmit: props => () => {
      if (props.value) {
        props.onSubmit({ title: props.value })
        props.setValue('')
        props.setIsVisible(false)
      }
    },
    handleChange: props => event => {
      props.setValue(event.target.value)
    }
  })
)

const AddBoard = props => [
  <A key='1' onClick={() => props.setIsVisible(true)}>Create a new board...</A>,
  <Modal
    key='2'
    title='New Board'
    visible={props.isVisible}
    footer={null}
    onCancel={() => props.setIsVisible(false)}
  >
    <Container>
      <Input
        placeholder='Title'
        value={props.value}
        onChange={props.handleChange}
        onKeyDown={e => e.keyCode === 13 && props.handleSubmit()}
      />
      <Controls>
        <Button onClick={props.handleSubmit}>Create</Button>
      </Controls>
    </Container>
  </Modal>
]

export default enhance(AddBoard)