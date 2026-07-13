from ..BaseDeDatos import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
    
# Heredar de la clase Base para crear modelos de la base de datos
class Usuarios(Base):
    __tablename__ = "Usuarios"
    id_usuario = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    correo = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    rol = Column(String, nullable=False)
    facturas = relationship("Facturas", back_populates="usuario")
    historial_verificacion = relationship("HistorialVerificacion", back_populates="usuario") 