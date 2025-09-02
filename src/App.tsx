import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";

// Importações de configuração e tipos
import { theme } from "./lib/theme";
import GlobalStyles from "./lib/globalStyles";
import { User, authService } from "./services/authService";

// --- Importação das Páginas ---

// 1. A HomePage original (seu dashboard), que fica em 'pages/home'
import DashboardPage from "./pages/home";
// 2. A página de autenticação, que fica em 'pages/auth'
import AuthPage from "./pages/auth";
// 3. A nova Landing Page, que fica em 'pages/HomePage'
import LandingPage from "./pages/HomePage/HomePage";
// 4. As páginas de conteúdo estático
import TermsOfUsePage from "./pages/TermsOfUse/TermsOfUsePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicy/PrivacyPolicyPage";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import { PlanningFormPage } from "./pages/PlanningFormPage/PlanningFormPage";
import { BagPage } from "./pages/BagPage/BagPageRedux";
import { FlyaLoading, MainLayout, SuccessModal } from "./components";
// 5. Página de perfil
import { ProfilePage } from "./pages";
import MyTripsPage from "./pages/MyTripsPage";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Para o check inicial do token

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("authToken");
      console.log("Checking token:", token ? "Token exists" : "No token");

      if (token) {
        try {
          const response = await authService.validateToken(token);
          console.log("Validation response:", response);

          if (response.success && response.data) {
            setCurrentUser(response.data.user);
            console.log("User set:", response.data.user);
          } else {
            console.log("Token validation failed:", response.message);
            localStorage.removeItem("authToken"); // Token inválido
            setCurrentUser(null);
          }
        } catch (error) {
          console.error("Error validating token:", error);
          localStorage.removeItem("authToken");
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const handleLoginSuccess = (user: User, token: string) => {
    console.log("Login success:", user);
    setCurrentUser(user);
    localStorage.setItem("authToken", token);
    setShowSuccessModal(true);
  };

  const handleModalConfirm = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleLogout = () => {
    console.log("Logging out");
    setCurrentUser(null);
    localStorage.removeItem("authToken");
    navigate("/auth");
  };

  if (isLoading) {
    return <FlyaLoading text="Carregando suas viagens..." size="medium" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {showSuccessModal && (
        <SuccessModal
          title="Obrigado por se juntar a nós!"
          onConfirm={handleModalConfirm}
        />
      )}
      {/* O BrowserRouter precisa envolver o App para o hook useNavigate funcionar */}
      <Routes>
        {/* --- TODAS AS ROTAS COM LAYOUT (Header/Footer) --- */}
        <Route element={<MainLayout user={currentUser} />}>
          {/* Rotas Públicas */}
          <Route path="/" element={<LandingPage user={currentUser} />} />
          <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
          <Route
            path="/politica-de-privacidade"
            element={<PrivacyPolicyPage />}
          />
          <Route path="/sobre-nos" element={<AboutUsPage />} />

          {/* Rotas Privadas */}
          <Route
            path="/dashboard"
            element={
              currentUser ? (
                <DashboardPage user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
          <Route
            path="/planejamento"
            element={
              currentUser ? (
                <PlanningFormPage />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
          <Route
            path="/minhas-viagens"
            element={
              currentUser ? <MyTripsPage /> : <Navigate to="/auth" replace />
            }
          />
          <Route
            path="/mala"
            element={
              currentUser ? <BagPage /> : <Navigate to="/auth" replace />
            }
          />
        </Route>

        {/* --- ROTAS SEM LAYOUT --- */}
        <Route
          path="/auth"
          element={<AuthPage onLoginSuccess={handleLoginSuccess} />}
        />

        <Route
          path="/perfil"
          element={
            currentUser ? (
              <ProfilePage user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        {/* Se o usuário digitar qualquer outra URL, ele é redirecionado para a home. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

// Envolver o App com BrowserRouter aqui
const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
