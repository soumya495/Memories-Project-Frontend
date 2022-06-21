import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../services/posts'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function Pagination() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { pageInfo } = useSelector((state) => state.posts)
  const { loading } = useSelector((state) => state.loading)

  let currentPage = searchParams.get('page')
    ? parseInt(searchParams.get('page'))
    : 1

  useEffect(() => {
    dispatch(getPosts(currentPage))
  }, [location])

  if (loading) {
    return (
      <div className='w-full min-h-[80px] mt-6 rounded-lg shadow-lg p-6 transparentCard flex justify-center items-center'>
        <h3 className='text-xl text-blue-600'>LOADING</h3>
      </div>
    )
  }

  if (!pageInfo) return null

  const goToNextPage = () => {
    navigate(`/posts?page=${currentPage + 1}`)
  }

  const goToPrevPage = () => {
    navigate(`/posts?page=${currentPage - 1}`)
  }

  return (
    <div className='w-full mt-6 rounded-lg shadow-lg p-6 transparentCard flex justify-center items-center'>
      <button
        className={`w-10 h-10 border-[1px]  rounded-full flex justify-center items-center  group ${
          pageInfo.previous
            ? 'cursor-pointer border-gray-500 hover:border-gray-600'
            : 'border-gray-400'
        }`}
        disabled={pageInfo.previous ? false : true}
        onClick={goToPrevPage}
      >
        <BsChevronLeft
          className={
            pageInfo.previous
              ? 'fill-gray-500 group-hover:fill-gray-600'
              : 'fill-gray-400'
          }
        />
      </button>
      <p className='text-3xl text-gray-500 ml-6 mr-6'>{currentPage}</p>
      <button
        className={`w-10 h-10 border-[1px]  rounded-full flex justify-center items-center  group ${
          pageInfo.next
            ? 'cursor-pointer border-gray-500 hover:border-gray-600'
            : 'border-gray-400'
        }`}
        disabled={pageInfo.next ? false : true}
        onClick={goToNextPage}
      >
        <BsChevronRight
          className={
            pageInfo.next
              ? 'fill-gray-500 group-hover:fill-gray-600'
              : 'fill-gray-400'
          }
        />
      </button>
    </div>
  )
}

export default Pagination
