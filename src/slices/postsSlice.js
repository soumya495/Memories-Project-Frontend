import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPosts(state, value) {
      state.posts = value.payload
    },
    addNewPost(state, value) {
      state.posts = [...state.posts, value.payload]
    },
  },
})

export const { setPosts, addNewPost } = postsSlice.actions

export default postsSlice.reducer
