/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { firebaseApp } from '../services/firebase'
import { getDatabase } from 'firebase/database'

const db = getDatabase(firebaseApp)

export const addList = createAsyncThunk('lists/add', async (payload) => {
  return Promise.resolve(payload)
})

export const listsSlice = createSlice({
  name: 'lists',

  initialState: {
    loading: false
  },

  reducers: {
    add: () => {},

    remove: () => {},

    move: () => {}
  },

  extraReducers: (builder) => {
    builder
      .addCase(addList.pending, (state, action) => {
        state.loading = true
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.loading = false
        console.log(state, action)
      })
  }
})

export const { add, remove } = listsSlice.actions
export default listsSlice.reducer
