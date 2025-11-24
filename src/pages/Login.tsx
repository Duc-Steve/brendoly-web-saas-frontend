import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "@/store/userSlice";
import api from "@/api/axios.config";
import { Button, Input } from "@/components/UI";

interface LoginForm {
  login: string;
  password: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginForm>({
    login: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Gestion des changements de champ
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Envoi du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation avant envoi
    if (!formData.login.trim()) {
      setError("L'email ou numéro est requis");
      return;
    }
    if (!formData.password) {
      setError("Le mot de passe est requis");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      dispatch(
        setUser({
          token: response.data.token,
          user: response.data.user,
          tenant_id: response.data.tenant_id,
        })
      );

      navigate("/");
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setError(apiErr.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Connexion</h1>
          <p>Accède à ton compte BRENDOLY SaaS</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email ou numéro"
            name="login"
            type="text"
            value={formData.login}
            onChange={(e) => handleChange("login", e.target.value)}
            placeholder="Entrez votre email ou numéro"
            required
            disabled={loading}
          />

          <Input
            label="Mot de passe"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Entrez votre mot de passe"
            required
            disabled={loading}
          />

          <Button
            type="submit"
            variant="primary"
            size="medium"
            loading={loading}
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Pas de compte ?{" "}
            <Link to="/register" className="auth-link">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
