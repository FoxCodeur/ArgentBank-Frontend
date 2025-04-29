import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { useUpdateProfileMutation } from "../../redux/slices/apiSlice";
import "./EditUserForm.scss";

const EditUserForm = ({ setIsEditing }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [localUserName, setLocalUserName] = useState(user?.userName || "");
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // On vérifit que le champ localUserName est vide
    // ou qu'il correspond au userName de l'utilisateur actuel.
    //  c’est-à-dire qu'il est identique à celui qu'il avait avant
    // (celui qui est dans l’état user), pas de modification.
    // Donc, pas besoin de soumettre des données au
    // serveur.
    if (!localUserName || localUserName === user?.userName) {
      setIsEditing(false);
      return;
    }

    try {
      if (!token) {
        throw new Error("No authentication token available");
      }

      const response = await updateProfile({
        userName: localUserName,
        // Le .unwrap() permet de traiter les réponses e terreurs de
        // manière plus lisible et simplifiée lors d'un appel à une
        // mutation ou une requête.
      }).unwrap();
      console.log("Update response:", response);

      dispatch(
        setCredentials({
          user: {
            ...user,
            userName: localUserName,
          },
          token,
        })
      );

      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile. Error: " + err.message);
    }
  };

  return (
    <div className="edit-user-form">
      <h2>Edit User Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-group">
            <label>User Name:</label>
            <input
              type="text"
              value={localUserName}
              onChange={(e) => setLocalUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" value={user?.firstName || ""} readOnly />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" value={user?.lastName || ""} readOnly />
          </div>
        </div>

        <div className="form-actions">
          <button
            className="edit-button style-button"
            type="submit"
            disabled={isLoading}
          >
            Save
          </button>
          <button
            className="edit-button style-button"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          Error: {error.data?.message || "Update failed"}
        </div>
      )}
    </div>
  );
};

export default EditUserForm;
