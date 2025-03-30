import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// 获取预约列表
export const getMyBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/student/bookings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('获取预约列表失败:', error);
    throw error;
  }
};

// 创建预约
export const createBooking = async (courseId, scheduleId) => {
  try {
    const response = await axios.post(`${API_URL}/student/bookings`, {
      course_id: courseId,
      schedule_id: scheduleId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('创建预约失败:', error);
    throw error;
  }
};

// 取消预约
export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.delete(`${API_URL}/student/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('取消预约失败:', error);
    throw error;
  }
}; 