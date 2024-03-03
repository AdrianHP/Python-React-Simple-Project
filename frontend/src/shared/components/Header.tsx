import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContex";
import "./Headers.css";

function Header() {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="header">
      {user ? (
        <span onClick={logoutUser}>Logout</span>
      ) : (
        <>
          <div>
            <Link to="/login">Login</Link>
          </div>{" "}
          <div>|</div>{" "}
          <div>
            <Link to="/register">Register</Link>
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default Header;
