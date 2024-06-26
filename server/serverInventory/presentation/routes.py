from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required
from domain.exceptions.router_error import AuthError
from application import queries, use_cases
from middleware import authentication
from domain.entities.user import User
from datetime import timedelta


api_blueprint = Blueprint('api_blueprint', __name__, url_prefix='/api')
@api_blueprint.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Bem-vindo ao sistema de gerenciamento de patrimônio!'})
@api_blueprint.route('/auth', methods=['POST'])
def authenticate():
    barcode = request.json.get('barcode')
    barcode = str(barcode).strip() if barcode else None
    if not barcode:
        return jsonify({'success': False, 'error': 'Código de barras ausente'}), 400

    try:
        expire_date=timedelta(seconds=31536000, )
      
        user = authentication.authenticate_user(barcode)
        
        access_token = create_access_token(identity={'id': user['id'], 'name': user['name'], 'role': user['role']}, expires_delta=expire_date)
        
        return jsonify({'success': True,  'token': access_token})

    except AuthError as e:
        # Registrar detalhes da exceção para depuração
        print(f'Erro na autenticação: {e.message}')  # Ajuste 
        return jsonify({'success': False, 'error': e.message}), 401  # Ajuste aqui também


@api_blueprint.route('/places', methods=['GET'])
@jwt_required()
def get_all_places():
    
    places = use_cases.get_place_data()
   
    return jsonify(places)

@api_blueprint.route('/products', methods=['GET'])
@jwt_required()
def get_all_products():
    products = use_cases.get_All_Products()
    return jsonify(products)


@api_blueprint.route('/products/<int:product_id>', methods=['GET'])
@jwt_required()
def get_product_by_id(product_id):
    product = queries.get_product_by_id(product_id)
    return jsonify(product.to_dict())

@api_blueprint.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    
    data = request.json    
    product = use_cases.insert_product(data)   
    return jsonify(product)

@api_blueprint.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    data = request.json
    
    return jsonify(use_cases.update_product(product_id, data))

@api_blueprint.route('/patrimony', methods=['POST'])
@jwt_required()
def create_patrimony():
    try:        
        data = request.json
        
        statusInsert = use_cases.insertPatrimony(data) 
        if(statusInsert == False):
            return jsonify({'success': False, 'error': 'Erro ao inserir patrimônio'}), 400
        
        return jsonify({'success': statusInsert})   
    except AuthError as e:
        return jsonify({'success': False, 'error': e.message}), 401    

@api_blueprint.route('/patrimony/<int:patrimony_id>', methods=['GET'])
@jwt_required()
def get_patrimony_by_id(patrimony_id):
    
    return jsonify(use_cases.get_patrimony_by_id(patrimony_id))

@api_blueprint.route('/patrimony/<int:patrimony_id>', methods=['PUT'])
@jwt_required()
def update_patrimony(patrimony_id):
    data = request.json
    return jsonify(use_cases.update_patrimony(patrimony_id, data))

@api_blueprint.route('/property', methods=['POST'])
@jwt_required()
def create_property():
    data = request.json
    return jsonify(use_cases.insert_property(data))

@api_blueprint.route('/status', methods=['GET'])
@jwt_required()
def get_status():
    try:
        result = use_cases.get_all_status()
        return result
    except AuthError as e:
        return jsonify({'success': False, 'error': e.message}), 401

@api_blueprint.route('/terms', methods=['GET'])
@jwt_required()
def get_terms():
    try:
        result = use_cases.get_use_term_from_docx()
        
        return result
    except AuthError as e:
        return jsonify({'success': False, 'error': e.message}), 401
    
@api_blueprint.route('/about', methods=['GET'])
@jwt_required()
def get_about():
    try:
        result = use_cases.get_about_us_from_docx()
        return result
    except AuthError as e:
        return jsonify({'success': False, 'error': e.message}), 401

@api_blueprint.route('/privacy', methods=['GET'])
@jwt_required()
def get_privacy():
    try:
        result = use_cases.get_privacy_policy_from_docx()
        return result
    except AuthError as e:
        return jsonify({'success': False, 'error': e.message}), 401