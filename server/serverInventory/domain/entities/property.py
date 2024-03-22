from infrastructure.database.models import Property
class Property(Property):
    def __init__(self, id=None, dh_inventory='', observation='', inventariante_id= None, place_id=None , product_id=None):
        self.id = id
        self.dh_inventory = dh_inventory
        self.observation = observation
        self.inventariante_id = inventariante_id
        self.place_id = place_id
        self.product_id = product_id

    def to_dict(self):
        return {'id': self.id, 'dh_inventory': self.dh_inventory, 'observation': self.observation, 'inventariante_id': self.inventariante_id, 'place_id': self.place_id, 'product_id': self.product_id}