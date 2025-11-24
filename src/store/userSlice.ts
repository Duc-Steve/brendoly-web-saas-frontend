import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types basés sur vos modèles Laravel
interface User {
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

interface Tenant {
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

/**
 * Interface pour l'état utilisateur
 */
interface UserState {
  token: string | null;
  user: User | null;
  tenant: Tenant | null;
  tenant_id: string | null;
  isAuthenticated: boolean;
}

/**
 * État initial du slice utilisateur
 */
const initialState: UserState = {
  token: null,
  user: null,
  tenant: null,
  tenant_id: null,
  isAuthenticated: false,
};

/**
 * Slice Redux pour la gestion de l'état utilisateur
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Action pour définir les informations de l'utilisateur connecté
     */
    setUser: (state, action: PayloadAction<{
      token: string;
      user: User;
      tenant: Tenant;
    }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.tenant = action.payload.tenant;
      state.tenant_id = action.payload.tenant.id;
      state.isAuthenticated = true;
    },
    
    /**
     * Action pour déconnecter l'utilisateur
     */
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.tenant = null;
      state.tenant_id = null;
      state.isAuthenticated = false;
    },
    
    /**
     * Action pour mettre à jour le token
     */
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    
    /**
     * Action pour mettre à jour le profil utilisateur
     */
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
    /**
     * Action pour mettre à jour les informations de l'entreprise
     */
    updateCompany: (state, action: PayloadAction<Partial<Tenant>>) => {
      if (state.tenant) {
        state.tenant = { ...state.tenant, ...action.payload };
        // Mettre à jour le tenant_id si l'id du tenant change
        if (action.payload.id) {
          state.tenant_id = action.payload.id;
        }
      }
    },
    
    /**
     * Action pour mettre à jour la vérification email
     */
    setEmailVerified: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.email_verified_at = action.payload;
      }
    },
    
    /**
     * Action pour mettre à jour la vérification téléphone
     */
    setPhoneVerified: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.phone_verified_at = action.payload;
      }
    },
  },
});

// Export des actions
export const { 
  setUser, 
  logout, 
  updateToken, 
  updateProfile, 
  updateCompany,
  setEmailVerified,
  setPhoneVerified
} = userSlice.actions;

// Export du reducer
export default userSlice.reducer;