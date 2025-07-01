import { useState } from "react";
import { User } from "./services/authService";
import { AuthPage, HomePage } from "./pages";
import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (user: User): void => {
    setUser(user);
  };

  const handleLogout = (): void => {
    setUser(null);
  };

  // If user is logged in, show home page
  if (user) {
    return <HomePage user={user} onLogout={handleLogout} />;
  }

  // Show auth page with login/register forms
  return <AuthPage onLogin={handleLogin} />;
}

export default App;
