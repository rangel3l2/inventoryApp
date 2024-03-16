from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Product(Base):
  __tablename__ = "produto"

  id = Column(Integer, primary_key=True)
  name = Column(String(255))

class User(Base):
  __tablename__ = "inventariante"

  id = Column(Integer, primary_key=True, autoincrement=True)
  nome = Column(String(255))
  codigobarra = Column(Integer, unique=True)  
  cargo = Column(String(50))

class Place(Base):
  __tablename__ = "local"

  id = Column(Integer, primary_key=True)
  nome = Column(String(255))

