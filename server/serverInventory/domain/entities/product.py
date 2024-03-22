from infrastructure.database.models import Product

class Product(Product):
  def __init__(self, id = None, name: str = None):
    self.id = id
    self.name = name
    
  def to_dict(self):
    return {'id': self.id, 'name': self.name}