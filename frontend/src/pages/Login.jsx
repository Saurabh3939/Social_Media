import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../api";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Data To Backend", formData);

    try {
      const { data } = await signIn(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("profile", JSON.stringify(data.user));

      alert("Login Successful , Welcome back");
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h2>Welcome Back</h2>
        <p>Please Enter Your Details To Login</p>

        <form onSubmit={handleSubmit} className='auth-form'>
          <div className='input-group'>
            <label>Email Address</label>
            <input
              type='email'
              placeholder='Enter Your Email'
              value={formData.email}
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className='input-group'>
            <label>Password</label>
            <input
              type='password'
              placeholder='Enter Your Password'
              value={formData.password}
              required
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </div>
          <button type='submit' className='auth-btn'>
            Login
          </button>
        </form>
        <p className='auth-footer'>
          Don't Have An Account <Link to='/signup'>Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
