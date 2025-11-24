import api from '@/api/axios.config';

// Types basés sur vos modèles User et Tenant
export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  is_active: boolean;
  tenant_id: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  type: string;
  sector: string;
  employees_number: string | null;
  address: string | null;
  city: string | null;
  zipcode: string | null;
  country: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
}

export interface UpdateCompanyData {
  name?: string;
  type?: string;
  sector?: string;
  employees_number?: string;
  address?: string;
  city?: string;
  zipcode?: string;
  country?: string;
}

export interface DeactivateAccountData {
  password: string;
  reason?: string;
}

// === ROUTES PROTÉGÉES ===

/**
 * Récupération du profil utilisateur complet (user + tenant)
 */
export const getProfile = async (): Promise<{
  user: UserProfile;
  tenant: CompanyProfile | null;
}> => {
  const response = await api.get('/auth/profile');
  return response.data;
};

/**
 * Mise à jour du profil utilisateur
 */
export const updateProfile = async (data: UpdateProfileData): Promise<UserProfile> => {
  const response = await api.put('/auth/profile/update', data);
  return response.data;
};

/**
 * Récupération des informations de l'entreprise
 */
export const getCompany = async (): Promise<CompanyProfile> => {
  const response = await api.get('/auth/profile/company');
  return response.data;
};

/**
 * Mise à jour des informations de l'entreprise
 */
export const updateCompany = async (data: UpdateCompanyData): Promise<CompanyProfile> => {
  const response = await api.put('/auth/profile/company', data);
  return response.data;
};

/**
 * Désactivation du compte utilisateur
 */
export const deactivateAccount = async (data: DeactivateAccountData): Promise<{ message: string }> => {
  const response = await api.post('/auth/profile/deactivate', data);
  return response.data;
};

/**
 * Vérification de l'email
 */
export const verifyEmail = async (data: { code: string }): Promise<{ message: string }> => {
  const response = await api.post('/auth/verify-email', data);
  return response.data;
};

/**
 * Vérification du téléphone
 */
export const verifyPhone = async (data: { code: string }): Promise<{ message: string }> => {
  const response = await api.post('/auth/verify-phone', data);
  return response.data;
};

/**
 * Renvoi du code de vérification email
 */
export const resendEmailVerification = async (): Promise<{ message: string }> => {
  const response = await api.post('/auth/resend-email-verification');
  return response.data;
};

/**
 * Renvoi du code de vérification téléphone
 */
export const resendPhoneVerification = async (): Promise<{ message: string }> => {
  const response = await api.post('/auth/resend-phone-verification');
  return response.data;
};

// Export groupé pour une utilisation facile
export const userApi = {
  getProfile,
  updateProfile,
  getCompany,
  updateCompany,
  deactivateAccount,
  verifyEmail,
  verifyPhone,
  resendEmailVerification,
  resendPhoneVerification,
};

export default userApi;