import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import TaskModal from "../components/TaskModal";
import "../styles/dashboard.css";

const emptyTask = {
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium"
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [currentTask, setCurrentTask] = useState(emptyTask);
  const [editId, setEditId] = useState(null);

  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

 const openAddModal = () => {
  setCurrentTask({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium"
  });
  setEditId(null);
  setEditable(true);
  setModalOpen(true);
};


 const openViewModal = (task) => {
  setCurrentTask({
    _id: task._id,
    title: task.title || "",
    description: task.description || "",
    status: task.status || "Pending",
    priority: task.priority || "Medium"
  });

  setEditId(task._id);
  setEditable(false);
  setModalOpen(true);
};


  const saveTask = async () => {
    if (!currentTask.title.trim()) return;

    if (editId) {
      await API.put(`/tasks/${editId}`, currentTask);
    } else {
      await API.post("/tasks", currentTask);
    }

    setModalOpen(false);
    setEditable(false);
    loadTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="header-row">
          <h2>Your Tasks</h2>
          <button className="primary" onClick={openAddModal}>
            + Add Task
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} onClick={() => openViewModal(task)}>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <TaskModal
        isOpen={modalOpen}
        task={currentTask}
        setTask={setCurrentTask}
        editable={editable}
        setEditable={setEditable}
        onSave={saveTask}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
