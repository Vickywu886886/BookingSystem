from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from extensions import db
from werkzeug.security import generate_password_hash

admin_bp = Blueprint('admin', __name__)

def admin_required():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role != 'admin':
        return False
    return True

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    if not admin_required():
        return jsonify({"message": "Admin access required"}), 403
    
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@admin_bp.route('/users', methods=['POST'])
@jwt_required()
def create_user():
    if not admin_required():
        return jsonify({"message": "Admin access required"}), 403
    
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
        role=data['role'],
        status='active'
    )
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "message": "User created successfully",
            "user": new_user.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to create user"}), 500

@admin_bp.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    if not admin_required():
        return jsonify({"message": "Admin access required"}), 403
    
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.set_password(data['password'])
    if 'role' in data:
        user.role = data['role']
    if 'status' in data:
        user.status = data['status']
    
    try:
        db.session.commit()
        return jsonify({
            "message": "User updated successfully",
            "user": user.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to update user"}), 500

@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    if not admin_required():
        return jsonify({"message": "Admin access required"}), 403
    
    user = User.query.get_or_404(user_id)
    
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to delete user"}), 500

@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard():
    current_user_id = get_jwt_identity()
    # TODO: Implement dashboard data retrieval
    return jsonify({"message": "Admin dashboard"}) 