from domain.exceptions.router_error import AuthError
from domain.repositories.user_repository import UserRepository
from infrastructure.adapters.database_adapter import DatabaseAdapter

from middleware.utils_functions import check_password
from domain.entities.user import User

def authenticate_user(barcode):
    from main import app
    database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
      
    try: 
        from main import app
        print(app.config['SQLALCHEMY_DATABASE_URI'])
        # Crie uma instância de UserRepository
        user_repository = UserRepository(database_adapter)  # Certifique-se de passar o objeto do adaptador de banco de dados aqui

        # Chame o método get_user_by_barcode() na instância de UserRepository
        users = user_repository.get_all_users()
        for user in users:
            if check_password(barcode, user['barcode']):
                
                return user
        
       
        if not users:
            raise AuthError('Usuários não encontrados', 404)

        return users

    except Exception as e:
        raise AuthError(f'Erro na autenticação: {str(e)}', 500)
