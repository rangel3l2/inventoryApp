from domain.entities.place import Place
from sqlalchemy import  text
from domain.entities.patrimony import Patrimony
from datetime import datetime, timezone




class PatrimonyRepository:
    def __init__(self, database_adapter):
        self.database_adapter = database_adapter

    def create(self, patrimony):
        try:
            if type(patrimony) is dict:
                patrimony['dt_inventario'] = self.get_formatted_date()
                patrimony = Patrimony(**patrimony)
                
            has_created_patrimony=self.get_by_id(patrimony.codbar)
            if has_created_patrimony:
                return None
            session = self.database_adapter.get_session()
            session.add(patrimony)
            session.commit()            
            #getLastInsertedId            
            return True
          
        except Exception as e:
                        
            raise e
    def get_all(self):
        session = self.database_adapter.get_session()
        patrimonies = []
        results = session.execute(text('select * from patrimonio')).fetchall()
        session.close()
        for row in results:
            patrimony = {
                
            "id": row[0],
            "nome": row[1],
            "descricao": row[2],
            "marca": row[3],
            "numero": row[4],
            "local_id": row[5]
        }
            patrimonies.append(patrimony)
        return patrimonies
    
    def get_by_id(self, codbar):
        try:
            session = self.database_adapter.get_session()
            patrimony : Patrimony = session.query(Patrimony).filter_by(codbar=codbar).first()
            if patrimony is None:
                return None
            patrimony_to_dict = patrimony.to_dict()
            session.close()
            return patrimony_to_dict
        except Exception as e:
            raise e
    
    def update(self,codbar, patrimony: Patrimony):      
        session = self.database_adapter.get_session()
        patrimony_to_update : Patrimony = session.query(Patrimony).filter_by(codbar=codbar).first()
        
        if(patrimony_to_update):
            
            patrimony_to_update.dt_inventario = self.get_formatted_date()
            patrimony_to_update.observacao = patrimony['observacao']
            patrimony_to_update.status = patrimony['status']
            patrimony_to_update.inventariante_id = patrimony['inventariante_id']
            patrimony_to_update.local_encontrado_id = patrimony['local_encontrado_id']  
            patrimony_to_update.produto_id = patrimony['produto_id']
            patrimony_to_update.product_id = patrimony['product_id']
            patrimony_to_update = Patrimony(dt_inventario=patrimony_to_update.dt_inventario,
                                            observacao= patrimony_to_update.observacao,status=patrimony_to_update.status,inventariante_id=patrimony_to_update.inventariante_id,local_encontrado_id=patrimony_to_update.local_encontrado_id,
                                            produto_id=patrimony_to_update.produto_id,product_id=patrimony_to_update.product_id
                                                                                       
                                            
                                            ) 
                     
            session.add(patrimony_to_update)
            session.commit()
            patrimony_updated = session.query(Patrimony).filter_by(codbar=codbar).first()
            patrimony_updated = Patrimony(codbar=patrimony_updated.codbar,dt_inventario=patrimony_updated.dt_inventario, 
                                          observacao= patrimony_updated.observacao,                                          
                                          status=patrimony_updated.status,inventariante_id=patrimony_updated.inventariante_id,local_encontrado_id=patrimony_updated.local_encontrado_id,
                                          produto_id=patrimony_updated.produto_id,product_id=patrimony_updated.product_id) 
            patrimony_updated_dict = patrimony_updated.to_dict()
            session.close()
            return patrimony_updated_dict
            
            
        else:
            # Handle case where Patrimony doesn't exist (error or create new)
            print(f"Patrimony with ID {patrimony.codbar} not found for update.")
          
            return None
                   
      
    def get_formatted_date(self):
        now = datetime.now(timezone.utc).now()  
        formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')
  
        return formatted_date
       