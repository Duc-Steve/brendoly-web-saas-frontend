import api from '@/api/axios.config';
import type { RegisterData, AuthResponse, CheckSessionResponse,
  LoginCredentials, ForgotPasswordData, VerifyCodeData, ResetPasswordData, ChangePasswordData
 } from "@/types/UserTenantType";


// === ROUTES PUBLIQUES ===
export const getCsrfCookie = async () => {
  try {
    await api.get('/auth/sanctum/csrf-cookie'); // récupère le cookie laravel_session
    console.log('CSRF cookie récupéré ✅');
  } catch (err) {
    console.error('Erreur lors de la récupération du CSRF cookie', err);
    throw err;
  }
};

/**
 * Inscription d'un nouvel utilisateur avec création de tenant
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

/**
 * Connexion de l'utilisateur avec email ou téléphone
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Récupérer CSRF cookie
  await getCsrfCookie();

  const response = await api.post('/auth/login', credentials, {
    withCredentials: true, // obligatoire pour envoyer le cookie laravel_session
  });
  return response.data; // access_token est dans JSON, refresh_token dans cookie
};



// Vérifie si l'utilisateur est connecté (session valide côté serveur)
export const checkSession = async (): Promise<CheckSessionResponse> => {
  // Récupérer CSRF cookie (si pas déjà récupéré)
  await getCsrfCookie();

  // Vérifier session
  const response = await api.get('/auth/check-session', {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Mot de passe oublié - Envoi du code de réinitialisation
 */
export const forgotPassword = async (data: ForgotPasswordData): Promise<{ message: string }> => {
  const response = await api.post('/auth/forgot-password', data);
  return response.data;
};

/**
 * Vérification de code (public - pour réinitialisation)
 */
export const verifyCode = async (data: VerifyCodeData): Promise<{ valid: boolean; token?: string }> => {
  const response = await api.post('/auth/verify-code', data);
  return response.data;
};

/**
 * Réinitialisation du mot de passe (public)
 */
export const resetPassword = async (data: ResetPasswordData): Promise<{ message: string }> => {
  const response = await api.post('/auth/reset-password', data);
  return response.data;
};

// === ROUTES PROTÉGÉES ===

/**
 * Déconnexion de l'utilisateur
 */
export const logout = async (): Promise<{ message: string }> => {
  const response = await api.post('/auth/logout');
  return response.data;
};

/**
 * Récupération des informations de l'utilisateur connecté
 */
export const getCurrentUser = async (): Promise<AuthResponse['user']> => {
  const response = await api.get('/auth/me');
  return response.data;
};

/**
 * Vérification de code (protégé - pour changement de mot de passe)
 */
export const verifyAuthCode = async (data: VerifyCodeData): Promise<{ valid: boolean }> => {
  const response = await api.post('/auth/verify-auth-code', data);
  return response.data;
};

/**
 * Réinitialisation avec code (protégé)
 */
export const resetAuthPassword = async (data: ResetPasswordData): Promise<{ message: string }> => {
  const response = await api.post('/auth/reset-auth-password', data);
  return response.data;
};

/**
 * Changement de mot de passe (méthode avec ancien mot de passe)
 */
export const changePassword = async (data: ChangePasswordData): Promise<{ message: string }> => {
  const response = await api.post('/auth/change-password', data);
  return response.data;
};

// Routes de changement de mot de passe avec code
export const passwordApi = {
  /**
   * Demande de changement de mot de passe avec code
   */
  requestChange: async (): Promise<{ message: string }> => {
    const response = await api.post('/auth/password/request-change');
    return response.data;
  },

  /**
   * Vérification du code pour changement de mot de passe
   */
  verifyCode: async (data: { code: string }): Promise<{ valid: boolean; token?: string }> => {
    const response = await api.post('/auth/password/verify-code', data);
    return response.data;
  },

  /**
   * Changement de mot de passe avec code
   */
  changeWithCode: async (data: { 
    code: string; 
    password: string; 
    password_confirmation: string; 
  }): Promise<{ message: string }> => {
    const response = await api.post('/auth/password/change-with-code', data);
    return response.data;
  },
};

export default {
  register,
  login,
  logout,
  forgotPassword,
  verifyCode,
  resetPassword,
  getCurrentUser,
  verifyAuthCode,
  resetAuthPassword,
  changePassword,
  passwordApi,
  checkSession,
};