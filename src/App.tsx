import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Importações de configuração e tipos
import { theme } from './lib/theme';
import GlobalStyles from './lib/globalStyles';
import { User } from './services/authService';

// --- Importação das Páginas ---

// 1. A HomePage original (seu dashboard), que fica em 'pages/home'
import DashboardPage from './pages/home';
// 2. A página de autenticação, que fica em 'pages/auth'
import AuthPage from './pages/auth'; 
// 3. A nova Landing Page, que fica em 'pages/HomePage'
import LandingPage from './pages/HomePage/HomePage';
// 4. As páginas de conteúdo estático
import TermsOfUsePage from './pages/TermsOfUse/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicy/PrivacyPolicyPage';
import { PlanningFormPage } from './pages/PlanningFormPage/PlanningFormPage';
import { BagPage } from './pages/BagPage/BagPage';
import { MainLayout } from './components/organisms/layout';


function App() {
  // Estado para guardar os dados do usuário logado.
  // Começa como 'null' (ninguém logado).
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Esta função será chamada pela AuthPage quando o login for bem-sucedido.
  // Ela recebe os dados do usuário e os guarda no estado.
  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  // Esta função zera o usuário, efetivamente fazendo o logout.
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* --- ROTAS PÚBLICAS COM LAYOUT (Header/Footer) --- */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
            <Route path="/planejamento" element={<PlanningFormPage />} />
            <Route path="/mala" element={<BagPage />} />
          </Route>
          
          {/* --- ROTAS SEM LAYOUT --- */}
          <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />

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
          
          {/* Se o usuário digitar qualquer outra URL, ele é redirecionado para a home. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
