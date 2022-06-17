import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { setEditPost } from '../../../slices/postsSlice'
import { deletePost, updatePost } from '../../../services/posts'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

function Post({ post }) {
  const {
    createdAt,
    creator,
    name,
    likes,
    message,
    selectedFile,
    tags,
    title,
  } = post
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleOnLike = () => {
    if (!user) {
      toast.error('You are not Logged In!')
      return
    }
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
    dispatch(updatePost(updatedPost, post._id))
  }

  const handleDelete = () => {
    dispatch(deletePost(post._id))
    toast.success('Deleted Successfully!')
  }

  return (
    <div className='w-11/12 max-w-[280px] bg-white rounded-lg overflow-hidden shadow-lg'>
      <div className='h-[140px] relative after:absolute after:z-40 after:contents-[``] after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-[rgba(0,0,0,0.6)] after:to-[rgba(0,0,0,0.1)]'>
        <img
          src={
            selectedFile !== ''
              ? selectedFile
              : '../../../../Assets/placeholder.webp'
          }
          alt='post'
          className='h-full w-full object-cover'
        />
        <div className='absolute flex justify-between items-center z-50 top-4 left-4 right-4'>
          <div className='text-white'>
            <p>{name}</p>
            <p className='text-sm'>{timeAgo.format(new Date(createdAt))}</p>
          </div>
          {user && user.result._id === creator && (
            <AiOutlineEdit
              className='text-white text-xl cursor-pointer transition-all duration-300 hover:scale-125'
              onClick={() => dispatch(setEditPost(post))}
            />
          )}
        </div>
      </div>
      <div className='p-4 flex flex-col justify-between'>
        {tags.length && (
          <div className='flex space-x-2 flex-wrap'>
            {tags.split(' ').map((tag, index) => (
              <p key={index} className='text-sm text-gray-400 font-normal'>
                #{tag}
              </p>
            ))}
          </div>
        )}
        <div className='my-2 h-[110px] flex flex-col space-y-2'>
          <h4 className='font-semibold text-lg leading-5'>
            {title.length > 30 ? `${title.substring(0, 30) + '...'}` : title}
          </h4>
          <p className='text-gray-600 leading-5'>
            {message.length > 80
              ? `${message.substring(0, 80) + '...'}`
              : message}
            {/* TEST CHARCACTERS - 120 */}
            {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula. */}
          </p>
        </div>
        <div className='flex justify-between items-center flex-wrap'>
          <div
            className='flex items-center space-x-1 cursor-pointer'
            onClick={handleOnLike}
          >
            {user && likes.length > 0 && likes.includes(user.result._id) ? (
              <AiFillLike className='text-blue-600' />
            ) : (
              <AiOutlineLike className='text-blue-600' />
            )}
            <p>{likes.length}</p>
          </div>
          {user && user.result._id === creator && (
            <AiOutlineDelete
              className='text-blue-600 cursor-pointer text-lg'
              onClick={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Post
