import * as api from '../api/index'
import { setUser } from '../slices/authSlice'

export const signIn = (userData, navigate) => async (dispatch) => {
  try {
    // sign in the user
    const { data } = await api.signIn(userData)
    dispatch(setUser(data))
    navigate('/')
  } catch (error) {
    console.log('Sign In Error............', error)
  }
}

export const signUp = (userData, navigate) => async (dispatch) => {
  try {
    // sign up the user
    const { data } = await api.signUp(userData)
    dispatch(setUser(data))
    navigate('/')
  } catch (error) {
    console.log('Sign Up Error............', error)
  }
}
