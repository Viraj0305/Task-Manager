import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, getTasks, deleteTask, updateTask } from "../controllers/taskController.js";


const router = express.Router();
router.use(protect);
router.post("/", createTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

export default router;
