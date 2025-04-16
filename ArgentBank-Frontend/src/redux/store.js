import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
// Importez les fonctions nécessaires de redux-persist
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session"; // Pour sessionStorage

// Configuration de la persistance pour le slice auth
const authPersistConfig = {
  key: "auth", // Clé sous laquelle les données seront stockées
  storage: sessionStorage, // ← Changé ici
  whitelist: ["user", "token", "isAuthenticated"], // Seuls ces champs seront persistés
};

// Appliquez persistReducer au authReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Désactivez le contrôle de sérialisation pour redux-persist
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(apiSlice.middleware),
});

// Créez le persistor
export const persistor = persistStore(store);

export default store;
