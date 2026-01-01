import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const openUser = async (user) => {
    setSelectedUser(user);

    const res = await API.get("/tasks");
    setTasks(res.data.filter(t => t.user?._id === user._id));
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const deleteUser = async () => {
    if (!window.confirm("Delete user and all tasks?")) return;

    await API.delete(`/admin/users/${selectedUser._id}`);
    setSelectedUser(null);
    loadUsers();
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Admin Dashboard</h2>

        {!selectedUser && (
          <div className="user-grid">
            {users.map((u) => (
              <div
                key={u._id}
                className="user-card"
                onClick={() => openUser(u)}
              >
                <h4>{u.name}</h4>
                <p>{u.email}</p>
              </div>
            ))}
          </div>
        )}

        {selectedUser && (
          <>
            <button className="secondary" onClick={() => setSelectedUser(null)}>
              ← Back to Users
            </button>

            <h3>{selectedUser.name}'s Tasks</h3>

            <button className="delete" onClick={deleteUser}>
              Delete User
            </button>

            <ul className="task-list">
              {tasks.map(task => (
                <li key={task._id}>
                  <div className="task-left">
                    <strong>{task.title}</strong>
                  </div>

                  <div className="task-right">
                    <span className={`status ${task.status.replace(" ", "-")}`}>
                      {task.status}
                    </span>

                    <span className={`priority ${task.priority}`}>
                      {task.priority}
                    </span>

                    <button
                      className="delete"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
