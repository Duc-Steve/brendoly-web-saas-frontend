import React from "react";
import "./Button.css";

// Définition des props du bouton, en héritant de toutes les props HTML d'un <button>
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger"; // Style du bouton
  size?: "small" | "medium" | "large";          // Taille du bouton
  disabled?: boolean;                           // Si le bouton est désactivé
  loading?: boolean;                            // Affiche un spinner si vrai
  className?: string;                           // Classes CSS additionnelles
}

const Button: React.FC<ButtonProps> = ({
  children,               // Contenu à afficher dans le bouton
  variant = "primary",    // Valeur par défaut pour le style
  size = "medium",        // Valeur par défaut pour la taille
  disabled = false,       // Valeur par défaut pour désactivé
  loading = false,        // Valeur par défaut pour le spinner
  onClick,                // Fonction à appeler au clic
  type = "button",        // Type du bouton (button, submit, reset)
  className = "",         // Classes CSS additionnelles
  ...props                // Toutes les autres props HTML passées
}) => {
  return (
    <button
      type={type}
      // Construction dynamique des classes CSS
      className={`btn btn-${variant} btn-${size} ${
        loading ? "btn-loading" : ""
      } ${className}`}
      disabled={disabled || loading} // Désactive le bouton si désactivé ou en chargement
      onClick={onClick}             // Gestionnaire de clic
      {...props}                    // Propagation des autres props
    >
      {loading && <span className="btn-spinner"></span>} 
      {children}                                        
    </button>
  );
};

export default Button;
