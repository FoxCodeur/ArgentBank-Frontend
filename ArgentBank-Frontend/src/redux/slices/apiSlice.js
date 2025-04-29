// apiSlice.js - fichier qui définit les endpoints de l'API

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectToken } from "../slices/authSlice"; // Sélecteur pour
//  récupérer le token du store Redux

// C'est un slice particulier pour gérer les endpoints de l'API
export const apiSlice = createApi({
  reducerPath: "api", // Nom du réducteur, utilisé automatiquement
  // dans le store

  // -------- Ce fichier détermine comment les requêtes API seront gérées
  // par RTK Query.On configure ici la base des requêtes API avec
  // injection automatique du token.
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1", // URL de base de l'API

    // -------- Préparation des headers avant chaque requête
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState()); // On récupère le token
      // depuis le state Redux
      // Ajoutez le Content-Type par défaut
      headers.set("Content-Type", "application/json");
      if (token) {
        // Si un token existe, on l'ajoute dans le header Authorization
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers; // Headers préparés avec ou sans token
    },
  }),

  // -------- tagTypes : étiquettes que l'on associe aux données récupérées
  // ou modifiées. Cela permet de gérer automatiquement le cache
  tagTypes: ["User"],

  // -------- Les endpoints de l'API sont déclarés ici.
  endpoints: (builder) => ({
    // ======================
    // Mutation pour login (POST /user/login)
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login", // C’est le endpoint côté serveur
        method: "POST", // Requête HTTP de type POST
        body: credentials, // Données envoyées au serveur : { email,
        //  password }
      }),
    }),

    // ======================
    // Query pour récupérer le profil utilisateur (GET /user/profile)
    getUserProfile: builder.query({
      query: () => "/user/profile", // Requête GET sans paramètre
      providesTags: ["User"], // Permet de taguer la réponse pour
      // mise en cache
    }),

    // ======================
    // Mutation pour modifier les données du profil (PUT /user/profile)
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/user/profile",
        method: "PUT", // Requête HTTP de type PUT
        body: userData, // Données à mettre à jour : { userName }
      }),
      invalidatesTags: ["User"], // Invalide automatiquement le cache
      // lié au tag "User"
    }),
  }),
});

// -------- Exportez TOUS les hooks générés automatiquement par RTK
// Query
export const {
  useLoginMutation, // Hook pour effectuer la requête de connexion
  useGetUserProfileQuery, // Hook auto pour récupérer le profil dès
  // le montage du composant
  useLazyGetUserProfileQuery, // Hook spécial pour déclencher
  // manuellement la requête profil
  useUpdateProfileMutation, // Hook pour envoyer la mise à jour du profil
  // modifié
} = apiSlice;
