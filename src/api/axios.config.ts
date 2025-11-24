import axios from "axios";
import { store } from "../store";

/**
 * Configuration globale d'Axios pour les appels API
 * Inclut l'intercepteur pour ajouter automatiquement les headers d'authentification
 */
const api = axios.create({
  baseURL: 'api',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
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

// Intercepteur pour gérer les erreurs globales et le rafraîchissement de token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si erreur 401 (Unauthorized) et pas déjà en cours de rafraîchissement
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tentative de rafraîchissement du token
        const { refreshToken } = await import('./auth.api');
        const { token } = await refreshToken();
        
        // Mise à jour du token dans le store
        store.dispatch({ type: 'user/updateToken', payload: token });
        
        // Nouvelle tentative de la requête originale
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si le rafraîchissement échoue, déconnexion
        store.dispatch({ type: 'user/logout' });
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Gestion des autres erreurs
    console.error("API Error:", error);
    
    // Gestion spécifique des erreurs de validation Laravel
    if (error.response?.status === 422 && error.response.data?.errors) {
      const validationErrors = error.response.data.errors;
      const firstError = Object.values(validationErrors)[0] as string[];
      error.message = firstError?.[0] || 'Erreur de validation';
    }
    
    return Promise.reject(error);
  }
);

export default api;