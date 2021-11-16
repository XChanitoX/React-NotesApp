import React, { Component } from 'react';
import './App.css';

import db from "./config/config";

import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
class App extends Component {

  constructor() {
    super();
    this.state = {
      notes: [
        
      ]
    };
   
    this.addNote = this.addNote.bind(this);
  }

  componentDidMount() {
    const { notes } = this.state;
    db.on('child_added', snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({notes});
    });
  }

  removeNote() {

  }

  addNote(note) {
    let { notes } = this.state;
    notes.push({
      noteId: note.length + 1,
      noteContent: note
    });
    this.setState({ notes });
  }

  render() {
    return(
      <div className="notesContainer">
        <div className="notesHeader">
          <h1>React y Firebase App</h1>
        </div>

        <div className="notesBody">
          <ul>
            {
            this.state.notes.map(note =>{
              return (
                <Note
                noteContent = {note.noteContent}
                noteId = {note.noteId}
                key = {note.noteId}
                />
              )
          })
          }
          </ul>
        </div>

        <div className="notesFooter">
          <NoteForm addNote={this.addNote}/>
        </div>
      </div>
    );
  }
}


export default App;
