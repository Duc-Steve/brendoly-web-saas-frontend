import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import AuthGuard from "@/auth/AuthGuard";
import AppLayout from "@/components/layout/AppLayout";

/**
 * Configuration principale des routes de l'application
 * Gère les routes publiques et privées avec protection d'authentification
 */
export default function AppRouter() {
  return (
    <Routes>
      {/* Routes publiques accessibles sans authentification */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes protégées nécessitant une authentification */}
      <Route
        path="/"
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        {/* Route par défaut - Tableau de bord */}
        <Route index element={<Dashboard />} />
        
        {/* Routes des modules */}
        <Route path="modules/*" element={<div>Modules Section</div>} />
        <Route path="stock/*" element={<div>Stock Section</div>} />
        <Route path="subscriptions/*" element={<div>Subscriptions Section</div>} />
      </Route>

      {/* Route 404 - Page introuvable */}
      <Route path="*" element={<div>Page introuvable</div>} />
    </Routes>
  );
}