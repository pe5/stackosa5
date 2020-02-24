import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateBlogs = (updatedBlogs) => {
    setBlogs(updatedBlogs)
  }

  // const addBlog = async (blogObject) => {

  //   blogFormRef.current.toggleVisibility()
  //   const testi = await blogService.create(blogObject)
  //   setBlogs(blogs.concat(testi))
  //   console.log(testi.user)
  //   setErrorMessage(`A new blog ${blogObject.title}`)
  //   setTimeout(() => {
  //     setErrorMessage(null)
  //   }, 5000)


  // }

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`A new blog ${blogObject.title}`)
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
      })
    


  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('succesfully logged in')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => {
    blogs.sort((a, b) => a.likes - b.likes)
    blogs.reverse()
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} />
        <p>
          {user.name} logged in <button onClick={handleLogout} type="submit">logout</button>
        </p>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs}/>
        )}
      </div>
    )}

  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }


    </div>
  )
}

export default App