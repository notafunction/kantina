import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item/Item'
import ListToolbar from './components/ListToolbar'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import Styled from './components/Styled'
import { get, ref } from 'firebase/database'
import { message, Spin } from 'antd'

const List = (props) => {
  const db = useDatabase()
  const [items, setItems] = useState([])

  const list = useDatabaseObjectData(ref(db, `lists/${props.id}`), {
    idField: 'id'
  })

  useEffect(() => {
    if (list.status === 'success') {
      if (list.data.items === null) return setItems([])

      const fetchData = async () => {
        const ids = Object.keys(list.data.items)

        const populatedItems = await Promise.all(
          ids.map(async (id) =>
            get(ref(db, `items/${id}`)).then((snap) => {
              if (snap.exists()) {
                return {
                  id,
                  ...snap.val()
                }
              }
            })
          )
        )

        setItems(populatedItems)
      }

      fetchData().catch(message.error)
    }
  }, [list.data])

  if (list.status === 'loading') return <Spin />

  return (
    <Styled.Content itemColor={list.data.color}>
      <Styled.Header>
        <h3>{list.data.title}</h3>
        <ListToolbar list={list.data} />
      </Styled.Header>
      <Styled.Dropzone>
        {items.map((item) => (
          <Item key={item.id} item={item} list={list.data} />
        ))}
      </Styled.Dropzone>
    </Styled.Content>
  )
}

List.propTypes = {
  id: PropTypes.string.isRequired
}

export default List
