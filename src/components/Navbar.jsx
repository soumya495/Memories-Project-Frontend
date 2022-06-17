import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const user = false

  return (
    <nav className='flex justify-between items-center p-6 shadow-md my-6 rounded-lg bg-white'>
      <NavLink to='/'>
        <div className='flex flex-col items-center'>
          <p className='text-xl font-semibold leading-6 text-blue-600 uppercase'>
            Memories
          </p>
          <p className='text-xs font-medium leading-3 tracking-[0.22em] text-pink-700'>
            Social Media
          </p>
        </div>
      </NavLink>
      {user ? (
        <div className='flex justify-center items-center space-x-2'>
          <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex justify-center items-center font-bold'>
            S
          </div>
          <button className='bg-pink-700 text-white cursor-pointer p-1 px-4 rounded-md uppercase'>
            Log Out
          </button>
        </div>
      ) : (
        <button
          className='bg-blue-600 text-white p-1 px-4 rounded-md uppercase'
          onClick={() => navigate('/auth')}
        >
          Sign In
        </button>
      )}
    </nav>
  )
}

export default Navbar
