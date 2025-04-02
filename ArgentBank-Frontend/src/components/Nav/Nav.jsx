import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import de l'icône FontAwesome
import logo from "../../assets/img/argentBankLogo.png";
import "./Nav.scss";
const Nav = () => {
  return (
    <div className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <NavLink to="/user/login" className="main-nav-item">
          <FaUserCircle className="icon" />
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
