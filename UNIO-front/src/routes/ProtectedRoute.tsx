import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, type UserRole } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="p-8 text-deepgreen">Carregando...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/acesso-negado" replace />;
  }
  return <Outlet />;
}
