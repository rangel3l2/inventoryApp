from domain.entities.status import Status

class StatusRepository:
    def __init__(self, database_adapter):
        self.database_adapter = database_adapter

    def get_all(self):
    
        try:
            session = self.database_adapter.get_session()
            status_list = session.query(Status).all()
            status_dicts = [obj.to_dict() for obj in status_list]
            session.close()
            return status_dicts
        except Exception as e:
            print(e)
            return None