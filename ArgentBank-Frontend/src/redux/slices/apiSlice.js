// apiSlice.js - fichier qui définit les endpoints de l'API
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../services/baseQueryWithAuth";
// C'est un slice particulier pour gérer les endpoints de l'API
export const apiSlice = createApi({
  reducerPath: "api",
  // --------Ce fichier détermine comment les requêtes API seront gérées par
  // RTK Query
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],
  // Les endpoints de l'API sont déclarés ici.
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        // C'est le deuxième argument que tu passes à fetch.
        url: "/user/login",
        // le type de requete HTTP
        method: "POST",
        // les données à envoyer au serveur (généralement au format JSON)
        body: credentials,
      }),
    }),

    getUserProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/user/profile",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Exportez TOUS les hooks générés
export const {
  // Hook pour effectuer la requête de connexion (POST /user/login)
  useLoginMutation,
  // Récupère automatiquement le profil et ce, dès le montage
  // du composant. Problème : si je viens juste d'arriver sur la page
  // et que le token n'est pas encore disponible, la requête partira
  // sans le header Authorization, et donc échouera.
  useGetUserProfileQuery,
  // hook spécial "lazy", qui permet de faire une requête manuelle et
  // déclenchée à la demande.
  useLazyGetUserProfileQuery,
  useUpdateProfileMutation,
} = apiSlice;
