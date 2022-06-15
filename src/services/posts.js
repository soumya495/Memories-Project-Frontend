import * as api from '../api'

import { setPosts, addNewPost } from '../slices/postsSlice'

export function getPosts() {
  return async (dispatch) => {
    try {
      const { data } = await api.fetchPosts()
      dispatch(setPosts(data))
    } catch (error) {
      console.log('get posts error............', error.message)
    }
  }
}

export function createPost(newPost) {
  return async (dispatch) => {
    try {
      const { data } = await api.createPost(newPost)
      dispatch(addNewPost(data))
    } catch (error) {
      console.log('create post error...........', error.message)
    }
  }
}
