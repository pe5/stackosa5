import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  const loggedUsername = JSON.stringify(loggedUser.username)
  const loggedName = JSON.stringify(loggedUser.name)
  console.log(loggedUser)

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: {
        username: loggedUsername,
        name: loggedName
      }
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }



  return (
    <div>
      <form onSubmit={addBlog}>
      title: <input
          id='title'
          value={newTitle}
          onChange={handleTitleChange}
        /><br />
      author: <input
          id='author'
          value={newAuthor}
          onChange={handleAuthorChange}
        /><br />
      url: <input
          id='url'
          value={newUrl}
          onChange={handleUrlChange}
        /><br />
        <button id='save' type="submit">save</button>
      </form>
    </div>
  )}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm