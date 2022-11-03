import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Board } from '@/types'

const Styled = {
  Container: styled.div`
    ${tw`p-2 rounded transition-all`}

    background-color: ${(props) => props.backgroundColor};
  `,

  Title: styled.h2`
    ${tw`text-gray-800 font-bold`}
  `,

  Content: styled.div`
    ${tw`flex flex-col h-10`}
  `
}

type Props = {
  board: Board
}

const DashboardBoardItem: React.FunctionComponent<Props> = (props) => {
  return (
    <Styled.Container backgroundColor={props.board.color}>
      <Styled.Title>{props.board.title}</Styled.Title>
      <Styled.Content></Styled.Content>
    </Styled.Container>
  )
}

export default DashboardBoardItem
