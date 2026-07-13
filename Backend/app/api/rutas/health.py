from fastapi import APIRouter

router = APIRouter()
# Ruta de inicio
@router.get("/")
def VerificarEstado():
    return{"mensaje": "El servidor esta vivo y funcionando correctamente"}