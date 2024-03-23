from infrastructure.database.models import User
class User(User):
    def __init__(self, id :int, barcode: str, name: str, role: str):
        self.id = id
        self.codigobarra = barcode
        self.nome = name
        self.cargo = role