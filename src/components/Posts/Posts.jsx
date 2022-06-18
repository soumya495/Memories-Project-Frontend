import { useSelector } from 'react-redux'

import Post from './Post/Post'
import Loader from '../Loader'

function Posts() {
  const { posts } = useSelector((state) => state.posts)

  console.log('posts..........', posts)

  return (
    <div className='w-11/12 md:w-[60%] lg:w-[70%] grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 mb-6'>
      {!posts.length ? (
        <Loader />
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  )
}

export default Posts
