from flask import Blueprint, request, jsonify
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
from flask_jwt_extended import create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from extensions import db
from flask_jwt_extended import jwt_required
<<<<<<< HEAD
from datetime import timedelta
from flask_cors import cross_origin
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
=======
=======
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from extensions import db
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already registered"}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message": "Username already taken"}), 400
    
    # Create new user
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        role=data['role']
    )
    
    try:
        db.session.add(new_user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=new_user.id)
        
        return jsonify({
            "message": "Registration successful",
            "token": access_token,
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email,
                "role": new_user.role
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Registration failed"}), 500

<<<<<<< HEAD
@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True, origins="http://localhost:3000")
def login():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 204

    try:
        data = request.get_json()
        
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({"message": "Missing username or password"}), 400
        
        user = User.query.filter_by(username=username).first()
        
        if not user or not user.check_password(password):
            return jsonify({"message": "Invalid username or password"}), 401
        
        if user.status != 'active':
            return jsonify({"message": "Account is not active"}), 401
        
        access_token = create_access_token(
            identity=user.id,
            expires_delta=timedelta(days=1)
        )
        
        return jsonify({
            "message": "Login successful",
            "token": access_token,
            "user": {
                "id": user.id,
                "username": user.username,
                "role": user.role,
                "status": user.status,
                "avatar": user.avatar or "https://randomuser.me/api/portraits/men/1.jpg"
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({"message": "Server error"}), 500
=======
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Invalid email or password"}), 401
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
<<<<<<< HEAD
            "role": user.role,
            "avatar": user.avatar or "https://randomuser.me/api/portraits/men/1.jpg"
        }
    }), 200
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7

@auth_bp.route('/update-avatar', methods=['POST'])
@jwt_required()
def update_avatar():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.get_json()
    if 'avatar' not in data:
        return jsonify({"message": "Avatar data is required"}), 400
    
    user.avatar = data['avatar']
    db.session.commit()
    
    return jsonify({
        "message": "Avatar updated successfully",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "avatar": user.avatar
<<<<<<< HEAD
=======
=======
            "role": user.role
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
        }
    }), 200 