from domain.exceptions.router_error import AuthError
from domain.repositories.user_repository import UserRepository
from infrastructure.adapters.database_adapter import DatabaseAdapter
from main import app
def authenticate_user(barcode):
    database_adapter = DatabaseAdapter(app.config['SQLALCHEMY_DATABASE_URI'])
      
    try: 
        print(app.config['SQLALCHEMY_DATABASE_URI'])
        # Crie uma instância de UserRepository
        user_repository = UserRepository(database_adapter)  # Certifique-se de passar o objeto do adaptador de banco de dados aqui

        # Chame o método get_user_by_barcode() na instância de UserRepository
        user = user_repository.get_user_by_barcode(barcode)
        print(user)
        
        if not user:
            raise AuthError('Usuário não encontrado', 404)

        return user

    except Exception as e:
        raise AuthError(f'Erro na autenticação: {str(e)}', 500)
