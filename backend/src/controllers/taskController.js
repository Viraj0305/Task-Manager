import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, description, priority } = req.body;

  const task = await Task.create({
    title,
    description,
    priority,
    user: req.user.id
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  let tasks;

  if (req.user.role === "admin") {
    // ✅ admin sees ALL tasks
    tasks = await Task.find().populate("user", "name email");
  } else {
    // 👤 user sees only own tasks
    tasks = await Task.find({ user: req.user.id });
  }

  res.json(tasks);
};



export const deleteTask = async (req, res) => {
  const filter =
    req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

  const task = await Task.findOneAndDelete(filter);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted" });
};


export const updateTask = async (req, res) => {
  const filter =
    req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

  const task = await Task.findOneAndUpdate(filter, req.body, {
    new: true
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};




