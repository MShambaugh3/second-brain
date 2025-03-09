import { useState, useEffect } from 'react';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Load notes from API when the page loads
  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  // Function to add a new note
  const addNote = async () => {
    const id = Date.now().toString();
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, content: newNote }),
    });
    setNotes([...notes, { id, content: newNote }]);
    setNewNote('');
  };

  // Function to delete a note
  const deleteNote = async (id) => {
    await fetch('/api/notes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Notes</h1>
      <input
        type="text"
        placeholder="Write a note..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        style={{ padding: '10px', width: '80%', marginRight: '10px' }}
      />
      <button onClick={addNote} style={{ padding: '10px' }}>Add Note</button>
      
      <ul style={{ marginTop: '20px' }}>
        {notes.map((note) => (
          <li key={note.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', border: '1px solid #ddd', marginBottom: '5px' }}>
            {note.content}
            <button onClick={() => deleteNote(note.id)} style={{ background: 'red', color: 'white', padding: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
