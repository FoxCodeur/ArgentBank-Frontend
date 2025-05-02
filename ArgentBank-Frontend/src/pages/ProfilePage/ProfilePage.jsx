import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // pour rediriger
import "./ProfilePage.scss";
import EditUserForm from "../../components/EdithUserForm/EditUserForm";
import Account from "../../components/Account/Account";
const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token); // Je récupère le token
  const navigate = useNavigate();
  // 🔍 Si le token n'existe pas, on redirige l'utilisateur
  useEffect(() => {
    if (!token) {
      navigate("/"); // ou "/error" si tu veux une page d'erreur
    }
  }, [token, navigate]); // on surveille token et navigate
  // État local pour gérer l'affichage du mode édition
  const [isEditing, setIsEditing] = useState(false);
  // si pas de token, on redirige l'utilisateur ver la page d'accueil (ou bien une page d'erreur)
  return (
    <main className="bg-dark">
      <div className="header">
        {/* Si on N'EST PAS en train de modifier le nom */}
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {/* Affichage du prénom et nom ou "User" si non disponible */}
              {user?.firstName || "User"} {user?.lastName || "User"}
            </h1>

            {/* Bouton pour activer le mode édition */}
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        ) : (
          // Si on est en mode édition, on affiche le formulaire d'édition
          <EditUserForm setIsEditing={setIsEditing} />
        )}
      </div>

      {/* Sections d'information de compte */}
      <h2 className="sr-only">Accounts</h2>
      {/* Utilisation du composant réutilisable */}
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
};

export default ProfilePage;
