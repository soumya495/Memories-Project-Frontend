import { combineReducers } from '@reduxjs/toolkit'

import postsReducer from '../slices/postsSlice'

const rootReducer = combineReducers({
  posts: postsReducer,
})

export default rootReducer
