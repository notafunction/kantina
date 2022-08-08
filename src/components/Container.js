import styled, { css } from 'styled-components'

export default styled.div`
  user-select: none;
  white-space: nowrap;
  margin-bottom: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 calc(1rem - 5px);
  padding-bottom: 1rem;
  margin-bottom: 8px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  ${(props) =>
    props.flex &&
    css`
      display: flex;
      align-items: ${typeof props.flex === 'string' ? props.flex : 'flex-start'};
    `}
`