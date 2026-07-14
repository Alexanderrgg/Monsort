import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

interface LoginProps {
  /** True once sign-in has succeeded, so the seal can play its stamp animation. */
  stamped: boolean;
}

export function Login({ stamped }: LoginProps) {
  const { signIn, isLoading, error, clearError } = useAuth();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    clearError();
    await signIn(correo, password);
  }

  return (
    <div className="login-screen">
      <aside className="login-seal-panel" aria-hidden="true">
        <div className="ledger-lines" />
        <div className={`seal ${stamped ? "seal--stamped" : ""}`}>
          <svg viewBox="0 0 240 240" className="seal-svg">
            <circle
              className="seal-ring seal-ring--outer"
              cx="120"
              cy="120"
              r="108"
            />
            <circle
              className="seal-ring seal-ring--inner"
              cx="120"
              cy="120"
              r="86"
            />
            <path
              id="sealArcTop"
              d="M 34 120 A 86 86 0 0 1 206 120"
              fill="none"
            />
            <path
              id="sealArcBottom"
              d="M 46 150 A 86 86 0 0 0 194 150"
              fill="none"
            />
            <text className="seal-text">
              <textPath href="#sealArcTop" startOffset="50%" textAnchor="middle">
                MONSORT
              </textPath>
            </text>
            <text className="seal-text seal-text--small">
              <textPath
                href="#sealArcBottom"
                startOffset="50%"
                textAnchor="middle"
              >
                VERIFICACIÓN DE FACTURAS
              </textPath>
            </text>
            <line
              className="seal-tick"
              x1="120"
              y1="24"
              x2="120"
              y2="8"
            />
            <line className="seal-tick" x1="216" y1="120" x2="232" y2="120" />
            <line className="seal-tick" x1="120" y1="216" x2="120" y2="232" />
            <line className="seal-tick" x1="24" y1="120" x2="8" y2="120" />
          </svg>
        </div>
        <p className="seal-caption">
          Cada folio, cada monto, cada cuenta — verificado.
        </p>
      </aside>

      <main className="login-form-panel">
        <div className="login-form-wrap">
          <p className="login-eyebrow">MONSORT · Portal interno</p>
          <h1 className="login-title">Iniciar sesión</h1>
          <p className="login-subtitle">
            Accede para revisar y verificar facturas.
          </p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label className="field">
              <span className="field-label">Correo electrónico</span>
              <input
                className="field-input"
                type="email"
                autoComplete="username"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="nombre@empresa.com"
              />
            </label>

            <label className="field">
              <span className="field-label">Contraseña</span>
              <input
                className="field-input"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="login-submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Verificando…" : "Iniciar sesión →"}
            </button>
          </form>

          <p className="login-folio">
            FOLIO-ACCESO / {new Date().getFullYear()}
          </p>
        </div>
      </main>
    </div>
  );
}
