from extensions import db
from datetime import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedules.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, confirmed, completed, cancelled
    payment_status = db.Column(db.String(20), default='pending')  # pending, paid, refunded
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    student = db.relationship('User', backref=db.backref('bookings', lazy=True))
    schedule = db.relationship('Schedule', backref=db.backref('bookings', lazy=True))

    def __repr__(self):
        return f'<Booking {self.id}>'

    def to_dict(self):
        try:
            schedule_data = {
                'id': self.schedule.id,
                'start_time': self.schedule.start_time.isoformat(),
                'end_time': self.schedule.end_time.isoformat(),
                'is_available': self.schedule.is_available
            } if self.schedule else None

            course_data = None
            if self.schedule and self.schedule.course:
                course_data = {
                    'id': self.schedule.course.id,
                    'title': self.schedule.course.title,
                    'description': self.schedule.course.description,
                    'teacher': {
                        'id': self.schedule.course.teacher.id,
                        'username': self.schedule.course.teacher.username,
                        'avatar': self.schedule.course.teacher.avatar
                    } if self.schedule.course.teacher else None
                }

            return {
                'id': self.id,
                'student_id': self.student_id,
                'course_id': self.course_id,
                'schedule_id': self.schedule_id,
                'status': self.status,
                'payment_status': self.payment_status,
                'created_at': self.created_at.isoformat(),
                'updated_at': self.updated_at.isoformat(),
                'schedule': schedule_data,
                'course': course_data
            }
        except Exception as e:
            print(f"Error in to_dict: {str(e)}")
            return {
                'id': self.id,
                'student_id': self.student_id,
                'course_id': self.course_id,
                'schedule_id': self.schedule_id,
                'status': self.status,
                'payment_status': self.payment_status,
                'created_at': self.created_at.isoformat(),
                'updated_at': self.updated_at.isoformat(),
                'schedule': None,
                'course': None
            } 