import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { BiFirstPage, BiLastPage } from 'react-icons/bi'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../services/posts'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import Pagination from 'react-js-pagination'

function PaginationComp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { pageInfo } = useSelector((state) => state.posts)
  const { loading } = useSelector((state) => state.loading)

  const currentPage = searchParams.get('page')
    ? parseInt(searchParams.get('page'))
    : 1

  useEffect(() => {
    dispatch(getPosts(currentPage))
  }, [location])

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`)
    navigate(`/posts?page=${pageNumber}`)
  }

  if (!pageInfo) return null

  return (
    <div>
      {loading ? (
        <div className='pagination'>
          <p className='text-blue-500 text-xl font-semibold'>Loading ...</p>
        </div>
      ) : (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={6}
          totalItemsCount={pageInfo.totalPosts}
          pageRangeDisplayed={3}
          onChange={handlePageChange}
          prevPageText={<BsChevronLeft title='Prev Page' />}
          nextPageText={<BsChevronRight title='Next Page' />}
          firstPageText={<BiFirstPage title='Page One' />}
          lastPageText={
            <BiLastPage title={`Page ${Math.ceil(pageInfo.totalPosts / 6)}`} />
          }
        />
      )}
    </div>
  )
}

export default PaginationComp
