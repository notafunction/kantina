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
    ${tw`transition-all p-2 overflow-hidden border relative`}
    ${(props) =>
      props.isDragging ? tw`shadow-sm` : tw`shadow-none`}
    ${(props) => `
      background-color: ${props.itemColor}
    `}
  `
}

Styled.Toolbar = styled.div`
  ${tw`
    absolute
    p-1
    top-0 right-0
    transition-all
    flex
    justify-end
    gap-2
    mb-1
    opacity-0
    bg-white/60
    backdrop-blur-md
    rounded-sm
  `}

  ${Styled.Container}:hover & {
    ${tw`opacity-100`}
  }
`

export default Styled
