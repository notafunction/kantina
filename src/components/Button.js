import styled from 'styled-components'
import { lighten } from 'polished'

export const Button = styled.button`
  padding: 0.5rem;
  margin-right: 6px;
  background: ${props => props.color ? props.color : 'teal'};
  border: none;
  border-radius: 3px;
  transition: all 0.2s;
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(0,0,0,0.1);
  color: white;

  :hover {
    background: ${lighten(0.1, 'teal')};
  }
`

export default Button