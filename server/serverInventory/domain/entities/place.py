class Place:
    def __init__(self, id :int, name: str):
        self.id = id        
        self.nome = name
    def to_dict(self):
        return {'id': self.id, 'name': self.nome}