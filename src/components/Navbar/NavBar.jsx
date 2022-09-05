import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import LoginButton from '../Login/LoginButton'
import UserMenu from '../User/UserMenu'
import config from '../../../package.json'
import { useSigninCheck } from 'reactfire'

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

function NavBar() {
  const { status, data: signInCheckResult } = useSigninCheck()

  return (
    <Container>
      <Logo>
        <StyledLink to="/">Kantina</StyledLink>
      </Logo>
      <StyledVersion>v{config.version}</StyledVersion>
      <StyledRight>
        {status === 'loading' ? (
          <Spin />
        ) : signInCheckResult.signedIn ? (
          <UserMenu user={signInCheckResult.user} />
        ) : (
          <LoginButton />
        )}
      </StyledRight>
    </Container>
  )
}

export default NavBar
