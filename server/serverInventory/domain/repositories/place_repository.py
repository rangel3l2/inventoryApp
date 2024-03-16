from domain.entities.place import Place
from sqlalchemy import  text

class PlaceRepository:
    def __init__(self, database_adapter):
        self.database_adapter = database_adapter

    def get_all(self):
        # Retrieve the session
        session = self.database_adapter.get_session()
        places = []
        # Query for all Place instances, retrieving all columns
        results = session.execute(text('select * from local')).fetchall()
        # Close the session
        
        session.close()
        for row in results:
            place = {
            "id": row[0],
            "nome": row[1],
        }
            places.append(place)
        print(places)
        return places  # Return the list of results
