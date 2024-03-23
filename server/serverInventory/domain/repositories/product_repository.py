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
        if type(product) is dict:
            product = Product(**product)
            
        session = self.database_adapter.get_session()
        product = Product(name=product.name)
        session.add(product)
        session.commit()
        product_uploaded = session.query(Product).filter_by(name=product.name).first()
        product_uploaded = Product(id=product_uploaded.id, name=product_uploaded.name)
        product_to_dict = product_uploaded.to_dict()
        session.close()
        
        return product_to_dict
    
    def update(self,product_id, product: Product):
    
        session = self.database_adapter.get_session()
        #logic to insert the product when update is called
        #check if the product exists
        all_products = session.query(Product).all()
        
        for item in all_products:
            
            if item.name == product['name']:
                print(f"Product with name {product['name']} already exists. na posição {item.id}")
               
                product_to_update : Product = session.query(Product).filter_by(id=item.id).first()
        
                if(product_to_update):           
            
           
                    product_to_update.name = item.name
                    product_to_update.id = item.id
                    session.add(product_to_update)  
                    session.commit()
                    
                    updated_product = session.query(Product).filter_by(id=item.id).first()
                    updated_product = Product(id=updated_product.id, name=updated_product.name)   
                    updated_product = updated_product.to_dict()        
                    session.close()
                    print(f"Product with ID {product_id} updated.")
                    return updated_product
            
            
                #insert new product e return insert product
        print(f"Product with name {product['name']} not found for update.")
        
        return self.insertProduct(product)
    
    