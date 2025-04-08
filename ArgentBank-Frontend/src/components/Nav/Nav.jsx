import React from "react";

import { NavLink, useNavigate } from "react-router-dom"; // Importation de useNavigate pour redirection

import { useDispatch, useSelector } from "react-redux"; // Importation de dispatch et selector

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { logOut } from "../../redux/slices/authSlice"; // Action pour déconnexion

import logo from "../../assets/img/argentBankLogo.png";

import "./Nav.scss";

const Nav = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate(); // Hook pour redirection

  const user = useSelector((state) => state.auth.user); // Sélection de l'utilisateur dans le store

  // 🔹 Vérifier si l'utilisateur est connecté

  const isLoggedIn = user !== null;

  // 🔹 Fonction pour déconnexion

  const handleLogout = () => {
    dispatch(logOut()); // Déconnexion via Redux

    navigate("/"); // Redirection après déconnexion
  };

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
              {user?.firstName || "User"} {/* Affiche le prénom ou 'User' */}
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
