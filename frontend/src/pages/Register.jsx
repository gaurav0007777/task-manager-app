import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://task-manager-app-production-9a8e.up.railway.app/api/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message
        || "Something went wrong"
      );

      console.log(error);
    }
  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>Register</h1>

        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formData.name}
          onChange={(e) => {

            const value = e.target.value;

            if (/^[A-Za-z\s]*$/.test(value)) {

              setFormData({
                ...formData,
                name: value,
              });
            }
          }}
        />

        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">
          Register
        </button>

        <p>
          Already have an account?

          <Link to="/">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;