import styled from 'styled-components'
import { darken } from 'polished';

export const Icon = styled.a`
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  width: 30px;
  text-align: center;
  text-decoration: none;
  color: darkgrey;

  :hover {
    color: ${darken(0.2, 'darkgrey')}
  }
`