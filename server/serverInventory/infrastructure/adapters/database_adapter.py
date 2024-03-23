from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from domain.entities.user import User

class DatabaseAdapter:
  DB_URI='mysql+pymysql://root:root@localhost:3306/inventario2022'   
  def __init__(self, connection_string = DB_URI):
    try:
        self.engine = create_engine(connection_string,echo=True )   
         
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
    except Exception as e:
        raise e

  def get_session(self ):
    return self.SessionLocal()
  
  def get_users(self):
   
    session = self.get_session()
    user = session.query(User).all() 
       
    session.close()
    return user

  
    

