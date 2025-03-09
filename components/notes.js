import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import Quill.js to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [category, setCategory] = useState("General");

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const addNote = async () => {
    if (!newNote.trim()) return;

    const id = Date.now().toString();
    const note = { id, content: newNote, category };

    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });

    setNotes([...notes, note]);
    setNewNote("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Notes</h2>

      {/* Category Selection */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginBottom: "10px" }}>
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      {/* Rich Text Editor */}
      <ReactQuill value={newNote} onChange={setNewNote} style={{ height: "150px", marginBottom: "10px" }} />

      {/* Add Note Button */}
      <button onClick={addNote} style={{ padding: "10px", marginBottom: "10px" }}>Add Note</button>

      {/* Notes List */}
      <ul style={{ marginTop: "20px" }}>
        {notes.map((note) => (
          <li key={note.id} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            <strong>({note.category})</strong> <br />
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
