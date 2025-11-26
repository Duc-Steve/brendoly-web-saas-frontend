import axios from "axios";
import { store } from "@/store";

// Base URL définie dans .env
const baseURL = import.meta.env.VITE_API_URL;

// Instance Axios principale
const api = axios.create({
  baseURL,                 // URL de l’API backend
  timeout: 10000,          // Timeout des requêtes
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,   // Envoie les cookies (auth, CSRF)
});

// Intercepteur envoyé avant chaque requête
api.interceptors.request.use(async (config) => {
  // Récupère le tenant ID dans Redux et l’ajoute au header
  const tenant = store.getState().user.tenant_id;
  if (tenant) {
    config.headers["X-Tenant-ID"] = tenant;
  }

  // Vérifie si la requête modifie des données
  const needsCsrf = ["post", "put", "patch", "delete"].includes(
    config.method || ""
  );

  // Si la requête nécessite un token CSRF
  if (needsCsrf) {
    try {
      // Appelle Sanctum pour générer le cookie XSRF-TOKEN
      await axios.get(`${baseURL}/auth/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      // Récupère le cookie XSRF-TOKEN côté navigateur
      const xsrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      // Ajoute le token au header suivant le format attendu par Laravel
      if (xsrfToken) {
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
      }
    } catch (err) {
      // Affiche une erreur si le cookie CSRF n’a pas pu être récupéré
      console.error("Erreur CSRF", err);
    }
  }

  // Retourne la config finale
  return config;
});

// Intercepteur de réponse (gestion des erreurs globales)
api.interceptors.response.use(
  // Réponse OK → renvoie directement
  (response) => response,

  // Gestion des erreurs
  async (error) => {
    // Si l’API renvoie 401 → session expirée ou non authentifiée
    if (error.response?.status === 401) {
      const { logout } = await import("@/store/userSlice");
      store.dispatch(logout());        // Déconnecte l’utilisateur
      window.location.href = "/login"; // Redirige vers login
    }

    // Si erreur de validation Laravel (422)
    if (error.response?.status === 422 && error.response.data?.errors) {
      const validationErrors = error.response.data.errors;
      const firstError = Object.values(validationErrors)[0] as string[];

      // Remplace le message par la première erreur
      error.message = firstError?.[0] || "Erreur de validation";
    }

    // Renvoie l’erreur au frontend
    return Promise.reject(error);
  }
);

// Export de l’instance Axios
export default api;
