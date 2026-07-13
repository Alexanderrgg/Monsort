from ..BaseDeDatos import Base
from sqlalchemy import Column, Integer, String, Date, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship

class Facturas(Base):
    __tablename__ = "Facturas"
    id_factura = Column(Integer, primary_key=True, index=True)
    folio = Column(String, nullable=False)
    rfc = Column(String, nullable=False)
    cliente = Column(String, nullable=False)
    fecha = Column(Date, nullable=False)
    banco = Column(String, nullable=False)
    monto = Column(DECIMAL(10, 2), nullable=False)
    descripcion = Column(String, nullable=False)
    id_usuario = Column(Integer, ForeignKey("Usuarios.id_usuario") ,nullable=False)  # Foreign key a Usuarios.id_usuario
    id_estado = Column(Integer, ForeignKey("Estados.id_estado") ,nullable=False)  # Foreign key a Estados.id_estado
    usuario = relationship("Usuarios", back_populates="facturas")
    estado = relationship("Estados", back_populates="facturas")
    historial_verificacion = relationship("HistorialVerificacion", back_populates="factura")

class HistorialVerificacion(Base):
    __tablename__ = "HistorialVerificacion"
    id_historial = Column(Integer, primary_key=True, index=True)
    id_factura = Column(Integer, ForeignKey("Facturas.id_factura") ,nullable=False)  # Foreign key a Facturas.id_factura
    id_estado = Column(Integer, ForeignKey("Estados.id_estado") ,nullable=False)  # Foreign key a Estados.id_estado
    id_usuario = Column(Integer, ForeignKey("Usuarios.id_usuario") ,nullable=False)  # Foreign key a Usuarios.id_usuario
    fecha_verificacion = Column(Date, nullable=False)
    resultado_verificacion = Column(String, nullable=False)
    factura = relationship("Facturas", back_populates="historial_verificacion")
    estado = relationship("Estados", back_populates="historial_verificacion")
    usuario = relationship("Usuarios", back_populates="historial_verificacion")