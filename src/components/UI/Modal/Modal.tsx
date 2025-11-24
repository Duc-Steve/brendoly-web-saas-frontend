import React, { useEffect } from "react";
import "./Modal.css";

// Définition des props du Modal
interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;                        // Indique si le modal est ouvert
  onClose: () => void;                     // Fonction appelée pour fermer le modal
  title?: string;                          // Titre du modal
  children: React.ReactNode;               // Contenu du modal
  size?: "small" | "medium" | "large";    // Taille du modal
  actions?: React.ReactNode;               // Actions en bas du modal (boutons, liens)
  closeOnOverlayClick?: boolean;           // Fermeture au clic sur l'overlay
  className?: string;                      // Classes CSS supplémentaires
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  actions,
  closeOnOverlayClick = true,
  className = "",
}) => {
  // Empêche le scroll du body lorsque le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Ne rend rien si le modal est fermé
  if (!isOpen) return null;

  // Gestion du clic sur l'overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal modal-${size} ${className}`}>
        {/* Header avec titre et bouton de fermeture */}
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Contenu principal */}
        <div className="modal-content">{children}</div>

        {/* Actions du modal */}
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  );
};

export default Modal;
