import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export default {
  BoardContainer: styled.div`
    ${tw`h-full flex flex-col flex-1 -mx-4`}

    background-color: ${(props) => props.backgroundColor};
  `,

  Content: styled.div`
    ${tw`relative flex-1`}
  `,

  ListsContainer: styled.div`
    user-select: none;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 calc(1rem - 5px);
    padding-bottom: 1rem;
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
  `,

  ListWrapper: styled.div`
    flex-shrink: 0;
    margin: 0 5px;
    width: ${(props) => props.width || '270px'};
    vertical-align: top;
    height: 100%;
  `
}
