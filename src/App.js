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

  const mutation = `
    mutation createPost($post: PostInput!) {
      createPost(post: $post) {
        id title content
      }
    }
  `

  // const subscription = `
  //   subscription onCreatePost {
  //     onCreatePost {
  //       id title content
  //     }
  //   }
  // `

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query })
      console.log('data from GraphQL: ', postData.data.listPosts)
      updatePosts(postData.data.listPosts)
    } catch (err) {
      console.log('error fetching posts...', err)
    }
  }

  (async function createPost() {
    await API.graphql({
      query: mutation,
      variables: { post: { id: '5', title: 'Client-side Note 5', content: 'Note 5 sent from UI' } }
    })
    console.log('post successfully created')
  })();

  // function subscribe() {
  //   API.graphql({
  //     query: subscription
  //   })
  //   .subscribe({
  //     next: postData => {
  //       console.log('postData: ', postData)
  //     }
  //   })
  // }


  return (
    <div className="App">
      {
        posts.map((post, index) => (
          <div key={index}>
            <h3>{post.username} ? {post.username} : 'UNKNOWN USER'</h3>
            <h5>{post.title}</h5>
            <p>{post.content}</p>
          </div>
        ))
      }
    </div>
  );

}

export default App;
