import { configureStore } from '@reduxjs/toolkit'
import { FirebaseReducer, firebaseReducer } from 'react-redux-firebase'
import { Board, List, Item, UserProfile } from '../common/types'

interface Schema {
  boards: Board
  lists: List
  items: Item
  allBoards: Board
  userBoards: Board
}

export interface RootState {
  firebase: FirebaseReducer.Reducer<UserProfile, Schema>
}

export default configureStore({
  reducer: {
    firebase: firebaseReducer
  }
})
