import axios from "axios";

// Configuration globale d'Axios pour les appels API
const api = axios.create({
  baseURL: "api", // adapte selon ton environnement
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true, // envoie automatiquement les cookies HttpOnly
});

// Intercepteur pour ajouter tenant ID aux requêtes
import { store } from "@/store";
api.interceptors.request.use((config) => {
  const tenant = store.getState().user.tenant_id;
  if (tenant) {
    config.headers["X-Tenant-ID"] = tenant;
  }
  return config;
});

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Si 401 Unauthorized, on peut déclencher une déconnexion
    if (error.response?.status === 401) {
      const { logout } = await import("@/store/userSlice");
      store.dispatch(logout());
      window.location.href = "/login";
    }

    // Gestion des erreurs de validation Laravel (422)
    if (error.response?.status === 422 && error.response.data?.errors) {
      const validationErrors = error.response.data.errors;
      const firstError = Object.values(validationErrors)[0] as string[];
      error.message = firstError?.[0] || "Erreur de validation";
    }

    return Promise.reject(error);
  }
);

export default api;
