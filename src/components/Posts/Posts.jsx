import { useSelector } from 'react-redux'

import Post from './Post/Post'
import Loader from '../Loader'

function Posts() {
  const { posts } = useSelector((state) => state.posts)
  const { loading } = useSelector((state) => state.loading)

  console.log('posts..........', posts)

  return (
    <div className='w-11/12 md:w-[60%] lg:w-[70%] grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 mb-6'>
      {loading ? (
        <Loader />
      ) : posts.length === 0 ? (
        <div className='flex items-center'>
          <div>
            <h2 className='text-3xl md:text-4xl text-center md:text-left font-extrabold text-pink-700'>
              NO
            </h2>
            <h2 className='text-3xl md:text-4xl text-center md:text-left font-extrabold text-pink-700'>
              POSTS
            </h2>
            <h2 className='text-3xl md:text-4xl text-center md:text-left font-extrabold text-blue-600'>
              FOUND
            </h2>
          </div>
        </div>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  )
}

export default Posts
