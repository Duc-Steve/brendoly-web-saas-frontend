import React from "react";
import "./Card.css";

// Définition des props du composant Card
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;                   // Titre de la carte
  subtitle?: string;                // Sous-titre de la carte
  actions?: React.ReactNode;        // Éléments d'action (boutons, icônes)
  variant?: "default" | "primary" | "secondary"; // Style de la carte
  className?: string;               // Classes CSS supplémentaires
  children: React.ReactNode;        // Contenu de la carte
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  actions,
  variant = "default",
  className = "",
  ...props
}) => {
  return (
    <div className={`card card-${variant} ${className}`} {...props}>
      {/* Header si titre, sous-titre ou actions présents */}
      {(title || subtitle || actions) && (
        <div className="card-header">
          <div className="card-header-content">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      
      {/* Contenu principal de la carte */}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
