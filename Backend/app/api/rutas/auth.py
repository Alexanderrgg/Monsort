from fastapi import APIRouter, HTTPException, Depends
from app.esquemas.usuario import UsuarioResponse
from app.services.auth_service import autenticar_usuario
from app.esquemas.usuario import LoginRequest, LoginResponse, UsuarioResponse
from sqlalchemy.orm import Session
from app.core.seguridad import crear_token_acceso
from app.BaseDeDatos import get_db

router = APIRouter()  # Crear un enrutador para los endpoints de autenticación

@router.post("/login", response_model=LoginResponse, tags=["Autenticación"])
async def login(credenciales: LoginRequest, db: Session = Depends(get_db)) -> LoginResponse:
    """
    Endpoint para autenticar a un usuario y generar un token de acceso.

    Args:
        credenciales (LoginRequest): Objeto que contiene el correo y la contraseña del usuario.
        db (Session): Sesión de la base de datos, inyectada automáticamente por FastAPI.

    Returns:
        LoginResponse: Objeto que contiene el token de acceso y su tipo.
    """
    # Llamar a la función de autenticación del servicio
    usuario = autenticar_usuario(credenciales.correo, credenciales.password, db)
    
    # Si la autenticación falla, lanzar una excepción HTTP 401
    if not usuario:
        raise HTTPException(status_code=401, detail="Correo o contraseña incorrectos")
    
    # Generar un token de acceso para el usuario autenticado
    access_token = crear_token_acceso(data={"sub": usuario.correo, "rol": usuario.rol})
    
    # Retornar el token de acceso en la respuesta
    return LoginResponse(access_token=access_token, token_type="bearer", usuario=UsuarioResponse.model_validate(usuario))