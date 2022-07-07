import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../slices/loaderSlice'
import Loader from '../components/Loader'
import * as api from '../api'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { updatePost } from '../services/posts'
import { logUserOut } from '../slices/authSlice'
import { checkUserToken } from '../services/checkUserToken'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

function PostDetails() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const postId = location.pathname.split('/')[2]
  const { loading } = useSelector((state) => state.loading)
  const { user } = useSelector((state) => state.auth)
  const [postData, setPostData] = useState(null)
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

  const handleOnLike = (likes) => {
    if (!user) {
      toast.error('You are not Logged In!')
      return
    }

    // checks if login token is still valid
    if (!checkUserToken()) {
      toast.info('Session Expired!')
      dispatch(logUserOut())
      return
    }
    let post = postData
    let updatedPost = {}
    const existingLike = likes.filter((like) => like === user.result._id)
    if (existingLike.length === 0) {
      updatedPost = { ...post, likes: [...likes, user.result._id] }
    } else {
      updatedPost = {
        ...post,
        likes: likes.filter((like) => like !== user.result._id),
      }
    }
    setPostData(updatedPost)
    dispatch(updatePost(updatedPost, post._id))
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
    const { title, message, name, tags, selectedFile, createdAt, likes } =
      postData

    return (
      <div className='transparentCard max-w-[1100px] mx-auto p-6 flex flex-col-reverse gap-y-6 md:gap-y-0 md:gap-x-6 md:flex-row md:justify-between'>
        {/* text */}
        <div className='w-full max-w-[500px] md:max-w-[50%] lg:max-w-[calc(100%-500px)] mx-auto md:mx-0 md:flex md:flex-col md:justify-between'>
          <div>
            <p
              onClick={() => navigate(-1)}
              className='hidden md:flex items-center cursor-pointer text-gray-500 hover:text-gray-800'
            >
              <IoIosArrowBack /> Go Back
            </p>
            <p className='text-3xl font-semibold md:mt-4'>{title}</p>
            {tags && (
              <div className='flex items-center gap-x-2 mt-1'>
                {tags.map((tg, index) => (
                  <p key={index} className='text-gray-500 text-lg'>
                    #{tg}
                  </p>
                ))}
              </div>
            )}
            <p className='max-w-[98%] text-justify leading-7 break-words w-full my-4'>
              {message}
            </p>
          </div>
          <div className='flex justify-between'>
            <div
              className='flex items-center space-x-1 cursor-pointer'
              onClick={() => handleOnLike(likes)}
            >
              {user && likes.length > 0 && likes.includes(user.result._id) ? (
                <AiFillLike className='text-blue-600 text-xl' />
              ) : (
                <AiOutlineLike className='text-blue-600 text-xl' />
              )}
              <p className=' text-xl'>{likes.length}</p>
            </div>
            <div>
              <p className='text-gray-700 text-right text-xl flex items-center gap-x-2'>
                <span className='font-bold text-black'>Created By:</span>
                {name}
              </p>
              <p className='text-gray-700 text-right text-xl flex items-center gap-x-2'>
                <span className='font-bold text-black'>Posted :</span>
                {timeAgo.format(new Date(createdAt))}
              </p>
            </div>
          </div>
        </div>
        {/* image */}
        <div className='w-full max-w-[500px] md:max-w-[50%] lg:max-w-[500px] mx-auto md:mx-0'>
          <p
            onClick={() => navigate(-1)}
            className='flex items-center cursor-pointer text-gray-500 hover:text-gray-800 md:hidden'
          >
            <IoIosArrowBack /> Go Back
          </p>
          <div className='w-full h-max md:h-[400px] lg:h-[500px] flex justify-center items-center'>
            <LazyLoadImage
              alt='post'
              effect='blur'
              src={
                selectedFile !== ''
                  ? selectedFile
                  : '../Assets/placeholder.webp'
              }
              className='w-full md:max-w-[400px] md:max-h-[400px] lg:max-h-[500px] lg:max-w-[500px] rounded-lg object-contain shadow-xl'
            />
          </div>
        </div>
      </div>
    )
  }
}

export default PostDetails
