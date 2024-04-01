import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import "./Header.css"

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo linkButton">
        <Link to="/">Green Market</Link>
      </div>
      <div className="title">
        <p>Growing Thrift Stores</p>
      </div>
      <ul>
        {user ? (
          <div>
            <li className="linkButton">
              <Link to="/tickets">Home</Link>
            </li>
            <li className="linkButton">
              <button  onClick={onLogout}>
                Logout
              </button>
            </li>
          </div>
        ) : (
          <div>
            <li className="linkButton">
              <Link to="/login">Login</Link>
            </li>
            <li className="linkButton">
              <Link to="/register">Register</Link>
            </li>
          </div>
        )}
      </ul>
    </header>
  );
}

export default Header;
