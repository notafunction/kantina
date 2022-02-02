import { createSlice } from '@reduxjs/toolkit'

export const listsSlice = createSlice({
  name: 'lists',

  initialState: {},

  reducers: {
    add: () => {},

    remove: () => {}
  }
})

export const { add, remove } = listsSlice.actions
export default listsSlice.reducer
