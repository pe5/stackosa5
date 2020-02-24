import React, { useState } from 'react'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogs }) => {
  const blogStyle ={
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  const blogUser = JSON.stringify(blog.user.username)
  const loggedUsername = JSON.stringify(loggedUser.username)
  console.log(blog.user)
  console.log(blogUser)

  const handleClick = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const newLikes = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }
    BlogService.update(blog.id, newLikes)
    const paivitys = await BlogService.getAll()
    updateBlogs(paivitys)
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      BlogService.remove(blog.id)
      const paivitys = await BlogService.getAll()
      updateBlogs(paivitys)
    }
  }

  if (visible && blogUser !== loggedUsername) {
    console.log(blogUser)
    console.log(loggedUsername)
    return (
      <div style={blogStyle} className='notSame'>
        <div>
          {blog.title} {blog.author} <button onClick={handleClick}>hide</button>
          <br />
          {blog.url} <br />
                    likes {blog.likes} <button id='like' onClick={handleLike}>like</button> <br />
          {blog.user.name}
        </div>
      </div>
    )
  } else if (visible && blogUser === loggedUsername) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={handleClick}>hide</button>
          <br />
          {blog.url} <br />
                likes {blog.likes} <button id='like' onClick={handleLike}>like</button> <br />
          {blog.user.name} <br />
          <button onClick={handleRemove}>remove</button>
        </div>
      </div> )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={handleClick}>view</button>
      </div>
    )
  }

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired
}

export default Blog