import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
  // Pra onde o logo "UNIO" leva — cada página passa a sua própria home
  // (startup ou investidor), já que não existe mais um dashboard único.
  homeTo: string;
}

export default function Header({ homeTo }: HeaderProps) {
  const { logout } = useAuth();
  return (
    <header className="bg-deepgreen px-4 py-4 text-white sm:px-8">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <Link to={homeTo} className="text-lg font-bold tracking-wide">
          UNIO
        </Link>
        <button
          type="button"
          onClick={logout}
          className="text-sm text-white/80 hover:text-white"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
