from fastapi import FastAPI
from app.api.rutas.health import router as EstadoRouter
from app.api.rutas.auth import router as AuthRouter
from app.modelos import usuario, factura, estados

aplicacion = FastAPI()
aplicacion.include_router(EstadoRouter, prefix="/health", tags=["Health"])
aplicacion.include_router(AuthRouter, prefix="/auth", tags=["Autenticación"])