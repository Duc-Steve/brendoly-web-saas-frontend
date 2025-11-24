import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "@/store/userSlice";
import api from "@/api/axios.config";
import { Button, Input, Card, Select } from '@/components/UI';
import sectorsJson from "@/data/statics/sectors.json";
import countryJson from "@/data/statics/country.json";



// Type du secteur
interface SelectOption {
  value: string;
  label: string;
}

// Type du formulaire
interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  companyType: string;
  industry: string;
  employeesCount: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
}

// Type pour une erreur API
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

/**
 * Page d'inscription
 */
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Données du formulaire
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyType: "",
    industry: "",
    employeesCount: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<RegisterForm>>({});
  const sectors: SelectOption[] = sectorsJson as SelectOption[];
  const country: SelectOption[] = countryJson as SelectOption[];

  // Envoi du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setFieldErrors({ confirmPassword: "Les mots de passe ne correspondent pas" });
      setLoading(false);
      return;
    }

    // Validation des champs requis
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'companyName'];
    const newFieldErrors: Partial<RegisterForm> = {};
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof RegisterForm]) {
        newFieldErrors[field as keyof RegisterForm] = "Ce champ est requis";
      }
    });

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setError("Veuillez remplir tous les champs obligatoires");
      setLoading(false);
      return;
    }

    try {
      // Requête API
      const response = await api.post("/auth/register", formData);

      // Sauvegarde des données utilisateur
      dispatch(
        setUser({
          token: response.data.token,
          user: response.data.user,
          tenant_id: response.data.tenant_id,
        })
      );

      // Redirection
      navigate("/");
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setError(apiErr.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  // Mise à jour des champs
  const handleChange = (field: keyof RegisterForm, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Effacer l'erreur du champ quand l'utilisateur tape
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const clearFieldError = (field: keyof RegisterForm) => {
    setFieldErrors(prev => ({
      ...prev,
      [field]: ""
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <h1>Créer un compte</h1>
          <p>Rejoins l'espace BRENDOLY SaaS</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Infos personnelles */}
          <Card 
            title="Informations personnelles" 
            variant="default"
            className="form-section-card"
          >
            <div className="form-row">
              <Input
                label="Prénom"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                onFocus={() => clearFieldError("firstName")}
                error={fieldErrors.firstName}
                placeholder="Votre prénom"
                required
                disabled={loading}
              />

              <Input
                label="Nom"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                onFocus={() => clearFieldError("lastName")}
                error={fieldErrors.lastName}
                placeholder="Votre nom"
                required
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onFocus={() => clearFieldError("email")}
                error={fieldErrors.email}
                placeholder="votre@email.com"
                required
                disabled={loading}
              />

              <Input
                label="Téléphone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onFocus={() => clearFieldError("phone")}
                error={fieldErrors.phone}
                placeholder="+33 1 23 45 67 89"
                required
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <Input
                label="Mot de passe"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onFocus={() => clearFieldError("password")}
                error={fieldErrors.password}
                placeholder="Créez un mot de passe sécurisé"
                required
                disabled={loading}
                helperText="Minimum 8 caractères avec majuscules, minuscules et chiffres"
              />

              <Input
                label="Confirmer le mot de passe"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                onFocus={() => clearFieldError("confirmPassword")}
                error={fieldErrors.confirmPassword}
                placeholder="Confirmez votre mot de passe"
                required
                disabled={loading}
              />
            </div>
          </Card>

          {/* Infos entreprise */}
          <Card 
            title="Informations entreprise" 
            variant="default"
            className="form-section-card"
          >
            <Input
              label="Nom de l'entreprise"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              onFocus={() => clearFieldError("companyName")}
              error={fieldErrors.companyName}
              placeholder="Nom de votre entreprise"
              required
              disabled={loading}
            />

            <div className="form-row">
              <Select
                label="Type d'entreprise"
                name="companyType"
                value={formData.companyType}
                onChange={(e) => handleChange("companyType", e.target.value)}
                disabled={loading}
                placeholder="Sélectionnez le type d'entreprise"
                options={[
                  { value: "SARL", label: "SARL" },
                  { value: "SAS", label: "SAS" },
                  { value: "SA", label: "SA" },
                  { value: "ENTREPRENEUR", label: "ENTREPRENEUR" },
                  { value: "EI", label: "Entreprise Individuelle" },
                  { value: "other", label: "Autre" }
                ]}
              />

              <Select
                label="Secteur d'activité"
                name="industry"
                value={formData.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                disabled={loading}
                placeholder="Sélectionnez votre secteur"
                options={sectors}
              />
            </div>

            <Select
              label="Nombre d'employés"
              name="employeesCount"
              value={formData.employeesCount}
              onChange={(e) => handleChange("employeesCount", e.target.value)}
              disabled={loading}
              placeholder="Sélectionnez le nombre d'employés"
              options={[
                { value: "1", label: "1 (Micro)" },
                { value: "2-5", label: "2-5" },
                { value: "6-10", label: "6-10" },
                { value: "11-50", label: "11-50" },
                { value: "51-200", label: "51-200" },
                { value: "201+", label: "201+" }
              ]}
            />

            <Input
              label="Adresse"
              name="address"
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Adresse postale complète"
              disabled={loading}
            />

            <div className="form-row">
              <Input
                label="Ville"
                name="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Ville"
                disabled={loading}
              />

              <Input
                label="Code postal"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                placeholder="Code postal"
                disabled={loading}
              />
            </div>

            <Select
              label="Pays"
              name="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              disabled={loading}
              placeholder="Sélectionnez votre pays"
              options={country}
            />
          </Card>

          <Button
            type="submit"
            variant="primary"
            size="medium"
            loading={loading}
            disabled={loading}
          >
            {loading ? "Création du compte..." : "Créer mon compte"}
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Déjà un compte ?{" "}
            <Link to="/login" className="auth-link">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}