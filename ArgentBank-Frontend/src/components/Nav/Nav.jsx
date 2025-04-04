import React, { useState } from "react"; // Importation de React et du hook useState
import { NavLink } from "react-router-dom"; // Importation de NavLink pour la navigation entre les pages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importation des icônes FontAwesome
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Importation des icônes spécifiques
import logo from "../../assets/img/argentBankLogo.png"; // Importation du logo
import "./Nav.scss"; // Importation du fichier de styles CSS

const Nav = () => {
  // 🔹 État pour savoir si l'utilisateur est connecté ou non (false = déconnecté par défaut)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 État pour stocker les informations de l'utilisateur (par défaut, un pseudo "mocké")
  const [user, setUser] = useState({ firstName: "Pseudo" });

  // 🔹 Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    setIsLoggedIn(false); // On met isLoggedIn à false → l'utilisateur est déconnecté
    setUser(null); // On enlève les infos de l'utilisateur (on met user à null)
  };

  // 🔹 Fonction pour gérer la connexion de l'utilisateur (simulée ici)
  const handleLogin = () => {
    setIsLoggedIn(true); // On met isLoggedIn à true → l'utilisateur est connecté
    setUser({ firstName: "Pseudo" }); // On simule un utilisateur connecté
  };

  return (
    <div className="main-nav">
      {/* 🔹 Logo avec lien vers la page d'accueil */}
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <div className="main-nav-items">
        {/* 🔹 Affichage conditionnel : Si l'utilisateur est connecté */}
        {isLoggedIn ? (
          <>
            {/* Lien vers le profil de l'utilisateur */}
            <NavLink to="/user/profile" className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} className="icon" />
              {user.firstName} {/* Affiche le prénom de l'utilisateur */}
            </NavLink>

            {/* Bouton de déconnexion */}
            <button onClick={handleLogout} className="main-nav-item">
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
              Sign Out
            </button>
          </>
        ) : (
          // 🔹 Si l'utilisateur n'est PAS connecté → Affichage du lien "Sign In"
          <NavLink
            to="/user/login"
            className="main-nav-item"
            onClick={handleLogin} // Simule la connexion au clic
          >
            <FontAwesomeIcon icon={faUserCircle} className="icon" />
            Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Nav;
