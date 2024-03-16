class User:
    def __init__(self, id :int, barcode: int, name: str, role: str):
        self.id = id
        self.codigobarra = barcode
        self.nome = name
        self.cargo = role