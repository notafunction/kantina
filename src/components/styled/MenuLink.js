import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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

export default MenuLink;