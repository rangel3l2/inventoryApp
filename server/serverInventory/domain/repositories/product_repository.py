from domain.entities.place import Place
from sqlalchemy import  text
from domain.entities.product import Product
class ProductRepository:
    def __init__(self, database_adapter):
        self.database_adapter = database_adapter

    def get_all(self):
        # Retrieve the session
        session = self.database_adapter.get_session()
        products = []
        # Query for all Place instances, retrieving all columns
        results = session.execute(text('select * from produto')).fetchall()
        # Close the session
        
        session.close()
        for row in results:
            product = {
            "id": row[0],
            "name": row[1]
        }
            products.append(product)        
        return products  # Return the list of results
    
    def get_by_id(self, product_id):
        session = self.database_adapter.get_session()
        product : Product = session.query(Product).filter_by(id=product_id).first()
        product_to_dict = product.to_dict()
        session.close()
        return product_to_dict
    
    def get_by_name(self, product_name):
        session = self.database_adapter.get_session()
        product : Product = session.query(Product).filter_by(name=product_name).first()
        if product is None:
            return None
        product_to_dict = product.to_dict()
        session.close()
        return product_to_dict
    
    
    def insertProduct(self, product : Product):
        
        session = self.database_adapter.get_session()
        session.add(product)
        session.commit()
        product_to_dict = product.to_dict()
        session.close()
        
        return product_to_dict
    
    def update(self,product_id, product: Product):
    
        session = self.database_adapter.get_session()
        product_to_update : Product = session.query(Product).filter_by(id=product_id).first()
        
        if(product_to_update):           
            
           
            product_to_update.name = product['name']
            session.add(product_to_update)  
            session.commit()
            
            updated_product = session.query(Product).filter_by(id=product_id).first()
            updated_product = Product(id=updated_product.id, name=updated_product.name)   
            updated_product = updated_product.to_dict()        
            session.close()
            print(f"Product with ID {product_id} updated.")
            return updated_product
            
        else:
            
            print(f"Product with ID {product_id} not found for update.")
            return None
    
    