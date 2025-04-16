import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { useUpdateProfileMutation } from "../../redux/slices/apiSlice";
import "./EditUserForm.scss";

const EditUserForm = ({ setIsEditing }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [localUserName, setLocalUserName] = useState(user?.userName || "");
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localUserName || localUserName === user?.userName) {
      setIsEditing(false);
      return;
    }

    try {
      // Envoi de la mise à jour au serveur (on ignore la réponse car nous utilisons optimistic update)
      await updateProfile({ userName: localUserName }).unwrap();

      // Mise à jour optimiste du store Redux
      dispatch(
        setCredentials({
          user: { ...user, userName: localUserName },
          token: user.token,
        })
      );

      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile");
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
            {isLoading ? "Saving..." : "Save"}
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
    </div>
  );
};

export default EditUserForm;
