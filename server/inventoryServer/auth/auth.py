from werkzeug.security import generate_password_hash, check_password_hash
import pandas as pd

class AuthError(Exception):  # Define a custom exception for authentication errors
    def __init__(self, message, status_code):
        super().__init__(message)  # Inherit message from base Exception
        self.error = message  # Add the error message as an attribute
        self.status_code = status_code

def authenticate_user(barcode):
    try:
        user = get_user_by_barcode(barcode)
        
        
    except Exception as e:  # Catch generic exceptions for user retrieval
      
        raise AuthError(f'Erro ao recuperar dados do usuário: {str(e)}', 500)
    
    if not user:
        
        raise AuthError('Usuário não encontrado', 404)

    try:
        barcodeStr = str(user['barcode'])
        barcode2 = str(barcode)
        
        if check_password_hash(barcodeStr, barcode2):
            
            raise AuthError('Código incorreto', 401)
    except KeyError as e:
        raise AuthError(f'Erro na autenticação: {str(e)}', 500)
    
    return user['name'], user['role']

def get_user_by_barcode(barcode):
    # Leia dados do CSV (maneje exceções potenciais como arquivo não encontrado, etc.)
    try:
        users_data = pd.read_csv('dataUser.csv')
    except FileNotFoundError:
        raise AuthError('Arquivo de dados do usuário não encontrado', 500)
    except Exception as e:
        raise AuthError(f'Erro ao ler dados do usuário: {str(e)}', 500)

    user = users_data[users_data['barcode'] == int(barcode)].to_dict(orient='records')
 
    if len(user) == 0:
        return None

    
    return user[0]


