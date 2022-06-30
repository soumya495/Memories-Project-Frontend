import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../slices/loaderSlice'
import Loader from '../components/Loader'
import * as api from '../api'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

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
    const { title, message, name, tags, selectedFile, createdAt } = postData

    return (
      <div className='max-w-max mx-auto flex flex-col-reverse items-center md:flex-row md:items-start justify-between md:space-x-6 transparentCard p-6 mb-6'>
        {/* text */}
        <div className='w-full mt-6 md:mt-0 md:w-[50%]'>
          <p className='text-2xl font-semibold'>{title}</p>
          {tags && (
            <div className='flex items-center gap-x-2'>
              {tags.map((tg) => (
                <p className='text-gray-500'>#{tg}</p>
              ))}
            </div>
          )}
          <p className='leading-7 my-4 break-words w-full min-h-[100px] max-w-[600px]'>
            {message}
          </p>
          <p className='text-gray-700 flex items-center gap-x-2'>
            <span className='font-bold text-black'>Created By:</span>
            {name}
          </p>
          <p className='text-gray-700 flex items-center gap-x-2'>
            <span className='font-bold text-black'>Posted :</span>
            {timeAgo.format(new Date(createdAt))}
          </p>
        </div>
        {/* image */}
        <div className='w-full md:w-[50%] flex justify-center md:justify-end postDetailsImg'>
          <LazyLoadImage
            alt='post'
            effect='blur'
            src={
              selectedFile !== '' ? selectedFile : '../Assets/placeholder.webp'
            }
          />
        </div>
      </div>
    )
  }
}

export default PostDetails
