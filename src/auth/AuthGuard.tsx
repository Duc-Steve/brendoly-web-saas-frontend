import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";
import { checkSession } from "@/api/auth.api";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();

 useEffect(() => {
    const verifySession = async () => {
      try {
        const data = await checkSession();
        setAuthenticated(data.authenticated);

        if (!data.authenticated) {
          alert("Votre session a expiré ou vous n'êtes pas connecté !");
          dispatch(logout());
        }
      } catch (error: unknown) {
        alert("Erreur lors de la vérification de la session !");
        dispatch(logout());
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [dispatch]);

  if (loading) return <div>Chargement...</div>;
  if (!authenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
}