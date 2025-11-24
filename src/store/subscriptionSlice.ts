import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// État lié à l’abonnement
interface SubscriptionState {
  currentPlan: string | null; // Nom du plan actif
  modules: string[]; // Modules activés
  billingInfo: {
    nextBillingDate: string | null; // Prochaine date de facturation
    status: 'active' | 'canceled' | 'pending'; // État de facturation
  };
}

// Valeurs par défaut
const initialState: SubscriptionState = {
  currentPlan: null,
  modules: [],
  billingInfo: {
    nextBillingDate: null,
    status: 'pending',
  },
};

// Slice Redux pour gérer l’abonnement
const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    // Met à jour tout ou partie de l’état de l’abonnement
    setSubscription: (state, action: PayloadAction<Partial<SubscriptionState>>) => {
      return { ...state, ...action.payload };
    },

    // Ajoute un module
    addModule: (state, action: PayloadAction<string>) => {
      state.modules.push(action.payload);
    },

    // Supprime un module
    removeModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(module => module !== action.payload);
    },
  },
});

export const { setSubscription, addModule, removeModule } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
