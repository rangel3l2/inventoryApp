from dotenv import load_dotenv, get_key


load_dotenv(".env")


db_host = get_key('.env', 'DB_HOST')
db_port = get_key('.env', 'DB_PORT')
db_user = get_key('.env', 'DB_USER')
db_password = get_key('.env', 'DB_PASSWORD')
db_name = get_key('.env', 'DB_NAME')
db_secret_key_jwt = get_key('.env','SECRET_KEY_JWT')

def get_db_host():
    return db_host

def get_db_port():
    return db_port

def get_db_user():
    return db_user

def get_db_password():
    return db_password

def get_db_name():
    return db_name

def get_db_secret_key_jwt():
    return db_secret_key_jwt