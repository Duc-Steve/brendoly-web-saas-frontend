import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";


/**
 * Layout principal de l'application
 * Structure commune avec sidebar, header et zone de contenu principale
 */
export default function AppLayout() {
  return (
    <div className="app-container">
      {/* Sidebar de navigation */}
      <Sidebar />
      
      {/* Contenu principal */}
      <div className="app-content">
        {/* Header avec informations utilisateur */}
        <Header />
        
        {/* Zone de rendu des pages enfants */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}