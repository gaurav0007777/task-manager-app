const express = require("express");

const router = express.Router();

const db = require("../config/db");


// ================= CREATE TASK =================

router.post("/", (req, res) => {

  const {
    title,
    description,
    status,
    user_id
  } = req.body;

  const sql =
    "INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [title, description, status, user_id],
    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message: "Task Creation Failed",
        });
      }

      res.json({
        message: "Task Created Successfully",
      });
    }
  );
});


// ================= GET USER TASKS =================

router.get("/:userId", (req, res) => {

  const { userId } = req.params;

  const sql =
    "SELECT * FROM tasks WHERE user_id = ?";

  db.query(
    sql,
    [userId],
    (err, result) => {

      if (err) {

        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});


// ================= ADMIN GET ALL USERS + TASKS =================

router.get("/admin/all-tasks", (req, res) => {

  const sql = `
  
    SELECT 
      tasks.id,
      tasks.title,
      tasks.description,
      tasks.status,
      users.name,
      users.email
    FROM tasks
    JOIN users
    ON tasks.user_id = users.id
  
  `;

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      return res.status(500).json({
        message: "Failed to fetch tasks",
      });
    }

    res.json(result);
  });
});


// ================= DELETE TASK =================

router.delete("/:id", (req, res) => {

  const { id } = req.params;

  const sql =
    "DELETE FROM tasks WHERE id = ?";

  db.query(
    sql,
    [id],
    (err, result) => {

      if (err) {

        return res.status(500).json(err);
      }

      res.json({
        message: "Task Deleted",
      });
    }
  );
});


// ================= UPDATE TASK =================

router.put("/:id", (req, res) => {

  const { id } = req.params;

  const { status } = req.body;

  const sql =
    "UPDATE tasks SET status = ? WHERE id = ?";

  db.query(
    sql,
    [status, id],
    (err, result) => {

      if (err) {

        return res.status(500).json(err);
      }

      res.json({
        message: "Task Updated",
      });
    }
  );
});

module.exports = router;