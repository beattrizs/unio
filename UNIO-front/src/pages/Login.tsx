import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";

// Depois do login, o destino depende do tipo de conta: admin cai no painel
// de administração, e startup/investidor caem na respectiva página inicial.
function rotaPosLogin(role: string) {
  if (role.toLowerCase() === "admin") return "/admin";
  if (role.toLowerCase() === "investidor" || role.toLowerCase() === "investor") return "/home-investidor";
  return "/home-startup";
}

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-deepgreen to-sage px-4 py-10">
      <AuthCard
        onLoginSuccess={(email) => navigate(rotaPosLogin(email))}
        onSignupSuccess={(role) =>
          navigate(role.toLowerCase().includes("invest") ? "/cadastro-investidor" : "/cadastro-startup")
        }
      />
    </div>
  );
}
