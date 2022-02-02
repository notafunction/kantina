import { createSlice } from '@reduxjs/toolkit'

export const itemsSlice = createSlice({
  name: 'items',

  initialState: {},

  reducers: {
    add: (state, item) => {
      state[item.id] = item
    },

    remove: (state, itemId) => {
      delete state[itemId]
    }
  }
})

export const { add, remove } = itemsSlice.actions
export default itemsSlice.reducer
