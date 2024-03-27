from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from domain.entities.user import User
from configurations import db
from typing import Generator

db_host = db.get_db_host()
db_port = db.get_db_port()
db_user = db.get_db_user()
db_password = db.get_db_password()
db_name = db.get_db_name()
db_secret_key_jwt = db.get_db_secret_key_jwt()

class DatabaseAdapter:
  
  DB_URI=f'mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}' 
  print(DB_URI)
  def __init__(self, connection_string = DB_URI):
    try:
        self.engine = create_engine(connection_string,echo=True, pool_pre_ping=True )   
         
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
    except Exception as e:
        raise e

  def get_session(self ) -> Generator[sessionmaker, None, None]:
    return self.SessionLocal()
  
  def get_users(self):
   
    session = self.get_session()
    user = session.query(User).all() 
       
    session.close()
    return user

  
    

