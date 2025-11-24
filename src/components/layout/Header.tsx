import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { logout } from "@/store/userSlice";

/**
 * Header de l'application avec informations utilisateur et navigation
 */
export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Section titre/ recherche */}
        <div className="header-left">
          <h1 className="header-title">Tableau de bord</h1>
        </div>
        
        {/* Section utilisateur */}
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">Bonjour, {user?.name || 'Utilisateur'}</span>
            <span className="user-email">{user?.email}</span>
          </div>
          
          <div className="header-actions">
            <button 
              className="logout-button"
              onClick={handleLogout}
              title="Déconnexion"
            >
              🚪
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}