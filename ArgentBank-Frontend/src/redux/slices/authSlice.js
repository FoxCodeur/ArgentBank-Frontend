// Imports

// ==============================

import { createSlice } from "@reduxjs/toolkit";

// État initial

// ==============================

const initialState = {
  user: null,

  token: null,
};

// Création du slice pour gérer les identifiants utilisateur

// Slice: authSlice

// ==============================

const authSlice = createSlice({
  name: "auth", // Nom du slice

  initialState,

  reducers: {
    // Action : Met à jour les identifiants utilisateur

    setCredentials: (state, action) => {
      state.user = action.payload.user;

      state.token = action.payload.token;
    },

    // Action : Déconnecte l'utilisateur

    logOut: (state) => {
      state.user = null;

      state.token = null;
    },
  },
});

// ==============================

// Exports des actions

// ==============================

export const { setCredentials, logOut } = authSlice.actions;

// ==============================

// Export du reducer

// ==============================

export default authSlice.reducer;

// ==============================

// Sélecteurs

// ==============================

export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;
