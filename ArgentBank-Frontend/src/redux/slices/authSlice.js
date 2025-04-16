import { createSlice } from "@reduxjs/toolkit";

// État initial
const initialState = {
  user: null, // qui comprend les informations de l'utilisateur
  // email, firstName, lastName, userName.
  token: null,
  isAuthenticated: false,
};

// Création du slice pour gérer les identifiants utilisateur
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log("Payload dans setCredentials:", action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      console.log("Utilisateur authentifié : ", state.user);
      console.log("Token d'authentification : ", state.token);
      console.log("connecté : ", state.isAuthenticated);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      console.log("Utilisateur s'est bien déconnecté.");
    },
  },
});

// Exports des actions
export const { setCredentials, logOut } = authSlice.actions;

// Export du reducer
export default authSlice.reducer;

// Sélecteurs permettent d'accéder aux données du state
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
