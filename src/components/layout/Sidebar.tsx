import { Link, useLocation } from "react-router-dom";

/**
 * Sidebar de navigation principale
 * Affiche les liens vers les différentes sections de l'application
 */
export default function Sidebar() {
  const location = useLocation();
  
  // Configuration des liens de navigation
  const navItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/modules", label: "Modules", icon: "🧩" },
    { path: "/stock", label: "Stock", icon: "📦" },
    { path: "/subscriptions", label: "Abonnements", icon: "💰" },
  ];

  return (
    <aside className="sidebar">
      {/* Logo / Titre de l'application */}
      <div className="sidebar-header">
        <h3 className="sidebar-title">GOD SUITE</h3>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer de la sidebar */}
      <div className="sidebar-footer">
        <div className="user-info">
          <span>Version 1.0.0</span>
        </div>
      </div>
    </aside>
  );
}