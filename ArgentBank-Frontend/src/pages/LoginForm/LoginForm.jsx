import React, { useState } from "react"; // state pour gérer l'état
// local du formulaire.
import { useDispatch } from "react-redux"; // Pour envoyer des actions Redux - stoker token et utilisateur.
import { useNavigate } from "react-router-dom"; // Pour la navigation
//  après une connexion succès.
import {
  useLoginMutation, // hook pour effectuer la requête de connexion.
  useLazyGetUserProfileQuery, // hook pour déclencher manuellement la
  // requête profil.
} from "../../redux/slices/apiSlice"; // API RTK Query pour se connecter et récupérer le profil.
import { setCredentials } from "../../redux/slices/authSlice"; //Action
//  pour stocker les informations d'authentification dans le store Redux.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./LoginForm.scss";

const LoginForm = () => {
  const dispatch = useDispatch(); // Pour envoyer des actions Redux.
  const navigate = useNavigate(); // Pour la navigation après une
  //  connexion réussie.
  const [formData, setFormData] = useState({ email: "", password: "" });
  // ---État local pour gérer les données du formulaire.

  // Mutation pour la connexion et récupération du profil de
  // l'utilisateur.
  const [login, { isLoading: isLoginLoading }] =
    // Un booléen qui me dit si la requête est en cours.
    useLoginMutation(); // Hook pour effectuer la requête de connexion.
  const [getUserProfile, { isLoading: isProfileLoading }] =
    useLazyGetUserProfileQuery(); // J'appelle cette fonction lorsque
  // je veux lancer une requête de récupération du profil. idéal
  // après une action utilisateur (connexion, clic de bouton)
  // je me connecte, je récupère le token et seulement après, j'appelle
  // l'api pour obtenir le profil.

  // Gérer les changements dans les champs du formulaire.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fonction de validation du formulaire avant soumission.
  const validateForm = () =>
    formData.password.length < 10
      ? "Le mot de passe et ou l'adresse mail, ne sont pas valides"
      : null;

  // Fonction de soumission du formulaire.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm(); // On vérifie déjà si le
    // formulaire est valide.
    if (validationError) return alert(validationError);

    try {
      // 1. Connexion pour obtenir le token.
      const loginResponse = await login(formData).unwrap();
      const token = loginResponse.body.token;

      // 2. Stocker temporairement le token dans Redux.
      dispatch(setCredentials({ token }));

      // 3. Récupérer le profil avec RTK Query. avec unwrap, je
      //  peux accéder directement aux données, erreurs de la réponse.
      // avant de passer à la suite.
      const profileResponse = await getUserProfile().unwrap();

      // 4. Mettre à jour le store Redux avec les données complètes.
      dispatch(setCredentials({ user: profileResponse.body, token }));

      // 5. Navigation vers la page du profil utilisateur.
      navigate("/user/profile");
    } catch (err) {
      console.error("Erreur de connexion:", err);
      alert(err?.data?.message || "Échec de la connexion");
    }
  };

  // Vérification de l'état de chargement global (connexion + récupération du profil).
  const isLoading = isLoginLoading || isProfileLoading;

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
            {isLoading ? "Connexion..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginForm;
