
from infrastructure.adapters.database_adapter import DatabaseAdapter
from main import app
from domain.repositories.place_repository import PlaceRepository

def get_place_data():
    
    try:
        database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
        place_repository = PlaceRepository(database_adapter)
        place = place_repository.get_all()
        return place
    except Exception as e:
        raise e