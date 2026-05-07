import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [tasks, setTasks] = useState([]);

  const [allTasks, setAllTasks] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      status: "Pending",
    });

  // ================= API URL =================

  const API_URL =
    "https://task-manager-app-production-9a8e.up.railway.app";

  // ================= STATS =================

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status === "Pending"
    ).length;

  // ================= FETCH USER TASKS =================

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/tasks/${user.id}`
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // ================= FETCH ALL TASKS (ADMIN) =================

  const fetchAllTasks = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/tasks/admin/all-tasks`
      );

      setAllTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchTasks();

    if (user.role === "admin") {

      fetchAllTasks();
    }

  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ================= ADD TASK =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.title ||
      !formData.description
    ) {

      return alert(
        "Please fill all fields"
      );
    }

    try {

      await axios.post(
        `${API_URL}/api/tasks`,
        {
          ...formData,
          user_id: user.id,
        }
      );

      alert("Task Added");

      fetchTasks();

      if (user.role === "admin") {

        fetchAllTasks();
      }

      setFormData({
        title: "",
        description: "",
        status: "Pending",
      });

    } catch (error) {

      console.log(error);

    }
  };

  // ================= DELETE TASK =================

  const deleteTask = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${API_URL}/api/tasks/${id}`
      );

      fetchTasks();

      if (user.role === "admin") {

        fetchAllTasks();
      }

    } catch (error) {

      console.log(error);

    }
  };

  // ================= UPDATE STATUS =================

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(
        `${API_URL}/api/tasks/${id}`,
        { status }
      );

      fetchTasks();

      if (user.role === "admin") {

        fetchAllTasks();
      }

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <>

      <Navbar />

      <div className="dashboard">

        <h1>
          Welcome {user.name}
        </h1>

        <h2>
          Task Dashboard
        </h2>

        {/* ================= ADMIN PANEL ================= */}

        {user.role === "admin" && (

          <div className="admin-panel">

            <h3>
              Admin Controls
            </h3>

            <p>
              Admin can manage all users'
              tasks.
            </p>

          </div>

        )}

        {/* ================= STATS ================= */}

        <div className="stats-container">

          <div className="stat-card">

            <h3>Total Tasks</h3>

            <p>{totalTasks}</p>

          </div>

          <div className="stat-card">

            <h3>Completed</h3>

            <p>{completedTasks}</p>

          </div>

          <div className="stat-card">

            <h3>Pending</h3>

            <p>{pendingTasks}</p>

          </div>

        </div>

        {/* ================= TASK FORM ================= */}

        <form
          className="task-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Task Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">
            Add Task
          </button>

        </form>

        {/* ================= USER TASKS ================= */}

        <div className="task-container">

          {tasks.length === 0 ? (

            <div className="empty-state">

              <h2>
                No Tasks Yet
              </h2>

              <p>
                Add your first task 🚀
              </p>

            </div>

          ) : (

            tasks.map((task) => (

              <div
                className="task-card"
                key={task.id}
              >

                <div className="task-header">

                  <h3>{task.title}</h3>

                  <span
                    className={
                      task.status ===
                      "Completed"
                        ? "completed-badge"
                        : "pending-badge"
                    }
                  >
                    {task.status}
                  </span>

                </div>

                <p>{task.description}</p>

                <div className="task-actions">

                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateStatus(
                        task.id,
                        e.target.value
                      )
                    }
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                  </select>

                  {user.role ===
                    "admin" && (

                    <button
                      onClick={() =>
                        deleteTask(
                          task.id
                        )
                      }
                    >
                      Delete
                    </button>

                  )}

                </div>

              </div>
            ))

          )}

        </div>

        {/* ================= ADMIN ALL TASKS ================= */}

        {user.role === "admin" && (

          <div className="admin-tasks">

            <h2>
              All Users Tasks
            </h2>

            <table>

              <thead>

                <tr>

                  <th>User</th>

                  <th>Email</th>

                  <th>Task</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {allTasks.map((task) => (

                  <tr key={task.id}>

                    <td>{task.name}</td>

                    <td>{task.email}</td>

                    <td>{task.title}</td>

                    <td>{task.status}</td>

                    <td>

                      <button
                        onClick={() =>
                          deleteTask(
                            task.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      <Footer />

    </>
  );
}

export default Dashboard;