import React from 'react'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { Menu, Dropdown, Icon, message } from 'antd'
import { Button } from './Button'
import AddBoard from './AddBoard'

const StyledLink = styled(Link)`
  background: white;
  :hover {
    background: rgba(0,0,0,0.1);
  }
`

const enhance = compose(
  withRouter,
  firestoreConnect(props => ([
    { collection: 'boards', where: ['uid', '==', props.userId] }
  ])),
  withHandlers({
    onAddBoard: props => payload => {
      props.firestore.add('boards', {
        uid: props.userId,
        createdAt: props.firestore.FieldValue.serverTimestamp(),
        updatedAt: props.firestore.FieldValue.serverTimestamp(),
        lists: [],
        ...payload,
      })
      .then(board => {
        props.history.push(`/board/${board.id}`)
        message.success('Board created!')
      })
      .catch(error => message.error(error.message))
    }
  }),
  connect(({ firestore }) => ({
    boards: firestore.ordered && firestore.ordered.boards
  })),
)

const BoardMenu = props => {
  const menu = (
    <Menu>
      {props.boards && props.boards.map((board, i) => (
        <Menu.Item key={i}>
          <StyledLink to={`/board/${board.id}`}>{board.title}</StyledLink>
        </Menu.Item>
      ))}
      <Menu.Item>
        <AddBoard onSubmit={props.onAddBoard}/>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <Button>Boards <Icon type="down"/></Button>
    </Dropdown>
  )
}

export default enhance(BoardMenu)