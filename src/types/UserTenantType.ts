// src/types/UserTenantType.ts

// --------------------
// Credentials & Auth
// --------------------
export interface LoginCredentials {
  credential: string; // Email ou numéro de téléphone
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;

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

// --------------------
// User & Tenant
// --------------------
export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  is_active: boolean;
  tenant_id: string | null;
};

export type TenantType = {
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
};


// --------------------
// Responses API
// --------------------
export interface AuthResponse {
  user: UserType;
  tenant: TenantType | null;
  expires_in: number;
}

export interface CheckSessionResponse {
  authenticated: boolean;
}

export interface ProfileResponse {
  user: UserType;
  tenant: TenantType | null;
}

// --------------------
// Redux State
// --------------------
export interface UserState {
  user: UserType | null;
  tenant: TenantType | null;
  tenant_id: string | null;
  isAuthenticated: boolean;
}

export const initialUserState: UserState = {
  user: null,
  tenant: null,
  tenant_id: null,
  isAuthenticated: false,
};
