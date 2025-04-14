import React, { useState } from "react"; // Import de useState pour
// gérer l'état local (mode édition)
import { useSelector } from "react-redux"; // Hook Redux pour accéder
// à l'état global
import "./ProfilePage.scss";
import EditUserForm from "../../components/EdithUserForm/EditUserForm"; // ✅ Assure-toi que le nom du dossier/fichier est correct

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user); // Récupère
  // les infos de l'utilisateur depuis le store Redux

  const [isEditing, setIsEditing] = useState(false); // État local :
  // true si on est en train de modifier le nom.

  return (
    <main className="bg-dark">
      <div className="header">
        {/* Si on N'EST PAS en train de modifier le nom */}
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {/* On affiche le prénom et le nom si disponibles,
               sinon "User" */}
              {user?.firstName || "User"} {user?.lastName || "User"}
            </h1>

            {/* Le bouton déclenche le passage en mode édition */}
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        ) : (
          // Si on est en train d'éditer : affichage du formulaire
          <EditUserForm setIsEditing={setIsEditing} />
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>{" "}
      {/* Accessibilité (lecture pour les lecteurs d'écran) */}
      {/* 🔽 3 sections de comptes en banque : elles ne changent pas selon le mode d’édition */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
