
from infrastructure.adapters.database_adapter import DatabaseAdapter
from main import app
from domain.repositories.place_repository import PlaceRepository
from domain.repositories.product_repository import ProductRepository
from domain.entities.product import Product
from domain.repositories.patrimony_repository import PatrimonyRepository
from domain.entities.patrimony import Patrimony
from domain.repositories.property_repository import PropertyRepository
from domain.entities.property import Property

def get_place_data():
    
    try:
        database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
        place_repository = PlaceRepository(database_adapter)
        place = place_repository.get_all()
        return place
    except Exception as e:
        raise e
    
def get_All_Products():
    try:
        database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
        product_repository = ProductRepository(database_adapter)
        products = product_repository.get_all()
        return products
    except Exception as e:
        raise e
def get_product_by_id(product_id):
    try:
        database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
        product_repository = ProductRepository(database_adapter)
        product = product_repository.get_by_id(product_id)
        return product
    except Exception as e:
        raise e

def get_product_by_name(product_name):
    try:
        database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
        product_repository = ProductRepository(database_adapter)
        product = product_repository.get_by_name(product_name)
        if product:
            return product
        else:
            return None
        
    except Exception as e:
        
        
        raise e
        
def insert_product(product):
    try:
        
        database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
        product_repository = ProductRepository(database_adapter)
        product = Product(**product)
        product = product_repository.insertProduct(product)
        return product
    except Exception as e:
        raise e
    
def update_product(product_id, product):
    try:
    
        database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
        product_repository = ProductRepository(database_adapter)
        product = product_repository.update(product_id, product)
        if(product):            
            return product
        else:
            return False
    
    except Exception as e:
        raise e
    
def insertPatrimony(patrimony):
    try:
        database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
        patrimony_repository = PatrimonyRepository(database_adapter)         
        products_database = get_All_Products()
        patrimony['produto_id'] = None
    
        for product in products_database:
            
            if product['name'] == patrimony['name']:                             
                patrimony['produto_id'] = product['id']                
                break
           
              
        if(patrimony['produto_id'] == None):
            
            print('Cadastro de produto não encontrado')
            product=insert_product({"name":patrimony["name"]})
            patrimony['produto_id'] = product['id']
        patrimony = Patrimony(codbar=patrimony["codbar"],
                              observacao= patrimony["observacao"],status=patrimony["status"],inventariante_id=patrimony["inventariante_id"],local_encontrado_id=patrimony["local_encontrado_id"], 
                              produto_id= patrimony["produto_id"])
        patrimony = patrimony_repository.create(patrimony)
        if(patrimony):
            return patrimony
        else:
            return False
     
    
    except Exception as e:
        raise e
def get_patrimony_by_id(patrimony_id):
    try:
        database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
        patrimony_repository = PatrimonyRepository(database_adapter)
        patrimony = patrimony_repository.get_by_id(patrimony_id)
        patrimony['product_id'] = get_product_by_id(patrimony['produto_id'])
        
        return patrimony
    except Exception as e:
        raise e
    
def update_patrimony(patrimony_id, patrimony):
    
    try:
        database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
        patrimony_repository = PatrimonyRepository(database_adapter)        
        product = update_product(patrimony['product_id']['id'], patrimony['product_id'])
        
        if product:         
            print('Produto atualizado com sucesso', product)
            patrimony['product_id'] = product
            patrimony['produto_id'] = product['id']
            patrimony = patrimony_repository.update(patrimony_id, patrimony)
            print('Patrimony atualizado com sucesso', patrimony)
         
        return patrimony
    except Exception as e:
        raise e
    
def insert_property(property):
    try:
        database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
        property_repository = PropertyRepository(database_adapter)   
        product = get_product_by_name(property['product_name']) 
        old_product = property['product_name'] 
        if product:
            property['product_id'] = product['id']
            property.pop('product_name')
           
            property = Property(**property)
            property = property_repository.insertProperty(property)
            product = get_product_by_id(property['product_id'])
            property['product'] = product
            return property
            
        else:
            product_inserted = insert_product({"name":old_product})
            property["product_id"] = product_inserted['id']
            property.pop('product_name')
            property = Property(**property)
            property = property_repository.insertProperty(property)
            product = get_product_by_id(property['product_id'])
            property['product'] = product
            return property
        
      
    except Exception as e:
        raise e

 