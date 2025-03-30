from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.booking import Booking
from models.course import Course
from models.schedule import Schedule
from extensions import db
from sqlalchemy.orm import joinedload
import logging
import traceback

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

student_bp = Blueprint('student', __name__)

@student_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard():
    current_user_id = get_jwt_identity()
    # TODO: Implement dashboard data retrieval
    return jsonify({"message": "Student dashboard"})

@student_bp.route('/bookings', methods=['GET'])
@jwt_required()
def get_my_bookings():
    try:
        current_user_id = get_jwt_identity()
        logger.debug(f"Fetching bookings for user ID: {current_user_id}")
        
        # 使用 joinedload 加载所有关系
        bookings = Booking.query.filter_by(student_id=current_user_id)\
            .options(
                joinedload(Booking.schedule).joinedload(Schedule.course).joinedload(Course.teacher)
            )\
            .all()
        
        logger.debug(f"Found {len(bookings)} bookings")
        
        # 检查每个预约的关系是否都已加载
        result = []
        for booking in bookings:
            try:
                if not booking.schedule:
                    logger.error(f"Missing schedule for booking {booking.id}")
                    continue
                    
                if not booking.schedule.course:
                    logger.error(f"Missing course for schedule {booking.schedule.id}")
                    continue
                    
                if not booking.schedule.course.teacher:
                    logger.error(f"Missing teacher for course {booking.schedule.course.id}")
                    continue
                
                booking_dict = {
                    'id': booking.id,
                    'student_id': booking.student_id,
                    'course_id': booking.course_id,
                    'schedule_id': booking.schedule_id,
                    'status': booking.status,
                    'payment_status': booking.payment_status,
                    'created_at': booking.created_at.isoformat(),
                    'updated_at': booking.updated_at.isoformat(),
                    'schedule': {
                        'id': booking.schedule.id,
                        'start_time': booking.schedule.start_time.isoformat(),
                        'end_time': booking.schedule.end_time.isoformat(),
                        'is_available': booking.schedule.is_available
                    },
                    'course': {
                        'id': booking.schedule.course.id,
                        'title': booking.schedule.course.title,
                        'description': booking.schedule.course.description,
                        'teacher': {
                            'id': booking.schedule.course.teacher.id,
                            'username': booking.schedule.course.teacher.username,
                            'avatar': booking.schedule.course.teacher.avatar
                        }
                    }
                }
                result.append(booking_dict)
            except Exception as e:
                logger.error(f"Error processing booking {booking.id}: {str(e)}")
                logger.error(traceback.format_exc())
                continue
        
        return jsonify(result)
    except Exception as e:
        logger.error(f"Error fetching bookings: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": "获取预约记录失败"}), 500

@student_bp.route('/bookings', methods=['POST'])
@jwt_required()
def create_booking():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # 验证课程和时间段是否存在
    course = Course.query.get(data.get('course_id'))
    schedule = Schedule.query.get(data.get('schedule_id'))
    
    if not course or not schedule:
        return jsonify({"error": "课程或时间段不存在"}), 404
    
    # 检查时间段是否已被预约
    existing_booking = Booking.query.filter_by(
        schedule_id=data.get('schedule_id'),
        status='confirmed'
    ).first()
    
    if existing_booking:
        return jsonify({"error": "该时间段已被预约"}), 400
    
    # 创建新预约
    booking = Booking(
        student_id=current_user_id,
        course_id=data.get('course_id'),
        schedule_id=data.get('schedule_id'),
        status='pending'
    )
    
    db.session.add(booking)
    db.session.commit()
    
    return jsonify(booking.to_dict()), 201

@student_bp.route('/bookings/<int:booking_id>', methods=['DELETE'])
@jwt_required()
def cancel_booking(booking_id):
    current_user_id = get_jwt_identity()
    booking = Booking.query.get_or_404(booking_id)
    
    # 验证是否是当前用户的预约
    if booking.student_id != current_user_id:
        return jsonify({"error": "无权操作此预约"}), 403
    
    # 只能取消待确认的预约
    if booking.status != 'pending':
        return jsonify({"error": "只能取消待确认的预约"}), 400
    
    booking.status = 'cancelled'
    db.session.commit()
    
    return jsonify({"message": "预约已取消"}) 