import styled from 'styled-components'
import tw from 'twin.macro'

export default {
  ModalActions: styled.div`
    ${tw`flex items-center justify-between gap-2`}
  `,

  Providers: styled.div`
    ${tw`flex flex-col items-center gap-2 pb-4`}
  `
}
