// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Import du slice utilisateur
import { apiSlice } from "./slices/apiSlice"; // Import du slice RTK Query

const store = configureStore({
  reducer: {
    // configureStore a besoin d'un objet de reducers (fonctions pures)
    //, pas des slices complets
    auth: authReducer, // 🔹 authSlice stocké sous la clé "auth"

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
