import styled from 'styled-components'
import tw from 'twin.macro'

const Styled = {
  Header: styled.div`
    ${tw`p-2 text-base font-bold flex justify-between items-start`}

    h3 {
      ${tw`flex-1 mb-0`}
    }
  `,

  Dropzone: styled.div`
    min-height: 250px;
    overflow: auto;
  `
}

Styled.Content = styled.div`
  background-color: ${(props) => props.itemColor};

  ${tw`
    max-h-full
    flex
    flex-col
    rounded
  `}
  white-space: normal;
`

export default Styled
