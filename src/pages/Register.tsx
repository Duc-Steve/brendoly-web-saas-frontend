import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/api/auth.api";
import { Button, Input, Card, Select } from '@/components/UI';
import sectorsJson from "@/data/statics/sectors.json";
import countryJson from "@/data/statics/country.json";
import FormMessage from "@/components/UI/FormMessage/FormMessage";

// Type du secteur
interface SelectOption {
  value: string;
  label: string;
}

// Type du formulaire
interface RegisterForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  company_name: string;
  company_type: string;
  company_sector: string;
  company_employees_number: string;
  company_country: string;
  company_address: string;
  company_city: string;
  company_zipcode: string;
}

// Type pour les données d'enregistrement API
interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  company_name: string;
  company_type: string;
  company_sector: string;
  company_country: string;
  company_employees_number?: string;
  company_address?: string;
  company_city?: string;
  company_zipcode?: string;
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
  const navigate = useNavigate();

  // Données du formulaire
  const [formData, setFormData] = useState<RegisterForm>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    company_name: "",
    company_type: "",
    company_sector: "",
    company_employees_number: "",
    company_country: "",
    company_address: "",
    company_city: "",
    company_zipcode: "",
  });

  // Vider les données
  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      company_name: "",
      company_type: "",
      company_sector: "",
      company_employees_number: "",
      company_country: "",
      company_address: "",
      company_city: "",
      company_zipcode: "",
    });
    setFieldErrors({});
  };


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<RegisterForm>>({});
  const sectors: SelectOption[] = sectorsJson as SelectOption[];
  const countryList: SelectOption[] = countryJson as SelectOption[];

  // Envoi du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    try {
      // Validation côté client
      const validation = validateForm(formData);
      if (!validation.isValid) {
        setFieldErrors(validation.fieldErrors);
        setError(validation.errorMessage);
        setLoading(false);
        return;
      }

      // Préparation des données pour l'API
      const registerData: RegisterData = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        company_name: formData.company_name.trim(),
        company_type: formData.company_type,
        company_sector: formData.company_sector,
        company_country: formData.company_country,
        company_employees_number: formData.company_employees_number || undefined,
        company_address: formData.company_address?.trim() || undefined,
        company_city: formData.company_city?.trim() || undefined,
        company_zipcode: formData.company_zipcode?.trim() || undefined,
      };

      // Appel API
      await register(registerData);

      // Redirection vers le dashboard
      setSuccess("Ton compte est créé. Tu peux te connecter.");
      
      // Vider les données
      resetForm();
      
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);

    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setError(apiErr.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  // Fonction de validation
  const validateForm = (data: RegisterForm): { isValid: boolean; fieldErrors: Partial<RegisterForm>; errorMessage: string } => {
    const fieldErrors: Partial<RegisterForm> = {};
    
    // Validation des champs requis
    if (!data.first_name.trim()) fieldErrors.first_name = "Le prénom est requis";
    if (!data.last_name.trim()) fieldErrors.last_name = "Le nom est requis";
    if (!data.email.trim()) fieldErrors.email = "L'email est requis";
    if (!data.phone.trim()) fieldErrors.phone = "Le téléphone est requis";
    if (!data.password) fieldErrors.password = "Le mot de passe est requis";
    if (!data.confirmPassword) fieldErrors.confirmPassword = "La confirmation du mot de passe est requise";
    if (!data.company_name.trim()) fieldErrors.company_name = "Le nom de l'entreprise est requis";
    if (!data.company_type) fieldErrors.company_type = "Le type d'entreprise est requis";
    if (!data.company_sector) fieldErrors.company_sector = "Le secteur d'activité est requis";
    if (!data.company_country) fieldErrors.company_country = "Le pays est requis";

    // Validation des mots de passe
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      fieldErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    // Validation de l'email
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
      fieldErrors.email = "L'email n'est pas valide";
    }

    // Validation de la longueur du mot de passe
    if (data.password && data.password.length < 6) {
      fieldErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    const isValid = Object.keys(fieldErrors).length === 0;
    const errorMessage = isValid ? "" : "Veuillez corriger les erreurs dans le formulaire";

    return { isValid, fieldErrors, errorMessage };
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

        {success && (
          <FormMessage type="success" message={success} />
        )}

        {error && (
          <FormMessage type="error" message={error} />
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-form">
            {/* Infos personnelles */}
            <Card 
              title="Informations personnelles" 
              variant="default"
              className="form-section-card personnelles"
            >
              <div className="form-grid">
                <Input
                  label="Prénom"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                  onFocus={() => clearFieldError("first_name")}
                  error={fieldErrors.first_name}
                  placeholder="Votre prénom"
                  required
                  disabled={loading}
                />

                <Input
                  label="Nom"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                  onFocus={() => clearFieldError("last_name")}
                  error={fieldErrors.last_name}
                  placeholder="Votre nom"
                  required
                  disabled={loading}
                />

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
                  helperText="Minimum 6 caractères"
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
              <div className="form-grid">
                <Input
                  label="Nom de l'entreprise"
                  name="company_name"
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                  onFocus={() => clearFieldError("company_name")}
                  error={fieldErrors.company_name}
                  placeholder="Nom de votre entreprise"
                  required
                  disabled={loading}
                />

                <div className="form-row">
                  <Select
                    label="Type d'entreprise"
                    name="company_type"
                    value={formData.company_type}
                    onChange={(e) => handleChange("company_type", e.target.value)}
                    onFocus={() => clearFieldError("company_type")}
                    disabled={loading}
                    placeholder="Sélectionnez le type d'entreprise"
                    required
                    error={fieldErrors.company_type}
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
                    name="company_sector"
                    value={formData.company_sector}
                    onChange={(e) => handleChange("company_sector", e.target.value)}
                    onFocus={() => clearFieldError("company_sector")}
                    disabled={loading}
                    placeholder="Sélectionnez votre secteur"
                    required
                    error={fieldErrors.company_sector}
                    options={sectors}
                  />

                </div>

                <Select
                  label="Nombre d'employés"
                  name="company_employees_number"
                  value={formData.company_employees_number}
                  onChange={(e) => handleChange("company_employees_number", e.target.value)}
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

                <Select
                  label="Pays"
                  name="company_country"
                  value={formData.company_country}
                  onChange={(e) => handleChange("company_country", e.target.value)}
                  onFocus={() => clearFieldError("company_country")}
                  disabled={loading}
                  placeholder="Sélectionnez votre pays"
                  required
                  error={fieldErrors.company_country}
                  options={countryList}
                />

                <Input
                  label="Adresse"
                  name="company_address"
                  type="text"
                  value={formData.company_address}
                  onChange={(e) => handleChange("company_address", e.target.value)}
                  placeholder="Adresse postale complète"
                  disabled={loading}
                />

                <div className="form-row">
                  <Input
                    label="Ville"
                    name="company_city"
                    type="text"
                    value={formData.company_city}
                    onChange={(e) => handleChange("company_city", e.target.value)}
                    placeholder="Ville"
                    disabled={loading}
                  />

                  <Input
                    label="Code postal"
                    name="company_zipcode"
                    type="text"
                    value={formData.company_zipcode}
                    onChange={(e) => handleChange("company_zipcode", e.target.value)}
                    placeholder="Code postal"
                    disabled={loading}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="form-submit">
            <Button
              type="submit"
              variant="primary"
              size="medium"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </div>
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