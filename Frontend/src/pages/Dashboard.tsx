import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

export function Dashboard() {
  const { session, signOut } = useAuth();

  return (
    <div className="dashboard-screen">
      <header className="dashboard-header">
        <p className="dashboard-eyebrow">MONSORT</p>
        <button className="dashboard-signout" onClick={signOut}>
          Cerrar sesión
        </button>
      </header>
      <main className="dashboard-body">
        <h1>Bienvenido, {session?.usuario.nombre}</h1>
        <p>
          Sesión iniciada como <strong>{session?.usuario.correo}</strong>{" "}
          ({session?.usuario.rol}).
        </p>
        <p className="dashboard-note">
          Aquí vivirá el resto de la interfaz — facturas, verificación e
          historial.
        </p>
      </main>
    </div>
  );
}
