/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import List from '../List/List'
import PropTypes from 'prop-types'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import { useParams } from 'react-router'
import { arrayMoveImmutable } from 'array-move'
import Container from '../../components/Container'
import { useDatabase, useDatabaseListData, useSigninCheck } from 'reactfire'
import { equalTo, ref, orderByChild, query } from 'firebase/database'
import { Spin } from 'antd'

const ListWrapper = styled.div`
  flex-shrink: 0;
  margin: 0 5px;
  height: 100%;
  width: 270px;
  vertical-align: top;
`

const Lists = (props) => {
  const params = useParams()
  const db = useDatabase()
  const { status: signinCheckStatus, data: signinCheckData } = useSigninCheck()
  const lists = useDatabaseListData(
    query(ref(db, `lists`), orderByChild('board'), equalTo(params.boardId)),
    {
      idField: 'id'
    }
  )

  // const [lists, setLists] = useState([])

  // useEffect(() => {
  //   if (boardLists.status === 'loading') return
  //   if (boardLists.data === null) return

  //   const fetchData = async () => {
  //     const listIds = Object.keys(boardLists.data)

  //     const lists = await Promise.all(
  //       listIds.map(async (id) => {
  //         const snap = await get(ref(db, `lists/${id}`))

  //         if (snap.exists()) {
  //           return {
  //             id,
  //             ...snap.val()
  //           }
  //         }
  //       })
  //     )

  //     setLists(lists)
  //   }

  //   fetchData().catch(console.error)
  // }, [boardLists])

  if (lists.status === 'loading') return <Spin />

  return (
    <Container flex>
      {lists.data.map((list, i) => (
        <ListWrapper key={list.id}>
          <List id={list.id} />
        </ListWrapper>
      ))}
    </Container>
  )
}

Lists.propTypes = {}

export default Lists
