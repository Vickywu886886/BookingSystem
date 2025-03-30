<<<<<<< HEAD
from flask import Flask, jsonify, request, make_response
from extensions import db, jwt, migrate
from datetime import timedelta, datetime
import os
from dotenv import load_dotenv
from flask_cors import CORS
=======
from flask import Flask, jsonify
from extensions import db, jwt, cors, migrate
from datetime import timedelta, datetime
import os
from dotenv import load_dotenv
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure app
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///education_platform.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Initialize extensions
db.init_app(app)
jwt.init_app(app)
migrate.init_app(app, db)

# Configure CORS
<<<<<<< HEAD
CORS(app, origins="http://localhost:3000", supports_credentials=True)
=======
cors.init_app(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7

# Import models
from models.user import User
from models.course import Course
from models.schedule import Schedule
from models.booking import Booking

# Import routes
from routes.auth import auth_bp
from routes.student import student_bp
from routes.teacher import teacher_bp
from routes.admin import admin_bp

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(student_bp, url_prefix='/api/student')
app.register_blueprint(teacher_bp, url_prefix='/api/teacher')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Education Platform API"})

# Create database tables and add default teacher
with app.app_context():
<<<<<<< HEAD
    print("Creating database tables...")
    db.drop_all()  # Drop all existing tables
    db.create_all()  # Create tables with current schema
    
    # Create default admin account if it doesn't exist
    default_admin = User.query.filter_by(username='admin').first()
    if not default_admin:
        print("Creating default admin account...")
        admin = User(
            username='admin',
            role='admin',
            status='active'
        )
        admin.set_password('123456')
        db.session.add(admin)
        print("Default admin account created successfully")
    else:
        print("Default admin account already exists")

    # Create default teacher account if it doesn't exist
    default_teacher = User.query.filter_by(username='teacher1').first()
    if not default_teacher:
        print("Creating default teacher account...")
        teacher = User(
            username='teacher1',
            role='teacher',
            status='active'
        )
        teacher.set_password('123456')
        db.session.add(teacher)
        print("Default teacher account created successfully")
    else:
        print("Default teacher account already exists")

    # Create default student account if it doesn't exist
    default_student = User.query.filter_by(username='student1').first()
    if not default_student:
        print("Creating default student account...")
        student = User(
            username='student1',
            role='student',
            status='active'
        )
        student.set_password('123456')
        db.session.add(student)
        print("Default student account created successfully")
    else:
        print("Default student account already exists")

    # Commit all changes
    db.session.commit()

    # Verify all users
    print("\nVerifying all users in database:")
    users = User.query.all()
    for user in users:
        print(f"User: {user.username}, Role: {user.role}, Status: {user.status}")

if __name__ == '__main__':
    print("Starting server...")
    app.run(debug=True, host='localhost', port=5001)
=======
    db.create_all()
    # Check if default teacher exists
    default_teacher = User.query.filter_by(email='teacher1@example.com').first()
    if not default_teacher:
        teacher = User(
            username='teacher1',
            email='teacher1@example.com',
            role='teacher',
            created_at=datetime.utcnow()
        )
        teacher.set_password('password123')
        db.session.add(teacher)
        db.session.commit()
        print('Default teacher account created successfully!')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
