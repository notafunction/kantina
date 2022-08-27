import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import tw from 'twin.macro'

const Styled = {
  Container: styled.div`
    ${tw`p-2 rounded transition-all border`}

    &:hover {
      ${tw`shadow-lg`}
    }
  `,

  Title: styled.h2`
    ${tw`text-gray-800 font-bold`}
  `,

  Content: styled.div`
    ${tw`flex flex-col h-10`}
  `
}

function DashboardBoardItem(props) {
  return (
    <Styled.Container class={props.board.color && `bg-[${props.board.color}]`}>
      <Styled.Title>{props.board.title}</Styled.Title>
      <Styled.Content></Styled.Content>
    </Styled.Container>
  )
}

DashboardBoardItem.propTypes = {
  board: PropTypes.object.isRequired
}

export default DashboardBoardItem
