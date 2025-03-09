import { useState, useEffect } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    const task = { id: Date.now().toString(), content: newTask, completed: false };

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    await fetch(`/api/tasks/${id}`, { method: "PUT" });
  };

  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id));

    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Task Manager</h2>
      <input
        type="text"
        placeholder="New Task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={{ padding: "10px", width: "70%", marginRight: "10px" }}
      />
      <button onClick={addTask} style={{ padding: "10px" }}>Add Task</button>

      <ul style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ padding: "10px", borderBottom: "1px solid #ddd", display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              style={{ marginRight: "10px" }}
            />
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.content}</span>
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "auto", padding: "5px 10px" }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
