from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
<<<<<<< HEAD
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # student, teacher, admin
    status = db.Column(db.String(20), nullable=False, default='active')  # active, inactive
    avatar = db.Column(db.Text)  # 添加头像字段
=======
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # student, teacher, admin
<<<<<<< HEAD
    avatar = db.Column(db.Text)  # 添加头像字段
=======
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Teacher specific fields
    profile_image = db.Column(db.String(200))
    bio = db.Column(db.Text)
    expertise = db.Column(db.String(200))
    teaching_style = db.Column(db.Text)
    
    def __repr__(self):
        return f'<User {self.username}>'
    
    def set_password(self, password):
<<<<<<< HEAD
        # 使用默认的 sha256 方法进行密码加密
        self.password = generate_password_hash(password)
        
    def check_password(self, password):
        try:
            result = check_password_hash(self.password, password)
            print(f"Password verification for user {self.username}:")
            print(f"- Input password length: {len(password)}")
            print(f"- Stored hash: {self.password[:20]}...")
            print(f"- Verification result: {result}")
            return result
        except Exception as e:
            print(f"Error during password verification: {str(e)}")
            return False
=======
        self.password = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password, password)
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
<<<<<<< HEAD
            'role': self.role,
            'status': self.status,
            'avatar': self.avatar,
=======
            'email': self.email,
            'role': self.role,
<<<<<<< HEAD
            'avatar': self.avatar,
=======
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
            'profile_image': self.profile_image,
            'bio': self.bio,
            'expertise': self.expertise,
            'teaching_style': self.teaching_style,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        } 