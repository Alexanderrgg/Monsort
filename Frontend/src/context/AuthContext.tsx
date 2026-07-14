import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { login as loginRequest, type Usuario } from "../api/auth";
import { ApiError } from "../api/client";

interface Session {
  accessToken: string;
  refreshToken: string;
  usuario: Usuario;
}

interface AuthContextValue {
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signIn: (correo: string, password: string) => Promise<boolean>;
  signOut: () => void;
  clearError: () => void;
}

const STORAGE_KEY = "monsort.session";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(readStoredSession);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (correo: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginRequest(correo, password);
      const next: Session = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        usuario: data.usuario,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSession(next);
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("No se pudo conectar con el servidor. Verifica tu conexión.");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{ session, isLoading, error, signIn, signOut, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
