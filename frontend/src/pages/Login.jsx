import { useState } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleLogin = async () => {

  try {

    const provider =
      new GoogleAuthProvider();

    const result =
      await signInWithPopup(
        auth,
        provider
      );

    const user = {
      name: result.user.displayName,
      email: result.user.email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    navigate("/dashboard");

  } catch (error) {

    console.log(error);

    alert(error.message);
    console.log(error);
  }
};

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://task-manager-app-production-fcb5.up.railway.app/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      alert("Login Failed");

    }
  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>Login</h1>

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

        <button type="submit">
          Login
        </button>
        
        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleLogin}
        >
  Continue with Google
</button>

        <p>
          Don't have an account?

          <Link to="/register">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;