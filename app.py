from flask import Flask, jsonify, request, make_response
from extensions import db, jwt, migrate
from datetime import timedelta, datetime
import os
from dotenv import load_dotenv
from flask_cors import CORS
from werkzeug.security import generate_password_hash

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
CORS(app, 
     origins=["http://localhost:3000"],
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     expose_headers=["Content-Type", "Authorization"])

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

def init_db():
    """初始化数据库"""
    print("Creating database tables...")
    db.create_all()
    
    # 检查是否已存在管理员账号
    if not User.query.filter_by(username='admin').first():
        print("Creating default admin account...")
        admin = User(
            username='admin',
            password=generate_password_hash('123456'),
            role='admin',
            status='active'
        )
        db.session.add(admin)
        db.session.commit()
        print("Default admin account created successfully")
    
    # 检查是否已存在教师账号
    if not User.query.filter_by(username='teacher1').first():
        print("Creating default teacher account...")
        teacher = User(
            username='teacher1',
            password=generate_password_hash('123456'),
            role='teacher',
            status='active'
        )
        db.session.add(teacher)
        db.session.commit()
        print("Default teacher account created successfully")
    
    # 检查是否已存在学生账号
    if not User.query.filter_by(username='student1').first():
        print("Creating default student account...")
        student = User(
            username='student1',
            password=generate_password_hash('123456'),
            role='student',
            status='active'
        )
        db.session.add(student)
        db.session.commit()
        print("Default student account created successfully")
    
    # 检查是否已存在 Emma White 的账号
    if not User.query.filter_by(username='emma_white').first():
        print("Creating Emma White's account...")
        emma = User(
            username='emma_white',
            password=generate_password_hash('123456'),
            role='teacher',
            status='active',
            bio='来自英国的专业幼儿英语教师，拥有5年教学经验。擅长通过游戏和互动方式激发幼儿学习兴趣。',
            expertise='幼儿英语,自然拼读,趣味教学',
            teaching_style='互动式教学,游戏化学习'
        )
        db.session.add(emma)
        db.session.commit()
        print("Emma White's account created successfully")
        
        # 为 Emma White 创建课程
        if not Course.query.filter_by(teacher_id=emma.id).first():
            print("Creating Emma White's courses...")
            course = Course(
                title='趣味幼儿英语',
                description='通过游戏和互动方式激发幼儿学习英语的兴趣',
                price=200.0,
                duration=45,
                teacher_id=emma.id
            )
            db.session.add(course)
            db.session.commit()
            print("Emma White's course created successfully")
            
            # 创建课程时间段
            if not Schedule.query.filter_by(course_id=course.id).first():
                print("Creating course schedules...")
                # 创建一周的时间段
                for day in range(1, 8):  # 1-7 代表周一到周日
                    for time_slot in ['morning', 'afternoon', 'evening']:
                        # 设置时间段
                        if time_slot == 'morning':
                            start_time = datetime.now().replace(hour=9, minute=0, second=0, microsecond=0)
                            end_time = start_time + timedelta(minutes=45)
                        elif time_slot == 'afternoon':
                            start_time = datetime.now().replace(hour=14, minute=0, second=0, microsecond=0)
                            end_time = start_time + timedelta(minutes=45)
                        else:  # evening
                            start_time = datetime.now().replace(hour=19, minute=0, second=0, microsecond=0)
                            end_time = start_time + timedelta(minutes=45)
                        
                        schedule = Schedule(
                            teacher_id=emma.id,
                            course_id=course.id,
                            start_time=start_time,
                            end_time=end_time,
                            is_available=True
                        )
                        db.session.add(schedule)
                db.session.commit()
                print("Course schedules created successfully")
    
    # 验证所有用户
    print("\nVerifying all users in database:")
    users = User.query.all()
    for user in users:
        print(f"User: {user.username}, Role: {user.role}, Status: {user.status}")
    
    print("\nVerifying all courses in database:")
    courses = Course.query.all()
    for course in courses:
        print(f"Course: {course.title}, Teacher: {course.teacher.username}")
    
    print("\nVerifying all schedules in database:")
    schedules = Schedule.query.all()
    for schedule in schedules:
        print(f"Schedule: Course {schedule.course.title}, Start Time: {schedule.start_time}, End Time: {schedule.end_time}")

if __name__ == '__main__':
    with app.app_context():
        init_db()
    app.run(debug=True, port=5001)
