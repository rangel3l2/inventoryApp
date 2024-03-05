from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from auth.auth import authenticate_user
from auth.auth import AuthError
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'olamundoforeveryone' 
jwt = JWTManager(app)  # Initialize JWTManager
CORS(app, resources={r"/*": {"origins": "*"}})

# Import for creating access tokens
from flask_jwt_extended import create_access_token

@app.route('/auth', methods=['POST'])
def authenticate():
    barcode = request.json.get('barcode')

    if not barcode:
        return jsonify({'success': False, 'error': 'Código de barras ausente'}), 400

    try:
        name, role = authenticate_user(barcode)       
        access_token = create_access_token(identity={'name': name, 'role': role})
        
        return jsonify({'success': True, 'name': name, 'role': role, 'token': access_token})
    except AuthError as e:
        print('entrou')
        return jsonify(e.error), e.status_code

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
      # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.errorhandler(Exception)
def handle_exception(error):
    message = f"An error occurred: {str(error)}"
    status_code = 500  


    return jsonify({'error': message}), status_code

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
