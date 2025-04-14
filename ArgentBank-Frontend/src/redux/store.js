// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Import du slice utilisateur
import { apiSlice } from "./slices/apiSlice"; // Import du slice RTK Query

const store = configureStore({
  // On importe la partie du store Redux Toolkit pour la gestion des slices
  reducer: {
    // configureStore a besoin d'un objet de reducers (fonctions pures)
    //, pas des slices complets
    auth: authReducer, // 🔹 authSlice stocké sous la clé "auth"
    // slice spécial pour gérer les appels API.
    [apiSlice.reducerPath]: apiSlice.reducer, // 🔹 apiSlice stocké
    // sous sa clé "api"
  },

  // Configuration des middlewares pour RTK Query

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

// src/redux/store.js

//import { configureStore } from "@reduxjs/toolkit";

//const store = configureStore({

// reducer: {

// Ajoutez vos slices ici

// },

//});

// export default store;
