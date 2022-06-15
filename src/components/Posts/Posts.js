import { useSelector } from 'react-redux'

import Post from './Post/Post'

function Posts() {
  const { posts } = useSelector((state) => state.posts)

  console.log('posts..........', posts)

  return (
    <div className='w-[70%] grid grid-cols-3'>
      {!posts.length ? (
        <h2>Loading ...</h2>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  )
}

export default Posts
