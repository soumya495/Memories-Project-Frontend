import Posts from '../components/Posts/Posts'
import Form from '../components/Form/Form'
import Pagination from '../components/Pagination'

function Home() {
  return (
    <div className='flex flex-col-reverse items-center md:flex-row md:items-start justify-between md:space-x-6'>
      <Posts />
      <div className='w-[90%] max-w-md md:w-[40%] lg:w-[30%] mb-6 md:mb-0'>
        <Form />
        <Pagination />
      </div>
    </div>
  )
}

export default Home
