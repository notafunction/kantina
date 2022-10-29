import styled from 'styled-components'
import tw from 'twin.macro'

const Styled = {
  Grid: styled.div`
    ${tw`
      grid gap-4 flex-1
      grid-cols-1 md:grid-cols-3
      lg:grid-cols-4 xl:grid-cols-6
      2xl:grid-cols-8
    `}
  `
}

export default Styled
