import styled from 'styled-components'
import tw from 'twin.macro'

const Styled = {
  Container: styled.div`
    ${tw`mx-2 mb-2 max-w-full`}

    &:focus {
      outline: 2px solid eggplant;
      box-shadow: none;
    }

    ${(props) => `
      background-color: ${props.backgroundColor}
    `}
  `,
  Content: styled.div`
    ${tw`transition-all p-2 overflow-hidden border`}
    ${(props) => (props.isDragging ? tw`shadow-sm` : tw`shadow-none`)}
    ${(props) => `
      background-color: ${props.itemColor}
    `}
  
  > span {
      ${tw`overflow-hidden block`}
      word-wrap: break-word;
    }
  `,

  Toolbar: styled.div`
    ${tw`flex justify-end gap-2 mb-1`}
  `
}

export default Styled
