import React, { useContext, useState } from 'react'
import { Button } from 'antd'
import CreateListModal from './CreateListModal'
import Styled from './Styled'
import { AuthContext } from '../../Auth/components/AuthContext'

const CreateListColumn = () => {
  const auth = useContext(AuthContext)
  const [isCreateListModalVisible, setIsCreateListModalVisible] = useState(false)

  if (!auth.signedIn) return null

  return (
    <Styled.ListWrapper>
      <Button type="ghost" onClick={() => setIsCreateListModalVisible(true)}>
        Add List
      </Button>

      <CreateListModal
        visible={isCreateListModalVisible}
        close={() => setIsCreateListModalVisible(false)}
      />
    </Styled.ListWrapper>
  )
}

export default CreateListColumn
