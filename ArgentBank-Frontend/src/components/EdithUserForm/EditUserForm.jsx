import React from "react";
import { useSelector } from "react-redux";
import "./EditUserForm.scss";

const EditUserForm = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="edit-user-form">
      <h2>Edit User Info</h2>
      <form>
        <div className="form-fields">
          <div className="form-group">
            <label>User Name</label>
            <input type="text" value={user?.userName || ""} readOnly />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" value={user?.firstName || ""} readOnly />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" value={user?.lastName || ""} readOnly />
          </div>
        </div>

        <div className="form-actions">
          <button className="edit-button style-button" type="button">
            Save
          </button>
          <button className="edit-button style-button" type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
