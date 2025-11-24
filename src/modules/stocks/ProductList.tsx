// ProductList.tsx
import React from "react";
import type { Product } from "@/api/stock.api";

interface Props {
  products: Product[];
  status: string;
}

const ProductList: React.FC<Props> = ({ products, status }) => {
  if (status === "loading") return <div>Chargement...</div>;
  return (
    <table>
      <thead>
        <tr>
          <th>Produit</th>
          <th>Quantité</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.quantity}</td>
            <td>{p.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;