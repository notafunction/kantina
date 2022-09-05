import React from 'react'
import { useDatabase, useDatabaseListData } from 'reactfire'

const RecentBoards = () => {
  const db = useDatabase()
  const recentBoardsQuery = query(ref(db, 'boards'))
  const { status, data: recentBoards } = useDatabaseListData(recentBoardsQuery, {
    idField: 'id'
  })

  return (
    
  )
}