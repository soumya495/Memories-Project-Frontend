import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'

import { createPost, updatePost } from '../../services/posts'
import { setEditPost } from '../../slices/postsSlice'
import { logUserOut } from '../../slices/authSlice'
import { checkUserToken } from '../../services/checkUserToken'

function Form() {
  const dispatch = useDispatch()
  const { editPost } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })

  useEffect(() => {
    if (editPost) {
      console.log(editPost)
      setFormData({
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
    if (!user) {
      toast.error('You are not Logged In!')
      return
    }
    console.log(formData)

    // checks if login token is still valid
    if (!checkUserToken()) {
      toast.info('Session Expired!')
      dispatch(logUserOut())
      return
    }

    if (editPost) {
      dispatch(updatePost(formData, editPost._id))
      dispatch(setEditPost(null))
      toast.success('Edited Successfully!')
    } else {
      const post = {
        ...formData,
        name: user.result.name,
        creator: user.result._id,
        createdAt: new Date().toISOString(),
      }
      dispatch(createPost(post))
      toast.success('Posted Successfully!')
    }
    setFormData({
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
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  const { title, message, tags } = formData

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
          name='title'
          required
          disabled={!user}
          value={title}
          onChange={handleOnChange}
          maxLength={60}
          placeholder='Title'
          className='border-[1px] border-slate-400 p-2 rounded-md'
        />
        <textarea
          name='message'
          required
          disabled={!user}
          value={message}
          onChange={handleOnChange}
          placeholder='Message'
          className='border-[1px] border-slate-400 p-2 resize-y rounded-md'
        />
        <input
          type='text'
          name='tags'
          required
          disabled={!user}
          value={tags}
          onChange={handleOnChange}
          maxLength={30}
          placeholder='Tags (Space Separated)'
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
              disabled={!user}
              className='bg-blue-600 text-white p-1 rounded-md'
            >
              Clear
            </button>
          ) : (
            <button
              onClick={handleCancel}
              disabled={!user}
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
