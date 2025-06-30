import { User } from "../../services/authService";
import { homeStyles } from "./styles";

interface HomePageProps {
  user: User;
  onLogout: () => void;
}

function HomePage({ user, onLogout }: HomePageProps) {
  const handleLogout = (): void => {
    onLogout();
    // localStorage.removeItem('token');
    alert("Logout realizado com sucesso!");
  };

  return (
    <div style={homeStyles.container}>
      <div>
        <h1>Bem-vindo ao Flya!</h1>
        <p>Olá, {user.name}</p>
        <p>E-mail: {user.email}</p>
        <button onClick={handleLogout} style={homeStyles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomePage;
