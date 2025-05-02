import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; //slice authSlice
import { apiSlice } from "./slices/apiSlice"; // slice généré par RTK
// Query pour gérer les requêtes API
// Importez les fonctions nécessaires de redux-persist
import { persistStore, persistReducer } from "redux-persist"; // J'utilises
// redux-persist pour que le state survive à un refresh du navigateur.
import sessionStorage from "redux-persist/lib/storage/session"; //
// Et ici je  choisis sessionStorage (il disparaît quand l’onglet est
// fermé) au lieu de localStorage (qui garde tout même après redémarrage).

// Configuration de la persistance pour le slice auth
const authPersistConfig = {
  key: "auth",
  storage: sessionStorage, // Le state est sauvegardé pour la session
  // (disparaît à la fermeture).
  whitelist: ["user", "token", "isAuthenticated"], // Seuls ces
  //  champs seront persistés
};

// Appliquez persistReducer au authReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Je transforme authReducer en
    // reducer "persistant" en le combinant avec la config. Il va
    // gérer automatiquement la lecture/écriture dans le storage.
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Ajoute RTK Query
      // Les actions peuvent être serialisées (transformées en json)
      // Ici on désactive le contrôle de sérialisation pour
      // redux-persist
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
      //méthode utilisée pour ajouter un ou plusieurs éléments à un
      // tableau existant.
    }).concat(apiSlice.middleware),
});

// Créez le persistor
export const persistor = persistStore(store);

export default store;
