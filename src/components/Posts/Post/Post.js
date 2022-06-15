import { BiLike } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

function Post({ post }) {
  const { createdAt, creator, likeCount, message, selectedFile, tags, title } =
    post

  return (
    <div className='w-11/12 max-w-[280px] bg-white rounded-lg overflow-hidden shadow-lg'>
      <div className='h-[140px] relative after:absolute after:z-40 after:contents-[``] after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-[rgba(0,0,0,0.6)] after:to-[rgba(0,0,0,0.1)]'>
        <img
          src={selectedFile}
          alt='post'
          className='h-full w-full object-cover'
        />
        <div className='absolute z-50 top-4 left-4'>
          <div className='text-white'>
            <p>{creator}</p>
            <p>{timeAgo.format(new Date(createdAt))}</p>
          </div>
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
        <div className='my-2 h-[110px] flex flex-col'>
          <h4 className='font-semibold text-lg'>{title}</h4>
          <p className='text-gray-600'>
            {message.length > 80
              ? `${message.substring(0, 80) + '...'}`
              : message}
            {/* TEST CHARCACTERS - 120 */}
            {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula. */}
          </p>
        </div>
        <div className='flex justify-between items-center flex-wrap'>
          <div className='flex items-center space-x-1 cursor-pointer'>
            <BiLike className='text-blue-600' />
            <p>{likeCount}</p>
          </div>
          <AiOutlineDelete className='text-blue-600 cursor-pointer text-lg' />
        </div>
      </div>
    </div>
  )
}

export default Post
