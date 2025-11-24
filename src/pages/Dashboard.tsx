import { useSelector } from "react-redux";
import type { RootState } from "@/store";

/**
 * Page Dashboard principale
 */
export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Bienvenue, {user?.name} 👋</h1>
        <p>Voici votre tableau de bord GOD SUITE</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📊 Aperçu général</h3>
          <p>Consultez les statistiques de votre entreprise</p>
        </div>

        <div className="dashboard-card">
          <h3>📦 Gestion de stock</h3>
          <p>Gérez vos produits et inventaire</p>
        </div>

        <div className="dashboard-card">
          <h3>🧩 Modules</h3>
          <p>Découvrez nos fonctionnalités</p>
        </div>

        <div className="dashboard-card">
          <h3>💰 Abonnements</h3>
          <p>Gérez votre forfait et facturation</p>
        </div>
      </div>
    </div>
  );
}