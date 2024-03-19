from domain.entities.place import Place
from sqlalchemy import  text

class ProductRepository:
    def __init__(self, database_adapter):
        self.database_adapter = database_adapter

    def get_all(self):
        # Retrieve the session
        session = self.database_adapter.get_session()
        products = []
        # Query for all Place instances, retrieving all columns
        results = session.execute(text('select * from produto')).fetchall()
        # Close the session
        
        session.close()
        for row in results:
            place = {
            "id": row[0],
            "nome": row[1],
        }
            products.append(place)
        print(products)
        return products  # Return the list of results
