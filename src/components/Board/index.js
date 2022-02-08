import styled from 'styled-components'
import BoardTile from './BoardTile'
import CreateBoardModal from './CreateBoardModal'
import BoardSettingsDrawer from './BoardSettingsDrawer'
import BoardToolbar from './BoardToolbar'

const BoardContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export { BoardTile, BoardContainer, CreateBoardModal, BoardSettingsDrawer, BoardToolbar }
