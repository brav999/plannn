// src/routes/taskRoutes.js
const express = require("express");
const { getTasks, createTask } = require("../controllers/taskController");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/", getTasks);
router.post("/", createTask);
router.put(
  "/:id",
  [check("id", "Invalid task ID").isMongoId(), authMiddleware],
  updateTask
);
router.delete(
  "/:id",
  [check("id", "Invalid task ID").isMongoId(), authMiddleware],
  deleteTask
);

module.exports = router;
