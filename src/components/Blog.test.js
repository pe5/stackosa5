import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import TestBlog from './TestBlog'


test('renders title, author', () => {
    const blog = {
        title: 'testii',
        author: 'testman',
        url: 'test.com',
        likes: 12
    }

    const component = render(
        <TestBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent('testii')
    expect(component.container).toHaveTextContent('testman')
    expect(component.container).not.toHaveTextContent('test.com')
    expect(component.container).not.toHaveTextContent('likes')
})

test('renders also url and likes when button pressed', () => {
    const blog = {
        title: 'testii',
        author: 'testman',
        url: 'test.com',
        likes: 12,
        user: {
            name: 'testi',
            username: 'testimies',
            password: '123'
        }
    }

    const component = render(
        <TestBlog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('testii')
    expect(component.container).toHaveTextContent('testman')
    expect(component.container).toHaveTextContent('test.com')
    expect(component.container).toHaveTextContent('likes')
})

test('clicking the like button twice calls event handler twice', async () => {
    const blog = {
        title: 'testii',
        author: 'testman',
        url: 'test.com',
        likes: 12,
        user: {
            name: 'testi',
            username: 'testimies',
            password: '123'
        }
    }
    
    const mockHandler = jest.fn()
    
    const component = render(
        <TestBlog blog={blog} updateBlogs={mockHandler} />
    )

    const viewbutton = component.getByText('view')
    fireEvent.click(viewbutton)

    component.debug()

    const likebutton = component.getByText('addlike')
    fireEvent.click(likebutton)
    fireEvent.click(likebutton)

    expect(mockHandler.mock.calls.length).toBe(2)
})