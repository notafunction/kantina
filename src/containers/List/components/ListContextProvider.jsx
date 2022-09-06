import React from 'react'
import ListContext from './ListContext'

const ListContextProvider = (props) => {
  return <ListContext.Provider value={props.value}>{props.children}</ListContext.Provider>
}
