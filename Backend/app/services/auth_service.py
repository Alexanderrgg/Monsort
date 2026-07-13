from app.modelos.usuario import Usuarios # Importar el modelo de usuario
from app.core.seguridad import verify_password # Importar la función de verificación de contraseña
from sqlalchemy.orm import Session # Importar la clase Session de SQLAlchemy

def autenticar_usuario(correo: str, password: str, db: Session) -> Usuarios | None:
    """
    Función para autenticar un usuario.
    
    Args:
        correo (str): Correo electrónico del usuario.
        password (str): Contraseña proporcionada por el usuario.
        db (Session): Sesión de la base de datos.

    Returns:
        Usuarios | None: Retorna el objeto de usuario si la autenticación es exitosa,
    """
    # Buscar el usuario en la base de datos por correo electrónico
    usuario = db.query(Usuarios).filter(Usuarios.correo == correo).first()
    
    # Verificar si el usuario existe y si la contraseña es correcta
    if usuario and verify_password(password, usuario.password_hash):
        return usuario  # Retornar el objeto de usuario si la autenticación es exitosa
    
    return None  # Retornar None si la autenticación falla