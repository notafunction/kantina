import styled from 'styled-components'
import tw from 'twin.macro'

const Styled = {
  Header: styled.div`
    ${tw`p-2 text-base font-bold flex justify-between items-start`}

    h3 {
      ${tw`
        text-lg
        flex-1
        mb-0
        whitespace-nowrap
        overflow-hidden
        overflow-ellipsis
        min-w-0
      `}
    }
  `,

  Footer: styled.div`
    ${tw`mt-auto flex p-[5px]`}
  `,

  Dropzone: styled.div`
    min-height: 250px;
    overflow: auto;
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
    width: ${(props) => props.width || '270px'};
    vertical-align: top;
    height: 100%;
  `
}

Styled.Content = styled.div`
  background-color: ${(props) => props.backgroundColor};

  ${tw`
    max-h-full
    flex
    flex-col
    rounded
  `}
  white-space: normal;
`

export default Styled
