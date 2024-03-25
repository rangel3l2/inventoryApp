from dotenv import load_dotenv
import os

load_dotenv()

db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DB_NAME')
db_secret_key_jwt = os.getenv('DB_SECRET_KEY_JWT')

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