// StockStats.tsx
import React from "react";
import type { Product } from "@/api/stock.api";

interface Props {
  products: Product[];
}

const StockStats: React.FC<Props> = ({ products }) => {
  const totalProducts = products.length;
  const totalValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  return (
    <div className="stock-stats">
      <p>Total produits : {totalProducts}</p>
      <p>Valeur totale stock : {totalValue} €</p>
    </div>
  );
};

export default StockStats;