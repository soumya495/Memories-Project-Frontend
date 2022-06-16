import * as api from '../api'

import { setPosts, addNewPost, setUpdatePost } from '../slices/postsSlice'

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

export function updatePost(updatedPost, id) {
  return async (dispatch) => {
    try {
      const { data } = await api.updatePost(updatedPost, id)
      dispatch(setUpdatePost(data))
    } catch (error) {
      console.log('update post error...........', error.message)
    }
  }
}
