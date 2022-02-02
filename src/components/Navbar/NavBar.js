import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { Spin } from 'antd'
import LoginButton from '../Login/LoginButton'
import UserMenu from '../User/UserMenu'
import config from '../../../package.json'

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 1rem;
  align-items: center;
`
const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  transition: all 0.2s;
`
const StyledLink = styled(Link)`
  font-size: 20px;
  font-weight: 700;
  transition: all 0.2s;

  &:visited {
    text-decoration: none;
  }

  &:hover {
    color: lightblue;
  }
`
const StyledRight = styled.div`
  margin-left: auto;
`
const StyledVersion = styled.sup`
  margin-left: 5px;
  font-size: 70%;
`

const NavBar = () => {
  const auth = useSelector(({ firebase: { auth } }) => auth)

  return (
    <Container>
      <Logo>
        <StyledLink to="/">Kantina</StyledLink>
      </Logo>
      <StyledVersion>v{config.version}</StyledVersion>
      <StyledRight>
        {!isLoaded(auth) ? <Spin /> : !isEmpty(auth) ? <UserMenu /> : <LoginButton />}
      </StyledRight>
    </Container>
  )
}

export default NavBar
