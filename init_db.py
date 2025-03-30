from app import app, db
from models.user import User
from models.course import Course
from models.schedule import Schedule
from datetime import datetime, timedelta

def init_db():
    with app.app_context():
        print("Creating database tables...")
        db.create_all()
        
        print("Creating default admin account...")
        # Create default users if they don't exist
        if not User.query.filter_by(username='admin').first():
            admin = User(
                username='admin',
                role='admin',
                avatar='https://randomuser.me/api/portraits/men/1.jpg'
            )
            admin.set_password('123456')
            db.session.add(admin)
            print("Default admin account created successfully")
        
        print("Creating Emma White teacher account...")
        teacher = None
        if not User.query.filter_by(username='emma_white').first():
            teacher = User(
                username='emma_white',
                role='teacher',
                avatar='https://randomuser.me/api/portraits/women/3.jpg',
                bio='来自英国的专业幼儿英语教师，拥有5年教学经验。擅长通过游戏和互动方式激发幼儿学习兴趣。',
                expertise='幼儿英语',
                teaching_style='Interactive'
            )
            teacher.set_password('123456')
            db.session.add(teacher)
            db.session.commit()  # 提交以获取teacher.id
            print("Emma White teacher account created successfully")
        else:
            teacher = User.query.filter_by(username='emma_white').first()
        
        print("Creating default student account...")
        if not User.query.filter_by(username='student1').first():
            student = User(
                username='student1',
                role='student',
                avatar='https://randomuser.me/api/portraits/men/3.jpg'
            )
            student.set_password('123456')
            db.session.add(student)
            print("Default student account created successfully")
        
        print("\nVerifying all users in database:")
        users = User.query.all()
        for user in users:
            print(f"User: {user.username}, Role: {user.role}, Status: active")
        
        print("\nCreating default course...")
        # Create default courses
        course = None
        if not Course.query.first():
            course = Course(
                title='幼儿英语',
                teacher_id=teacher.id,
                description='适合幼儿的英语课程，由Emma White老师授课',
                duration=60,
                price=200
            )
            db.session.add(course)
            db.session.commit()  # 提交以获取course.id
            print("Default course created successfully")
        else:
            course = Course.query.first()
        
        print("\nCreating default schedules...")
        # Create default schedules
        today = datetime.now()
        for i in range(7):
            schedule = Schedule(
                course_id=course.id,
                teacher_id=teacher.id,
                start_time=today + timedelta(days=i, hours=10),
                end_time=today + timedelta(days=i, hours=11),
                is_available=True
            )
            db.session.add(schedule)
            print(f"Schedule {i+1} created successfully")
        
        db.session.commit()
        print("\nDatabase initialized with default users, courses, and schedules.")

if __name__ == '__main__':
    init_db() 