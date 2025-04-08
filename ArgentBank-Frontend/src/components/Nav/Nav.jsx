import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logOut } from "../../redux/slices/authSlice";
import logo from "../../assets/img/argentBankLogo.png";

import "./Nav.scss";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Utilisation de useSelector pour récupérer l'utilisateur du Redux store
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = user !== null;

  const handleLogout = () => {
    console.log("Déconnexion en cours...");
    dispatch(logOut());
    navigate("/");
    console.log("Redirection vers la page d'accueil après déconnexion.");
  };

  console.log("Utilisation actuelle de l'application :");
  console.log("Utilisateur connecté : ", isLoggedIn);
  console.log("Utilisateur actuel : ", user);

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

      <div className="main-nav-items">
        {isLoggedIn ? (
          <>
            <NavLink to="/user/profile" className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} className="icon" />
              {/* Affiche le prénom de l'utilisateur ou "User" si le prénom est absent */}
              {user?.firstName || "User"}
            </NavLink>

            <button onClick={handleLogout} className="main-nav-item">
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
              Sign Out
            </button>
          </>
        ) : (
          <NavLink to="/user/login" className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle} className="icon" />
            Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Nav;
