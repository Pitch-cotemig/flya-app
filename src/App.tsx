import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";

// Importações de configuração e tipos
import { theme } from "./lib/theme";
import GlobalStyles from "./lib/globalStyles";
import { User } from "./services/authService";

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
import { PlanningFormPage } from "./pages/PlanningFormPage/PlanningFormPage";
import { BagPage } from "./pages/BagPage/BagPageRedux";
import { MainLayout, SuccessModal } from "./components";
// 5. Página de edição de perfil
import { ProfileEditPage, ProfilePage } from "./pages";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate(); // Hook para navegação

  const handleLoginSuccess = (user: User, token: string) => {
    setCurrentUser(user);
    // TODO: Salvar o token no localStorage para persistir o login
    console.log('Login token:', token);
    setShowSuccessModal(true);
  };

  const handleModalConfirm = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    // TODO: Limpar o token do localStorage
    navigate('/auth');
  };

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
          {/* --- ROTAS PÚBLICAS COM LAYOUT (Header/Footer) --- */}
          <Route element={<MainLayout user={currentUser} />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
            <Route
              path="/politica-de-privacidade"
              element={<PrivacyPolicyPage />}
            />
            <Route path="/planejamento" element={<PlanningFormPage />} />
            <Route path="/mala" element={<BagPage />} />
          </Route>

          {/* --- ROTAS SEM LAYOUT --- */}
          <Route
            path="/auth"
            element={<AuthPage onLoginSuccess={handleLoginSuccess} />}
          />

          {/* --- ROTA PRIVADA (só para usuários logados) --- */}

          <Route
            path="/dashboard"
            element={
              // A condição é: currentUser existe?
              currentUser ? (
                // Se SIM, renderiza o Dashboard, passando os dados do usuário
                // e a função de logout que ele precisa.
                <DashboardPage user={currentUser} onLogout={handleLogout} />
              ) : (
                // Se NÃO, redireciona o usuário para a tela de login.
                <Navigate to="/auth" replace />
              )
            }
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

          <Route
            path="/editar-perfil"
            element={
              currentUser ? (
                <ProfileEditPage user={currentUser} onLogout={handleLogout} />
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
