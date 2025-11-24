import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Modèle produit
interface Product {
  id: string;          // Identifiant
  name: string;        // Nom
  quantity: number;    // Quantité en stock
  price: number;       // Prix unitaire
  category: string;    // Catégorie
}

// État global du stock
interface StockState {
  products: Product[]; // Liste des produits
  loading: boolean;    // État de chargement
  error: string | null; // Message d’erreur
}

const initialState: StockState = {
  products: [],
  loading: false,
  error: null,
};

// Slice pour gérer le stock
const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    // Remplace la liste complète des produits
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    // Ajoute un produit
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },

    // Met à jour un produit via son id
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    // Supprime un produit via son id
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },

    // Modifie l’état de chargement
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Modifie ou supprime le message d’erreur
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  setLoading, 
  setError 
} = stockSlice.actions;

export default stockSlice.reducer;
