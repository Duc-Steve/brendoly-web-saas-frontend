import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from "@/store/userSlice";
import authApi from "@/api/auth.api";


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
        const data = await authApi.checkSession(); // <-- vérifie via API
        dispatch(setUser(
          { user: data.user, tenant: data.tenant }));
        setAuthenticated(true);
      } catch {
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

