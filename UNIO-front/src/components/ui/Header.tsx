import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../brand/Logo";

interface HeaderProps {
  // Pra onde a logo leva — cada página passa a sua própria home
  // (startup ou investidor), já que não existe mais um dashboard único.
  homeTo: string;
}

export default function Header({ homeTo }: HeaderProps) {
  const { logout } = useAuth();
  return (
    <header className="bg-deepgreen px-4 py-4 text-white sm:px-8">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <Link to={homeTo} className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-deepgreen">
          <Logo variant="branca" />
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
