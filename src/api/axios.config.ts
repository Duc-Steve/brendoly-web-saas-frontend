import axios from "axios";
import { store } from "@/store";

/**
 * Configuration globale d'Axios pour les appels API
 * Inclut l'intercepteur pour ajouter automatiquement les headers d'authentification
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter les tokens d'authentification aux requêtes
api.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  const tenant = store.getState().user.tenant_id;

  // Ajout du header Authorization si token présent
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Ajout du header Tenant ID pour le multi-locataire
  if (tenant) {
    config.headers["X-Tenant-ID"] = tenant;
  }

  return config;
});

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;