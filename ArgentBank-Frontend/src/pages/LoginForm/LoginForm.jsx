import React, { useState } from "react";

import { useDispatch } from "react-redux";

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
    email: "", // clé renommée ici

    password: "",
  });

  const [login, { isLoading, error }] = useLoginMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,

      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email.trim()) {
      alert("Veuillez entrer votre adresse e-mail.");

      return false;
    }

    if (!password) {
      alert("Le mot de passe est requis.");

      return false;
    }

    if (password.length < 11) {
      alert("Le mot de passe doit contenir au moins 11 caractères.");

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Log des données envoyées
      console.log("Form data before sending:", formData);

      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // Log de la réponse du backend
      console.log("Backend response:", response);

      // Log du token correctement récupéré dans response.body.token
      console.log("Token received:", response.body.token);

      // Dispatch avec les informations utilisateur et token
      dispatch(
        setCredentials({ user: response.body.user, token: response.body.token })
      );

      // Log après dispatch
      console.log("Token après dispatch:", response.body.token);

      // Redirection vers le profil de l'utilisateur
      navigate("/user/profile");
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      alert("Erreur de connexion : vérifiez vos identifiants.");
    }
  };

  return (
    <main className="bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />

        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email" // clé renommée ici aussi
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
