import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/store/userSlice";
import subscriptionSlice from "@/store/subscriptionSlice";
import stockSlice from "@/store/stockSlice";


/**
 * Configuration du store Redux
 * Combine tous les reducers de l'application
 */
export const store = configureStore({
  reducer: {
    user: userSlice,
    subscriptions: subscriptionSlice,
    stock: stockSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Types TypeScript pour le store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;