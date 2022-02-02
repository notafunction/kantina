import styled from 'styled-components'
import BoardTile from './BoardTile'
import BoardHeader from './BoardHeader'
import CreateBoardModal from './CreateBoardModal'
import BoardSettingsDrawer from './BoardSettingsDrawer'

const BoardContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export { BoardTile, BoardContainer, BoardHeader, CreateBoardModal, BoardSettingsDrawer }
