from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required
from domain.exceptions.router_error import AuthError
from application import commands, queries, use_cases
from middleware import authentication
from domain.entities.user import User
from datetime import timedelta

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/auth', methods=['POST'])
def authenticate():
    barcode = request.json.get('barcode')

    if not barcode:
        return jsonify({'success': False, 'error': 'Código de barras ausente'}), 400

    try:
        expire_date=timedelta(seconds=36500)
      
        user: User = authentication.authenticate_user(barcode)
        access_token = create_access_token(identity={'id': user.id, 'name': user.nome, 'role': user.cargo}, expires_delta=expire_date)
        
        return jsonify({'success': True,  'token': access_token})

    except AuthError as e:
        # Registrar detalhes da exceção para depuração
        print(f'Erro na autenticação: {e.message}')  # Ajuste 
        return jsonify({'success': False, 'error': e.message}), 401  # Ajuste aqui também


@api_blueprint.route('/places', methods=['GET'])
@jwt_required()
def get_all_products():
    
    places = use_cases.get_place_data()
   
    return jsonify(places)

@api_blueprint.route('/products', methods=['GET'])
@jwt_required()
def get_all_places():
    products = queries.get_all_products()
    return jsonify(products=[product.to_dict() for product in products])

@api_blueprint.route('/products/<int:product_id>', methods=['GET'])
@jwt_required()
def get_product_by_id(product_id):
    product = queries.get_product_by_id(product_id)
    return jsonify(product.to_dict())

@api_blueprint.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    name = request.json.get('name')
    # Lógica para criar um produto
