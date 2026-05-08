const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require("../config/db");


// ================= REGISTER =================

router.post("/register", async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    // validation

    if (!name || !email || !password) {

      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check existing email

    const checkSql =
      "SELECT * FROM users WHERE email = ?";

    db.query(
      checkSql,
      [email],
      async (checkErr, checkResult) => {

        if (checkErr) {

          console.log(checkErr);

          return res.status(500).json({
            message: "Database Error",
          });
        }

        // email exists

        if (checkResult.length > 0) {

          return res.status(400).json({
            message: "Email already exists",
          });
        }

        // hash password

        const hashedPassword =
          await bcrypt.hash(password, 10);

        // insert user

        const insertSql =
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

        db.query(
          insertSql,
          [name, email, hashedPassword, role],
          (insertErr, result) => {

            if (insertErr) {

              console.log(insertErr);

              return res.status(500).json({
                message: "Registration Failed",
              });
            }

            res.status(201).json({
              message:
                "User Registered Successfully",
            });
          }
        );
      }
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ================= LOGIN =================

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  // validation

  if (!email || !password) {

    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const sql =
    "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {

    if (err) {

      console.log(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    // user not found

    if (result.length === 0) {

      return res.status(400).json({
        message: "User not found",
      });
    }

    const user = result[0];

    // compare password

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // create jwt token

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "secretkey",
      {
        expiresIn: "1d",
      }
    );

    // response

    res.status(200).json({

      message: "Login Successful",

      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
});

module.exports = router;