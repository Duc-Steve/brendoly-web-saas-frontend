import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface pour l'état utilisateur
 */
interface UserState {
  token: string | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  tenant_id: string | null;
  isAuthenticated: boolean;
}

/**
 * État initial du slice utilisateur
 */
const initialState: UserState = {
  token: null,
  user: null,
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
      user: UserState['user'];
      tenant_id: string;
    }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.tenant_id = action.payload.tenant_id;
      state.isAuthenticated = true;
    },
    
    /**
     * Action pour déconnecter l'utilisateur
     */
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.tenant_id = null;
      state.isAuthenticated = false;
    },
    
    /**
     * Action pour mettre à jour le token
     */
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Export des actions
export const { setUser, logout, updateToken } = userSlice.actions;

// Export du reducer
export default userSlice.reducer;