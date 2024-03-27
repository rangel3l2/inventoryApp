from infrastructure.database.models import Status as StatusModel

class Status(StatusModel):
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return f"<Status {self.id} {self.name}>"
    
    def to_dict(self):
        return {'id': self.id, 'name': self.name}