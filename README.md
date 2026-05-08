# Task Manager Application

A full-stack Task Management web application built using React, Node.js, Express.js, MySQL, and deployed on Railway.

---

# Features

## Authentication & Authorization

* User Registration
* User Login
* Password Encryption using bcrypt
* JWT Authentication
* Role-Based Access Control (RBAC)
* Admin/User role selection during registration

---

## Task Management

* Create Tasks
* View Tasks
* Update Task Status
* Delete Tasks
* User-specific task management

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* CSS

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt

## Database

* MySQL

## Deployment

* Railway

---

# Project Structure

```bash
project-root/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone <repository-url>
cd task-manager-app
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=your_port
JWT_SECRET=your_secret
```

Run backend:

```bash
npm start
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Database Tables

## Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user'
);
```

---

## Tasks Table

```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'Pending',
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# API Endpoints

## Authentication APIs

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

---

## Task APIs

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/tasks     | Get All Tasks |
| POST   | /api/tasks     | Create Task   |
| PUT    | /api/tasks/:id | Update Task   |
| DELETE | /api/tasks/:id | Delete Task   |

---

# RBAC (Role Based Access Control)

The application supports:

* Admin
* User

Admins can manage broader application functionalities while normal users can manage their own tasks.

---

# Deployment

## Frontend Deployment

* Railway

## Backend Deployment

* Railway

## Database

* Railway MySQL

---

# Environment Variables

## Backend

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
JWT_SECRET=
```



# Author

Gaurav Kumar

---

# Project Status

Completed and deployed successfully.
