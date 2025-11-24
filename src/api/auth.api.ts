import api from '@/api/axios.config';

// Types basés sur vos modèles Laravel
export interface LoginCredentials {
  credential: string; // Email ou numéro de téléphone
  password: string;
}

export interface RegisterData {
  // Informations personnelles
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  
  // Informations entreprise
  company_name: string;
  company_type: string;
  company_sector: string;
  company_employees_number?: string;
  company_country: string;
  company_address?: string;
  company_city?: string;
  company_zipcode?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface VerifyCodeData {
  email: string;
  code: string;
}

export interface ResetPasswordData {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  is_active: boolean;
  tenant_id: string;
}

export interface Tenant {
  id: string;
  name: string;
  type: string;
  sector: string;
  employees_number: string | null;
  address: string | null;
  city: string | null;
  country: string;
  is_active: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
  tenant: Tenant;
  expires_in: number;
}

export interface ProfileResponse {
  user: User;
  tenant: Tenant | null;
}

// === ROUTES PUBLIQUES ===

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
  const response = await api.post('/auth/login', credentials);
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
 * Rafraîchissement du token
 */
export const refreshToken = async (): Promise<{ token: string; expires_in: number }> => {
  const response = await api.post('/auth/refresh');
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
  refreshToken,
  verifyAuthCode,
  resetAuthPassword,
  changePassword,
  passwordApi,
};