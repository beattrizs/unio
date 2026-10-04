import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import api, { getApiErrorMessage, TOKEN_KEY } from "../services/api";

export type UserRole = "startup" | "investidor" | "admin";

export interface UserProfile {
  id?: string;
  email: string;
  role: UserRole;
  [key: string]: unknown;
}

interface AuthResponse {
  token: string;
  email: string;
  role: string;
}

interface RegisterData {
  email: string;
  password: string;
  role: "STARTUP" | "INVESTOR";
}

interface AuthContextValue {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<UserProfile>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function normalizeRole(role: string): UserRole {
  const normalized = role.toLowerCase();
  if (normalized === "investor" || normalized === "investidor") return "investidor";
  if (normalized === "admin") return "admin";
  return "startup";
}

function toProfile(data: Record<string, unknown>): UserProfile {
  return {
    ...data,
    email: String(data.email ?? ""),
    role: normalizeRole(String(data.role ?? "")),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );
  const [isLoading, setIsLoading] = useState(true);
  const skipNextValidation = useRef(false);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const fetchProfile = useCallback(async () => {
    const response = await api.get<Record<string, unknown>>("/api/profile/me");
    const profile = toProfile(response.data);
    setUser(profile);
    return profile;
  }, []);

  useEffect(() => {
    if (skipNextValidation.current) {
      skipNextValidation.current = false;
      setIsLoading(false);
      return;
    }
    if (!token) {
      setIsLoading(false);
      return;
    }
    fetchProfile()
      .catch(() => clearSession())
      .finally(() => setIsLoading(false));
  }, [clearSession, fetchProfile, token]);

  const login = useCallback(
    async (email: string, senha: string) => {
      const response = await api.post<AuthResponse>("/api/auth/login", {
        email,
        password: senha,
      });
      localStorage.setItem(TOKEN_KEY, response.data.token);
      setToken(response.data.token);
      return fetchProfile();
    },
    [fetchProfile],
  );

  const register = useCallback(async (data: RegisterData) => {
    const response = await api.post<AuthResponse>("/api/auth/register", data);
    skipNextValidation.current = true;
    localStorage.setItem(TOKEN_KEY, response.data.token);
    setToken(response.data.token);
    setUser({
      email: response.data.email,
      role: normalizeRole(response.data.role),
    });
    return response.data;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    window.location.assign("/login");
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      register,
      logout,
    }),
    [isLoading, login, logout, register, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa ser usado dentro de <AuthProvider>");
  return context;
}

export { getApiErrorMessage };
