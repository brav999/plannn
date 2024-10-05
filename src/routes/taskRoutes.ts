// src/routes/taskRoutes.ts

import express from "express";
import { check } from "express-validator";
import createTask, {
  getTasks,
  updateTask,
} from "../controllers/taskController";
const router = express.Router();

// Define type for middleware function (assuming authMiddleware is already converted)
type AuthMiddleware = (req: any, res: any, next: any) => void;

router.get("/", getTasks);
router.post("/", createTask);
router.put(
  "/:id",
  [check("id", "Invalid task ID").isMongoId()], // Remove authMiddleware for now (assuming separate conversion)
  updateTask
);
router.delete(
  "/:id",
  [check("id", "Invalid task ID").isMongoId()], // Remove authMiddleware for now (assuming separate conversion)
  deleteTask
);

// Add authMiddleware after conversion (assuming it's in a separate file)
// router.put("/:id", [check("id", "Invalid task ID").isMongoId(), authMiddleware], updateTask);
// router.delete("/:id", [check("id", "Invalid task ID").isMongoId(), authMiddleware], deleteTask);

module.exports = router;
