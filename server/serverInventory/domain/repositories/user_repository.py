class UserRepository:
    def __init__(self, database_adapter):
        self.database_adapter = database_adapter

    def get_all_users(self):
        results = self.database_adapter.get_users()
        users = []
        for row in results:
          
            user = {
            "id": row.id,
            "barcode": row.codigobarra,
            "name": row.nome,
            "role": row.cargo
            }
            users.append(user)     
     
      
       
        return users
        