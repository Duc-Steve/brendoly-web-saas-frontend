import React from "react";
import "./Input.css";

// Définition des props du composant Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;          // Label à afficher au-dessus de l'input
  type?: string;           // Type de l'input (text, password, email, etc.)
  value: string | number;  // Valeur de l'input (controlled component)
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Fonction de mise à jour
  placeholder?: string;    // Placeholder à afficher dans l'input
  error?: string;          // Message d'erreur à afficher
  success?: boolean;       // Indique si l'input est validé avec succès
  disabled?: boolean;      // Si l'input est désactivé
  required?: boolean;      // Si l'input est obligatoire
  helperText?: string;     // Texte d'aide en dessous de l'input
  className?: string;      // Classes CSS additionnelles pour le container
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  success,
  disabled = false,
  required = false,
  className = "",
  helperText,
  ...props
}) => {
  return (
    <div className={`input-group ${className}`}> {/* Container de l'input */}
      
      {label && ( 
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>} {/* Astérisque si obligatoire */}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        // Classes dynamiques selon l'état
        className={`input-field ${error ? "input-error" : ""} ${
          success ? "input-success" : ""
        }`}
        {...props} // Propagation des autres props HTML de input
      />

      {/* Message d'erreur */}
      {error && <span className="input-error-message">{error}</span>}

      {/* Texte d'aide si pas d'erreur */}
      {helperText && !error && <span className="input-helper">{helperText}</span>}
    </div>
  );
};

export default Input;
