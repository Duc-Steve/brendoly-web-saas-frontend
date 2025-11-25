import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserType, TenantType, UserState } from "@/types/UserTenantType";

/**
 * État initial du slice utilisateur
 */
const initialState: UserState = {
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
      user: UserType;
      tenant: TenantType | null;
    }>) => {
      state.user = action.payload.user;
      state.tenant = action.payload.tenant;
      state.tenant_id = action.payload.tenant?.id ?? null;
      state.isAuthenticated = true;
    },
    
    /**
     * Action pour déconnecter l'utilisateur
     */
    logout: (state) => {
      state.user = null;
      state.tenant = null;
      state.tenant_id = null;
      state.isAuthenticated = false;
    },
    
    /**
     * Action pour mettre à jour le profil utilisateur
     */
    updateProfile: (state, action: PayloadAction<Partial<UserType>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
    /**
     * Action pour mettre à jour les informations de l'entreprise
     */
    updateCompany: (state, action: PayloadAction<Partial<TenantType>>) => {
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
  updateProfile, 
  updateCompany,
  setEmailVerified,
  setPhoneVerified
} = userSlice.actions;

// Export du reducer
export default userSlice.reducer;