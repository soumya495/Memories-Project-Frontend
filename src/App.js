import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getPosts } from './services/posts'

import './App.css'

import Navbar from './components/Navbar'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <div className='container w-[95%] max-w-[1400px] mx-auto'>
      <Router>
        <Navbar />
      </Router>
      <div className='flex items-start space-x-6'>
        <Posts />
        <Form />
      </div>
      <ToastContainer position='top-center' />
    </div>
  )
}

export default App
