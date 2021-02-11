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
    fetchNotes()
  }, [])

  async function fetchNotes() {
    try {
      const postData = await API.graphql({ query })
      console.log('data from GraphQL: ', postData)
      updateNotes(postData.data.listPosts.items)
    } catch (err) {
      console.log('error fetching notes...', err)
    }
  }


  return (
    <div className="App">
      {
        notes.map((note, index) => (
          <div key={index}>
            <h1>BY FUCK!</h1>
            <h3>{note.username}</h3>
            <h5>{note.title}</h5>
            <p>{note.content}</p>
          </div>
        ))
      }
    </div>
  );

}

export default App;
