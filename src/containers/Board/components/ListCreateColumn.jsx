import React, { useState } from 'react'
import { Button } from 'antd'
import CreateListModal from './CreateListModal'
import Styled from './Styled'

const ListCreateColumn = () => {
  const [isCreateListModalVisible, setIsCreateListModalVisible] = useState(false)

  return (
    <Styled.ListWrapper>
      <Button type="dashed" onClick={() => setIsCreateListModalVisible(true)}>
        Add List
      </Button>

      <CreateListModal
        visible={isCreateListModalVisible}
        close={() => setIsCreateListModalVisible(false)}
      />
    </Styled.ListWrapper>
  )
}

export default ListCreateColumn
