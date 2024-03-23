from infrastructure.database.models import User, Product, Place
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
import csv
from middleware.utils_functions import hash_password
csv_file = './mockedData/userData.csv' 
engine = create_engine('mysql+pymysql://root:root@localhost:3306/', echo=True)

with engine.connect() as connection:
    connection.execute(text('create database if not exists inventario2022'))

engine = create_engine('mysql+pymysql://root:root@localhost:3306/inventario2022', echo=True)   
User.metadata.create_all(engine)
Product.metadata.create_all(engine)
Place.metadata.create_all(engine)
# Iniciar uma sessão
session = Session(bind=engine)

# Ler e inserir dados do arquivo CSV
with open(csv_file, 'r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader)  # Pula o cabeçalho
    for row in csv_reader:
        try:
            hashed_password = hash_password(row[1].strip())
            user = User(nome=row[0], codigobarra=hashed_password, cargo=row[2].strip())
            # Adicionar o objeto User à sessão
            session.add(user)
            # Fazer o commit da transação
            session.commit()
        except Exception as e:
            # Em caso de erro, fazer rollback
            print("Erro ao inserir usuário:", e)
            session.rollback()
        finally:
            # Fechar a sessão
            session.close()
            
# Ler e inserir dados do arquivo CSV
csv_file = './mockedData/placeData.csv' 
with open(csv_file, 'r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader)  # Pula o cabeçalho
    for row in csv_reader:
        try:
            # Criar uma instância de User
            place = Place(id= int(row[0]),nome=row[1])
            # Adicionar o objeto User à sessão
            session.add(place)
            # Fazer o commit da transação
            session.commit()
        except Exception as e:
            # Em caso de erro, fazer rollback
            print("Erro ao inserir usuário:", e)
            session.rollback()
        finally:
            # Fechar a sessão
            session.close()

csv_file = './mockedData/productData.csv' 
with open(csv_file, 'r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader)  # Pula o cabeçalho
    for row in csv_reader:
        try:
            # Criar uma instância de User
            product = Product(id= int(row[0]),name=row[1])
            print(product)
            # Adicionar o objeto User à sessão
            session.add(product)
            # Fazer o commit da transação
            session.commit()
        except Exception as e:
            # Em caso de erro, fazer rollback
            print("Erro ao inserir usuário:", e)
            session.rollback()
        finally:
            # Fechar a sessão
            session.close()
