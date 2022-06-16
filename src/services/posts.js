import * as api from '../api'

import {
  setPosts,
  addNewPost,
  setUpdatePost,
  setDeletedPost,
} from '../slices/postsSlice'

export function getPosts() {
  return async (dispatch) => {
    try {
      const { data } = await api.fetchPosts()
      dispatch(setPosts(data))
    } catch (error) {
      console.log('get posts error............', error)
    }
  }
}

export function createPost(newPost) {
  return async (dispatch) => {
    try {
      const { data } = await api.createPost(newPost)
      dispatch(addNewPost(data))
    } catch (error) {
      console.log('create post error...........', error)
    }
  }
}

export function updatePost(updatedPost, id) {
  return async (dispatch) => {
    try {
      const { data } = await api.updatePost(updatedPost, id)
      dispatch(setUpdatePost(data))
    } catch (error) {
      console.log('update post error...........', error)
    }
  }
}

export function deletePost(id) {
  return async (dispatch) => {
    try {
      api.deletePost(id)
      dispatch(setDeletedPost(id))
    } catch (error) {
      console.log('delete post error............ ', error)
    }
  }
}
