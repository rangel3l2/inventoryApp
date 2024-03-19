from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "inventariante"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255))
    codigobarra = Column(Integer, unique=True)  
    cargo = Column(String(50))
    
    #patrimonios = relationship("Patrimony", back_populates="inventariante")
    #bens = relationship("Property", back_populates="inventariante")

class Place(Base):
    __tablename__ = "local"

    id = Column(Integer, primary_key=True)
    nome = Column(String(255))
    
    #patrimonios = relationship("Patrimony", back_populates="local")
    #bens = relationship("Property", back_populates="local")

class Product(Base):
    __tablename__ = "produto"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    
    #patrimonios = relationship("Patrimony", back_populates="produto")
    #bens = relationship("Property", back_populates="produto")

class Patrimony(Base):
    __tablename__ = 'patrimonio'

    codbar = Column(Integer, primary_key=True)
    dt_inventario = Column(DateTime, nullable=True)
    observacao = Column(String(255), nullable=True)
    responsavel = Column(String(255), nullable=True)
    setor_responsavel = Column(String(255), nullable=True)
    status = Column(String(2), nullable=True)

    inventariante_id = Column(Integer, ForeignKey('inventariante.id'), nullable=True)
    local_encontrado_id = Column(Integer, ForeignKey('local.id'), nullable=True)
    local_id = Column(Integer, ForeignKey('local.id'), nullable=True)
    produto_id = Column(Integer, ForeignKey('produto.id'), nullable=True)

    #inventariante = relationship("User", back_populates="patrimonios")
    #local_encontrado = relationship("Place", back_populates="patrimonios_encontrados")
    #local = relationship("Place", back_populates="patrimonios")
    #produto = relationship("Product", back_populates="patrimonios")

class Property(Base):
    __tablename__ = 'bem'

    id = Column(Integer, primary_key=True, autoincrement=True)
    dh_inventario = Column(DateTime, nullable=True)
    observacao = Column(String(255), nullable=True)

    inventariante_id = Column(Integer, ForeignKey('inventariante.id'), nullable=True)
    local_id = Column(Integer, ForeignKey('local.id'), nullable=True)
    produto_id = Column(Integer, ForeignKey('produto.id'), nullable=True)

    #inventariante = relationship("User", back_populates="bens")
    #local = relationship("Place", back_populates="bens")
    #produto = relationship("Product", back_populates="bens")

