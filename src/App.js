import './App.css';
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

function App() {
  const [posts, updatePosts] = useState([])

  const query = `
    query listPosts {
      listPosts {
        id title content username
      }
    }
  `
  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query })
      console.log('data from GraphQL: ', postData)
      updatePosts(postData.data.listPosts.items)
    } catch (err) {
      console.log('error fetching posts...', err)
    }
  }


  return (
    <div className="App">
      {
        posts.map((post, index) => (
          <div key={index}>
            <h1>BY FUCK!</h1>
            <h3>{post.username}</h3>
            <h5>{post.title}</h5>
            <p>{post.content}</p>
          </div>
        ))
      }
    </div>
  );

}

export default App;
