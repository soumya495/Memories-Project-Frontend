import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'

import { createPost, updatePost } from '../../services/posts'
import { setEditPost } from '../../slices/postsSlice'

function Form() {
  const dispatch = useDispatch()
  const { editPost } = useSelector((state) => state.posts)

  const [formData, setFormData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })

  useEffect(() => {
    if (editPost) {
      console.log(editPost)
      setFormData({
        creator: editPost.creator,
        title: editPost.title,
        message: editPost.message,
        tags: editPost.tags,
        selectedFile: editPost.selectedFile,
      })
    }
  }, [editPost])

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    if (editPost) {
      dispatch(updatePost(formData, editPost._id))
      dispatch(setEditPost(null))
      toast.success('Edited Successfully!')
    } else {
      dispatch(createPost(formData))
      toast.success('Posted Successfully!')
    }
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

  const handleCancel = (e) => {
    e.preventDefault()
    dispatch(setEditPost(null))
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
    <div className='w-[90%] max-w-md md:w-[40%] lg:w-[30%] rounded-lg shadow-lg mb-6 md:mb-0 p-6 bg-white'>
      <p className='text-center mb-4'>
        {!editPost ? 'Creating a Memory' : 'Editing Memory'}
      </p>
      <form
        autoComplete='off'
        onSubmit={handleOnSubmit}
        className='flex flex-col gap-y-4'
      >
        <input
          type='text'
          name='creator'
          required
          value={creator}
          onChange={handleOnChange}
          placeholder='Creator'
          className='border-[1px] border-slate-400 p-2 rounded-md'
        />
        <input
          type='text'
          name='title'
          required
          value={title}
          onChange={handleOnChange}
          maxLength={60}
          placeholder='Title'
          className='border-[1px] border-slate-400 p-2 rounded-md'
        />
        <textarea
          name='message'
          required
          value={message}
          onChange={handleOnChange}
          placeholder='Message'
          className='border-[1px] border-slate-400 p-2 resize-y rounded-md'
        />
        <input
          type='text'
          name='tags'
          required
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
            className='bg-pink-700 text-white cursor-pointer p-2 rounded-md uppercase'
          >
            {!editPost ? 'Submit' : 'Edit'}
          </button>

          {!editPost ? (
            <button
              onClick={handleClear}
              className='bg-blue-600 text-white p-1 rounded-md'
            >
              Clear
            </button>
          ) : (
            <button
              onClick={handleCancel}
              className='bg-blue-600 text-white p-1 rounded-md'
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Form
