import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../slices/loaderSlice'
import Loader from '../components/Loader'
import * as api from '../api'

function PostDetails() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.loading)
  const [postData, setPostData] = useState(null)
  const postId = location.pathname.split('/')[2]
  console.log('post Id', postId)

  const getPost = async () => {
    dispatch(setLoading(true))
    try {
      const { data } = await api.getPost(postId)
      dispatch(setLoading(false))
      setPostData(data)
      console.log('post data', data)
    } catch (error) {
      console.log('get post error', error)
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  if (loading || postData === null) {
    return (
      <div className='w-11/12 md:w-[60%] lg:w-[70%] grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 mb-6'>
        <Loader />
      </div>
    )
  } else {
    const { title } = postData

    return <div>{title}</div>
  }
}

export default PostDetails
