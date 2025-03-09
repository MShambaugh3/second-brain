import { useState, useEffect } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const addNote = async () => {
    const id = Date.now().toString();
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, content: newNote }),
    });
    setNotes([...notes, { id, content: newNote }]);
    setNewNote("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes</h1>
      <input
        type="text"
        placeholder="Write a note..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        style={{ padding: "10px", width: "80%", marginRight: "10px" }}
      />
      <button onClick={addNote} style={{ padding: "10px" }}>Add Note</button>
      <ul style={{ marginTop: "20px" }}>
        {notes.map((note) => (
          <li key={note.id} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
