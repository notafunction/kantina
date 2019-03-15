import React from 'react'
import { compose, withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Auth from '../components/Auth'

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3em 0;
  overflow: hidden;
`
const Content = styled.div`
  max-width: 650px;
  padding-bottom: 2em;
`
const Header = styled.div`
  font-size: 1.5em;
  line-height: 1.2em;
  margin-top: 1.5em;
  font-weight: 600;
`

const enhance = compose(
  withFirebase,
  connect((state) => ({
    profile: state.firebase.profile
  }))
)

const Landing = (props) => {
  return (
    <Panel background='lightblue'>
      <Content>
        <Header>Welcome to Kantina!</Header>
        {
          props.profile.isEmpty &&
          <Header>Log in to get started!</Header>
        }
      </Content>
      {
        props.profile.isEmpty &&
        <Auth profile={props.profile} />
      }
    </Panel>
  )
}

export default enhance(Landing)