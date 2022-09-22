import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export default {
  BoardContainer: styled.div`
    ${tw`h-full flex flex-col flex-1`}
  `,

  Content: styled.div`
    ${tw`relative flex-1`}
  `,

  ListsContainer: styled.div`
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
  `,

  ListWrapper: styled.div`
    flex-shrink: 0;
    margin: 0 5px;
    height: 100%;
    width: 270px;
    vertical-align: top;
  `
}
