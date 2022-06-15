import { useState } from 'react'
import { useDispatch } from 'react-redux'
import FileBase from 'react-file-base64'

import { createPost } from '../../services/posts'

function Form() {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    dispatch(createPost(formData))
    setFormData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
    e.target.reset()
  }

  const handleClear = (e) => {
    e.preventDefault()
    setFormData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  const { creator, title, message, tags } = formData

  return (
    <div className='w-[30%] rounded-lg shadow-lg p-6 bg-white'>
      <p className='text-center mb-4'>Creating a Memory</p>
      <form
        autoComplete='off'
        onSubmit={handleOnSubmit}
        className='flex flex-col gap-y-4'
      >
        <input
          type='text'
          name='creator'
          value={creator}
          onChange={handleOnChange}
          placeholder='Creator'
          className='border-[1px] border-slate-400 p-2 rounded-md'
        />
        <input
          type='text'
          name='title'
          value={title}
          onChange={handleOnChange}
          placeholder='Title'
          className='border-[1px] border-slate-400 p-2 rounded-md'
        />
        <textarea
          name='message'
          value={message}
          onChange={handleOnChange}
          placeholder='Message'
          className='border-[1px] border-slate-400 p-2 resize-y rounded-md'
        />
        <input
          type='text'
          name='tags'
          value={tags}
          onChange={handleOnChange}
          placeholder='Tags'
          className='border-[1px] border-slate-400 p-2 rounded-md'
        />
        <FileBase
          type='file'
          multiple={false}
          onDone={({ base64 }) =>
            setFormData({ ...formData, selectedFile: base64 })
          }
        />
        <div className='w-full flex flex-col space-y-2'>
          <button
            type='submit'
            className='bg-pink-700 text-white cursor-pointer p-2 rounded-md'
          >
            Submit
          </button>
          <button
            onClick={handleClear}
            className='bg-blue-600 text-white p-1 rounded-md'
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
