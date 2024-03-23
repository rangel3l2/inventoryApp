from infrastructure.database.models import Product
from collections import deque
class Product(Product):
  def __init__(self, id = None, name: str = None):
    self.id = id
    self.name = name
    self.my_collection = deque()
    
  def to_dict(self):
    return {'id': self.id, 'name': self.name}
  
  def to_collection(self, item):
    return self.my_collection.append(item)
    
    