import "../styles/dashboard.css";

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  task,
  setTask,
  editable,
  setEditable
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>{editable ? "Edit Task" : "Task Details"}</h3>

        <label>Title</label>
        <input
          disabled={!editable}
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />

        <label>Description</label>
        <textarea
          disabled={!editable}
          value={task.description}
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
        />

        <label>Status</label>
        <select
            disabled={!editable}
            value={task.status || "Pending"}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
        </select>
<label>Priority</label>
<select
  disabled={!editable}
  value={task.priority || "Medium"}
  onChange={(e) => setTask({ ...task, priority: e.target.value })}
>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
</select>


        <div className="modal-actions">
          {!editable && (
            <button
              className="primary"
              onClick={() => setEditable(true)}
            >
              Edit
            </button>
          )}

          {editable && (
            <button className="primary" onClick={onSave}>
              Save
            </button>
          )}

          <button className="secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
