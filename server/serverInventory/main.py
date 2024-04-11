from flask import Flask
from flask_jwt_extended import JWTManager
from presentation import routes
from flask_cors import CORS
from configurations import db
from OpenSSL import SSL


db_host = db.get_db_host()
db_port = db.get_db_port()
db_user = db.get_db_user()
db_password = db.get_db_password()
db_name = db.get_db_name()
db_secret_key_jwt = db.get_db_secret_key_jwt()

app = Flask(__name__)
CORS(app)
cert_path = './middleware/certificates/server.crt'
key_path = './middleware/certificates/server.key'
context = (cert_path, key_path)
app.config['SSL_CONTEXT'] = context
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{db.db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_SECRET_KEY'] = db_secret_key_jwt  
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  
jwt = JWTManager(app)

app.register_blueprint(routes.api_blueprint)

if __name__ == "__main__":

  context = context
  app.run(debug=True, host='0.0.0.0', port=5000, ssl_context=context )
