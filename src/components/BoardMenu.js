import React from 'react'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { Menu, Dropdown, Icon, message } from 'antd'
import { Button } from './Button'
import AddBoard from './AddBoard'

const MenuLink = styled(NavLink)`
  font-family: 'Overpass', sans-serif;
  text-decoration: none;
  color: #1d1d1d;
  flex: 1;
  padding: 10px;

  :hover {
    background: lightgray;
  }
`;

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
          <MenuLink to={`/board/${board.id}`}>{board.title}</MenuLink>
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