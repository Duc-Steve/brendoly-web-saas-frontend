import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export const getProducts = async (tenantId: number): Promise<Product[]> => {
  const response = await api.get(`/products?tenant_id=${tenantId}`);
  return response.data;
};

export const addProduct = async (tenantId: number, product: Product) => {
  return api.post(`/products?tenant_id=${tenantId}`, product);
};
