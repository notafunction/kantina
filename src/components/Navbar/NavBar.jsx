import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import AuthButton from '@/components/Auth/AuthButton'
import UserMenu from '../User/UserMenu'
import config from '../../../package.json'
import { useSigninCheck } from 'reactfire'

import { Navbar, Alignment, Spinner, SpinnerSize } from '@blueprintjs/core'

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 1rem;
  align-items: center;
  height: 72px;
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

export default function () {
  const { status, data: signInCheckResult } = useSigninCheck()

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <StyledLink to="/">Kantina</StyledLink>
        </Navbar.Heading>
      </Navbar.Group>

      <Navbar.Group align={Alignment.RIGHT}>
        {status === 'loading' ? (
          <Spinner size={SpinnerSize.SMALL} />
        ) : signInCheckResult.signedIn ? (
          <UserMenu user={signInCheckResult.user} />
        ) : (
          <AuthButton />
        )}
      </Navbar.Group>
    </Navbar>

    // <Container>
    //   <Logo>
    //   </Logo>
    //   <StyledVersion>v{config.version}</StyledVersion>
    //   <StyledRight>
    //     {status === 'loading' ? (
    //       <Spin />
    //     ) : signInCheckResult.signedIn ? (
    //       <UserMenu user={signInCheckResult.user} />
    //     ) : (
    //       <AuthButton />
    //     )}
    //   </StyledRight>
    // </Container>
  )
}
