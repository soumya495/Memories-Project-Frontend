import axios from 'axios'

const url = 'http://localhost:5000'

export const fetchPosts = () => axios.get(`${url}/posts`)

export const createPost = (newPost) => axios.post(`${url}/posts`, newPost)

export const updatePost = (updatedPost, id) =>
  axios.patch(`${url}/posts/${id}`, updatedPost)

export const deletePost = (id) => {
  axios.delete(`${url}/posts/${id}`)
}
