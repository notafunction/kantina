import React from 'react'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { message } from 'antd'
import BoardMenu from '../components/BoardMenu'
import Auth from '../components/Auth'

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 100%;
  padding: 0 1rem;
  align-items: center;
`
const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  transition: all .2s;
  flex-grow: 1;
`
export const StyledLink = styled(Link) `
  font-size: 20px;
  font-weight: 700;
  transition: all .2s;

  &:visited {
    text-decoration: none;
  }

  &:hover {
    color: lightblue;
  }
`
const enhance = compose(
  withFirebase,
  withHandlers({
    logout: props => () => {
      props.firebase.logout()
      .then(() => message.success('You have logged out.'))
    },
    onAddBoard: props => payload => {
      props.firestore.add('boards', {
        userId: props.profile.id,
        ...payload,
      })
      .then(() => message.success('Board created!'))
    }
  }),
  connect(({ firebase }) => ({
    profile: firebase.profile
  }))
)

const NavBar = props => {
  let isLoggedIn = (isLoaded(props.profile) && !isEmpty(props.profile))

  return (
    <Container>
      <Logo>
        <StyledLink to='/'>Kantina</StyledLink>
      </Logo>
      { isLoggedIn && <BoardMenu userId={props.profile.id}/> }
      <Auth profile={props.profile}/>
    </Container>
  )
}

export default enhance(NavBar)