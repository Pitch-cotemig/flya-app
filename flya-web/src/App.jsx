import React, { useState } from "react";
import { AuthCard } from "./components";
import { authService } from "./services/authService";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      const result = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        setUser(result.data.user);
        alert(`Bem-vindo, ${result.data.user.name}!`);
        // Here you could store the token in localStorage
        // localStorage.setItem('token', result.data.token);
      } else {
        alert(`Erro no login: ${result.message}`);
      }
    } catch (error) {
      alert("Erro interno do servidor");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    try {
      const result = await authService.register({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        setUser(result.data.user);
        alert(`Conta criada com sucesso! Bem-vindo, ${result.data.user.name}!`);
        // Here you could store the token in localStorage
        // localStorage.setItem('token', result.data.token);
      } else {
        alert(`Erro no cadastro: ${result.message}`);
      }
    } catch (error) {
      alert("Erro interno do servidor");
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    // localStorage.removeItem('token');
    alert("Logout realizado com sucesso!");
  };

  // If user is logged in, show a simple dashboard
  if (user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <div>
          <h1>Bem-vindo ao Flya!</h1>
          <p>Olá, {user.name}</p>
          <p>E-mail: {user.email}</p>
          <button
            onClick={handleLogout}
            style={{
              padding: "12px 24px",
              background: "#00bcd4",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "20px",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "white",
          fontSize: "18px",
        }}
      >
        Carregando...
      </div>
    );
  }

  // Show AuthCard with login/register forms
  return <AuthCard onLogin={handleLogin} onRegister={handleRegister} />;
}

export default App;
