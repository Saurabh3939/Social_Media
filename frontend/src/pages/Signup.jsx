import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../api";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        email: formData.email.toLowerCase(),
      };
      await signUp(dataToSubmit);
      alert("Registration Successful! Please Login");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h2>Create Account</h2>
        <p>join Community Today</p>

        <form onSubmit={handleSubmit} className='auth-form'>
          <div className='input-group'>
            <label>FullName</label>
            <input
              type='text'
              placeholder='Enter Your Name'
              required
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className='input-group'>
            <label>Email Adress</label>
            <input
              type='email'
              placeholder='Enter Your Email'
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className='input-group'>
            <label>Password</label>
            <input
              type='Password'
              placeholder='Create A Password'
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button type='submit' className='auth-btn'>
            SignUp
          </button>
        </form>
        <p className='auth-footer'>
          Already Have An Account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;
