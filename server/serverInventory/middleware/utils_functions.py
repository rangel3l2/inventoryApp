import bcrypt

def hash_password(password):
    # Gera um hash com salt aleatório
    hashed_bytes = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    # Codifica o hash em uma string usando codificação base64
    hashed_string = hashed_bytes.decode('utf-8')
    return hashed_string

def check_password(password, hashed_password):
    # Verifica se a senha fornecida corresponde ao hash
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))


