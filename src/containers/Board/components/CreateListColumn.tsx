import React, { useContext, useState } from 'react'
import { Button } from 'antd'
import CreateListModal from './CreateListModal'
import Styled from './Styled'
import { useSigninCheck } from 'reactfire'

const CreateListColumn: React.FunctionComponent = () => {
  const auth = useSigninCheck()
  const [isCreateListModalVisible, setIsCreateListModalVisible] = useState(false)

  if (auth.status === 'loading' || !auth.data.signedIn) return null

  return (
    <Styled.ListWrapper width="auto">
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
