import axios from 'axios'

const url = 'http://localhost:5000'

const API = axios.create({ baseURL: url })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`
  }

  return req
})

// POSTS
export const fetchPosts = (pageNumber) =>
  API.get(`/posts?limit=6&page=${pageNumber}`)

export const createPost = (newPost) => API.post(`/posts`, newPost)

export const getPostsBySearch = (searchQuery) =>
  API.get(
    `posts/search?searchQuery=${searchQuery.title || 'none'}&tags=${
      searchQuery.tags
    }`
  )

export const updatePost = (updatedPost, id) =>
  API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => {
  API.delete(`/posts/${id}`)
}

// AUTHENTICATION
export const signIn = (userData) => API.post(`/user/signIn`, userData)
export const signUp = (userData) => API.post(`/user/signUp`, userData)
