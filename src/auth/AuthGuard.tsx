import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";


/**
 * Composant de protection des routes privées
 * Redirige vers la page de login si l'utilisateur n'est pas authentifié
 */
export default function AuthGuard({ children }: { children: JSX.Element }) {
  // Récupération du token depuis le store Redux
  const token = useSelector((state: RootState) => state.user.token);

  // Redirection si non authentifié
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Rendu des enfants si authentifié
  return children;
}