import { useState } from 'react'
import TagsInput from './TagsInput'
import { useSelector } from 'react-redux'

function SearchForm() {
  const [tagInputs, setTagInputs] = useState([])
  const { user } = useSelector((state) => state.auth)

  return (
    <div className='w-full rounded-lg shadow-lg p-6 mb-6 space-y-4 transparentCard'>
      <input
        type='search'
        placeholder='Search Memories'
        disabled={!user}
        className='border-[1px] w-full border-slate-400 p-2 rounded-md bg-transparent placeholder:text-gray-700'
      />
      <TagsInput
        tagInputs={tagInputs}
        setTagInputs={setTagInputs}
        user={user}
      />
      <button
        disabled={!user}
        className='bg-blue-500 text-white w-full p-2 rounded-md'
      >
        Search Memories
      </button>
    </div>
  )
}

export default SearchForm
