/* eslint-disable no-console */

import React from "react"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  getPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/posts")
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      this.setState({
        posts: json,
      })
      console.log(json)
    } catch (error) {
      console.error(error.message)
    }
  }

  createPost = async () => {
    const url = "http://localhost:8000/posts"
    const data = { id: 4, title: "New Post", postid: 4, author: "New" }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      this.getPosts()
      console.log(json)
    } catch (error) {
      console.error(error.message)
    }
  }

  updatePost = async () => {
    const url = "http://localhost:8000/posts/4"
    const data = {
      title: "Updated Post",
      postid: 4,
      author: "New",
    }
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      this.getPosts()
      console.log(json)
    } catch (error) {
      console.error(error.message)
    }
  }

  deletePost = async () => {
    const url = "http://localhost:8000/posts/4"
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      this.getPosts()
      console.log(json)
    } catch (error) {
      console.error(error.message)
    }
  }

  render() {
    const { posts } = this.state
    return (
      <div>
        <div className="container mx-auto p-4 m-4 border-solid border-2 border-gray-600 bg-gray-200">
          <h1 className="text-4xl text-gray-800 py-2 text-center">
            React Rest Example
          </h1>
          <ul className="flex flex-wrap py-4">
            <li className="mr-3">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-gray-800 font-bold m-1 py-2 px-4 rounded h-10"
                onClick={this.getPosts}
              >
                Get
              </button>
            </li>
            <li className="mr-3">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-gray-800 font-bold m-1 py-2 px-4 rounded h-10 mr-3"
                onClick={this.createPost}
              >
                Post
              </button>
            </li>
            <li className="mr-3">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-gray-800 font-bold m-1 py-2 px-4 rounded
    h-10 mr-3"
                onClick={this.updatePost}
              >
                Put
              </button>
            </li>
            <li className="mr-3">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-gray-800 font-bold m-1 py-2 px-4 rounded h-10 mr-3"
                onClick={this.deletePost}
              >
                Delete
              </button>
            </li>
          </ul>
          <table className="table-auto py-4 border-gray-500">
            <thead>
              <tr className="bg-gray-500">
                <th className="px-4 py-2 border-gray-600">Id</th>
                <th className="px-4 py-2 border-gray-600">Title</th>
                <th className="px-4 py-2 border-gray-600">Author</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td className="border px-4 py-2 border-gray-600">
                    {post.id}
                  </td>
                  <td className="border px-4 py-2 border-gray-600">
                    {post.title}
                  </td>
                  <td className="border px-4 py-2 border-gray-600">
                    {post.author}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App
