import React, { useState } from "react";
import "./LoginForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  // Initialisation de l'état local 'formData' pour stocker les
  // valeurs des deux champs
  const [formData, setFormData] = useState({
    username: "", // Champ utilisateur
    password: "", // Champ mot de passe
  });

  // Fonction pour gérer le changement dans les champs de saisie
  // (username et password)
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Déstructuration de l'élément
    // modifié (son nom et sa valeur)

    // Mise à jour de l'état formData avec la nouvelle valeur pour le
    //  champ concerné. Cette syntaxe garantit que seul le champ modifié (par exemple username ou password) sera mis à jour, tandis que les autres champs de l'état seront laissés intacts.
    setFormData((prevState) => ({
      ...prevState, // Conserver les autres champs intacts
      [name]: value, // Mettre à jour le champ correspondant
      // (username ou password)
    }));
  };

  // Fonction de validation du formulaire
  const validateForm = () => {
    let isValid = true; // Variable qui détermine si le formulaire est
    // valide ou non

    // Validation du champ 'password' (ici on vérifie si le mot de
    // passe est vide et s'il a une longueur minimale)
    if (!formData.password) {
      alert("Error: Le mot de passe est requis.");
      isValid = false;
    } else if (formData.password.length < 11) {
      alert("Le mot de passe doit contenir au moins 11 caractères.");
      isValid = false;
    }

    return isValid; // Retourne true si le formulaire est valide, sinon
    //  false
  };

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du
    //  formulaire (qui serait de recharger la page)

    const isFormValid = validateForm(); // Appel à la fonction de
    //  validation du formulaire

    if (isFormValid) {
      console.log("Le formulaire est valide, soumission en cours...");
      // À ce moment, tu pourrais envoyer les données du formulaire vers
      //  un serveur (via une API, par exemple)
    }
  };

  return (
    <main className="bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />

        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username (Email)</label>
            <input
              type="email" // Type 'email' pour valider le format de l'email
              id="username"
              name="username" // Attribut 'name' utilisé pour gérer
              // l'état et l'événement
              value={formData.username} // La valeur de l'input est liée
              // à l'état 'username'
              onChange={handleInputChange} // Appelle la fonction
              // handleInputChange lorsque la valeur change
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password" // Attribut 'name' utilisé pour gérer
              // l'état et l'événement
              value={formData.password} // La valeur de l'input est liée
              // à l'état 'password'
              onChange={handleInputChange} // Appelle la fonction
              // handleInputChange lorsque la valeur change
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            {/* Case à cocher pour "se souvenir de l'utilisateur" */}
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
            {/* Bouton de soumission du formulaire */}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginForm;
