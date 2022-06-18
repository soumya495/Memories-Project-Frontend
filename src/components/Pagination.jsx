import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../services/posts'

function Pagination() {
  const dispatch = useDispatch()
  const { pageInfo } = useSelector((state) => state.posts)

  if (!pageInfo) return null

  let currentPage = pageInfo.previous
    ? pageInfo.previous.page + 1
    : pageInfo.next
    ? pageInfo.next.page - 1
    : 1

  const goToNextPage = () => {
    dispatch(getPosts(currentPage + 1))
  }

  const goToPrevPage = () => {
    dispatch(getPosts(currentPage - 1))
  }
  return (
    <div className='w-full mt-4 rounded-lg shadow-lg p-6 bg-white flex justify-center items-center'>
      {pageInfo.previous && (
        <div
          className='w-10 h-10 border-[1px] border-gray-500 hover:border-gray-600 rounded-full flex justify-center items-center cursor-pointer group'
          onClick={goToPrevPage}
        >
          <BsChevronLeft className='fill-gray-500 transition-all duration-300 group-hover:scale-110 group-hover:fill-gray-600' />
        </div>
      )}
      <p className='text-3xl text-gray-500 ml-6 mr-6'>{currentPage}</p>
      {pageInfo.next && (
        <div
          className='w-10 h-10 border-[1px] border-gray-500 hover:border-gray-600 rounded-full flex justify-center items-center cursor-pointer group'
          onClick={goToNextPage}
        >
          <BsChevronRight className='fill-gray-500 transition-all duration-300 group-hover:scale-110 group-hover:fill-gray-600' />
        </div>
      )}
    </div>
  )
}

export default Pagination
