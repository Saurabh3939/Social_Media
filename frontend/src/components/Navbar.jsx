import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className='navbar'>
      <div className='nav-logo'>
        <Link to='/'>Social App</Link>
      </div>
      <div className='nav-links'>
        {user ? (
          <>
            <span className='welcome-msg'>Hi , {user.username}</span>
            <button className='logout-btn' onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className='nav-item'>
              Login
            </Link>
            <Link to='/signup' className='nav-itm signup-link'>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
