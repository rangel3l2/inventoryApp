from flask import Flask
from flask_jwt_extended import JWTManager
from presentation import routes
from flask_cors import CORS
app = Flask(__name__)

# Configurar banco de dados e SQLAlchemy (substitua credenciais)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost:3306/inventario2022'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configurar JWT
app.config['JWT_SECRET_KEY'] = 'chave-secreta-para-jwt'  
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  
jwt = JWTManager(app)

# Registrar rotas da API e autenticação


if __name__ == "__main__":
  CORS(app)
  app.register_blueprint(routes.api_blueprint)
  app.run(debug=True, host='0.0.0.0')
