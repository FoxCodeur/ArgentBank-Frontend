// Imports

// ==============================

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectToken } from "../redux/slices/authSlice"; // Import du sélecteur pour obtenir le token depuis le store

// Fonction pour préparer la requête avec l'ajout du token d'authentification

// ==============================

export const baseQueryWithAuth = fetchBaseQuery({
  // URL de base pour les requêtes API

  baseUrl: "http://localhost:3001/api/v1",

  // Fonction pour préparer les en-têtes des requêtes

  prepareHeaders: (headers, { getState }) => {
    // Récupère le token dans l'état global (store) via le sélecteur selectToken

    const token = selectToken(getState());

    // Si un token existe, ajoute-le dans les en-têtes de la requête

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Retourne les en-têtes modifiés pour la requête

    return headers;
  },
});
