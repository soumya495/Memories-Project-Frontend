import { combineReducers } from '@reduxjs/toolkit'

import postsReducer from '../slices/postsSlice'
import authReducer from '../slices/authSlice'

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
})

export default rootReducer
