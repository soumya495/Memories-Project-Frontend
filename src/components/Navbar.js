import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='flex justify-between p-6 shadow-md my-6 rounded-lg bg-white'>
      <NavLink to='/'>
        <div className='flex flex-col items-center'>
          <p className='text-xl font-semibold leading-6'>Memories</p>
          <p className='text-xs leading-3 italic tracking-widest'>
            Social Media
          </p>
        </div>
      </NavLink>
    </nav>
  )
}

export default Navbar
