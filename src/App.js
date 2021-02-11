import './App.css';
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

function App() {
  const [notes, updateNotes] = useState([])

  const query = `
    query listNotes {
      listNotes {
        id title content username
      }
    }
  `
  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    try {
      const noteData = await API.graphql({ query })
      console.log('data from GraphQL: ', noteData)
      updateNotes(noteData.data.listNotes.items)
    } catch (err) {
      console.log('error fetching notes...', err)
    }
  }


  return (
    <div className="App">
      {
        notes.map((note, index) => (
          <div key={index}>
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
