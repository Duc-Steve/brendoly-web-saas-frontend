import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/state/stockSlice";
import { RootState } from "@/state/store";
import ProductList from "@/modules/stocks/ProductList";
import StockStats from "@/modules/stocks/StockStats";

const StockDashboard: React.FC = () => {
  const dispatch = useDispatch<any>();
  const tenantId = 1; // À récupérer depuis le contexte multi-tenant
  const { products, status } = useSelector((state: RootState) => state.stock);

  useEffect(() => {
    dispatch(fetchProducts(tenantId));
  }, [dispatch, tenantId]);

  return (
    <div className="stock-dashboard">
      <StockStats products={products} />
      <ProductList products={products} status={status} />
    </div>
  );
};

export default StockDashboard;