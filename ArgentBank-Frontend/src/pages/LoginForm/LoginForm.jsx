import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importer useSelector ici
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/slices/apiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import "./LoginForm.scss";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading, error }] = useLoginMutation();

  // Récupérer l'utilisateur depuis Redux (ici avant la soumission)
  const currentUser = useSelector((state) => state.auth.user); // Utilisation de useSelector ici

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(`${name} modifié :`, value);
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email.trim()) {
      alert("Veuillez entrer votre adresse e-mail.");
      console.log("Validation échouée : email vide");
      return false;
    }

    if (!password) {
      alert("Le mot de passe est requis.");
      console.log("Validation échouée : mot de passe vide");
      return false;
    }

    if (password.length < 11) {
      alert("Le mot de passe doit contenir au moins 11 caractères.");
      console.log("Validation échouée : mot de passe trop court");
      return false;
    }

    console.log("Validation réussie.");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // 1. Login pour obtenir le token
      const loginResponse = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      const token = loginResponse.body.token;

      // 2. Requête GET (pas POST) pour /user/profile
      const profileResponse = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET", // ← Changé de POST à GET
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!profileResponse.ok)
        throw new Error("Échec de la récupération du profil");
      const userData = await profileResponse.json();

      // 3. Stockage des données
      dispatch(
        setCredentials({
          user: userData.body, // Contient firstName, lastName, etc.
          token,
        })
      );

      navigate("/user/profile");
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  return (
    <main className="bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
        <h1>Sign In</h1>

        {/* Afficher un message de bienvenue si un utilisateur est déjà connecté */}
        {currentUser ? (
          <div className="welcome-message">
            <p>Bienvenue, {currentUser.firstName}!</p>
            {/* Tu peux aussi afficher d'autres infos utilisateur ici */}
          </div>
        ) : (
          <p>Veuillez vous connecter pour accéder à votre compte.</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {error && (
            <p className="error-message">
              Erreur : {error.data?.message || error.error}
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default LoginForm;
