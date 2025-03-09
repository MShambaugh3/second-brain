import { useState } from "react";
import NotesPage from "../components/notes";
import CalendarPage from "../components/calendar";
import TaskManager from "../components/TaskManager";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("notes");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#2c3e50", color: "white", padding: "20px" }}>
        <h2>Second Brain</h2>
        <ul>
          <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => setActiveTab("notes")}>
            📝 Notes
          </li>
          <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => setActiveTab("calendar")}>
            📅 Calendar
          </li>
          <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => setActiveTab("tasks")}>
            ✅ Tasks
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {activeTab === "notes" && <NotesPage />}
        {activeTab === "calendar" && <CalendarPage />}
        {activeTab === "tasks" && <TaskManager />}
      </div>
    </div>
  );
}
