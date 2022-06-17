import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getPosts } from '../services/posts'

import Posts from '../components/Posts/Posts'
import Form from '../components/Form/Form'

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <div className='flex flex-col-reverse items-center md:flex-row md:items-start justify-between md:space-x-6'>
      <Posts />
      <Form />
    </div>
  )
}

export default Home
