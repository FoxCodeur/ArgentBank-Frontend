import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import EditUserForm from "../../components/EdithUserForm/EditUserForm";
import Account from "../../components/Account/Account";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const [isEditing, setIsEditing] = useState(false);

  // Tableau contenant les informations de comptes
  const accountsData = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];

  return (
    <main className="bg-dark">
      <div className="header">
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {user?.firstName || "User"} {user?.lastName || "User"}
            </h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        ) : (
          <EditUserForm setIsEditing={setIsEditing} />
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {/* Boucle sur les comptes pour générer les composants */}
      {accountsData.map((account, index) => (
        <Account
          key={index}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  );
};

export default ProfilePage;
