import React from "react";
import "./Select.css";

// Définition des options possibles du select
interface SelectOption {
  value: string | number; // Valeur de l'option
  label: string;          // Texte affiché
  disabled?: boolean;     // Si l'option est désactivée
}

// Définition des props du composant Select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;                  // Label affiché au-dessus du select
  name: string;                    // Nom de l'élément select
  value: string | number;          // Valeur actuelle
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Fonction de changement
  options?: SelectOption[];        // Liste d'options
  error?: string;                  // Message d'erreur
  success?: boolean;               // Indique si le champ est validé
  disabled?: boolean;              // Désactive le select
  required?: boolean;              // Champ obligatoire
  helperText?: string;             // Texte d'aide
  placeholder?: string;            // Placeholder affiché
  className?: string;              // Classes CSS supplémentaires
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  success,
  disabled = false,
  required = false,
  className = "",
  helperText,
  placeholder,
  ...props
}) => {
  // Gestion du changement de valeur
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
  };

  return (
    <div className={`select-group ${className}`}>
      {/* Label au-dessus du select */}
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}

      <div className="select-wrapper">
        {/* Élément select */}
        <select
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`select-field ${
            error ? "select-error" : ""
          } ${success ? "select-success" : ""} ${value ? "select-has-value" : ""}`}
          {...props}
        >
          {/* Option placeholder */}
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {/* Options dynamiques */}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Flèche personnalisée */}
        <div className="select-arrow">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Messages d'erreur ou d'aide */}
      {error && <span className="select-error-message">{error}</span>}
      {helperText && !error && <span className="select-helper">{helperText}</span>}
    </div>
  );
};

export default Select;
