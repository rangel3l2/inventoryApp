
from sqlalchemy import  text
from domain.entities.property import Property

class PropertyRepository:
    def __init__(self, database_adapter):
        self.database_adapter = database_adapter

    def get_all(self):
        session = self.database_adapter.get_session()
        properties = []
        results = session.execute(text('select * from property')).fetchall()
        session.close()
        for row in results:
            property = {
            "id": row[0],
            "dh_inventory": row[1],
            "observation": row[2],
            "inventariante_id": row[3],
            "place_id": row[4],
            "product_id": row[5]
        }
            properties.append(property)        
        return properties

    def get_by_id(self, property_id):
        session = self.database_adapter.get_session()
        property : Property = session.query(Property).filter_by(id=property_id).first()
        property_to_dict = property.to_dict()
        session.close()
        return property_to_dict

    def insertProperty(self, property : Property):
        session = self.database_adapter.get_session()
        session.add(property)
        session.commit()
        property_to_dict = property.to_dict()
        session.close()
        return property_to_dict

    def update(self,property_id, property: Property):
        session = self.database_adapter.get_session()
        property_to_update : Property = session.query(Property).filter_by(id=property_id).first()
        if(property_to_update):
            property_to_update.dh_inventory = property['dh_inventory']
            property_to_update.observation = property['observation']
            property_to_update.inventariante_id = property['inventariante_id']
            property_to_update.place_id = property['place_id']
            property_to_update.product_id = property['product_id']
            property_updated =  session.merge(property_to_update)
            session.close()
            return property_updated.to_dict()
        else:
            print(f"Property with ID {property.id} not found for update.")
            session.commit()
            property_to_dict = property_updated.to_dict()
            return property_to_dict