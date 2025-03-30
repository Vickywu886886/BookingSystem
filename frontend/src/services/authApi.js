import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const login = async (credentials) => {
  try {
<<<<<<< HEAD
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    // 确保响应格式正确
    const { token, user, message } = response.data;
    if (!token || !user) {
      throw new Error('Invalid response format from server');
    }

    return {
      access_token: token,  // 转换为前端期望的格式
      user,
      message
    };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || '登录失败');
    } else if (error.request) {
      throw new Error('服务器无响应，请检查网络连接');
    } else {
      throw new Error('请求配置错误');
    }
=======
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAvatar = async (avatarData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/auth/update-avatar`,
      { avatar: avatarData },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Avatar update error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
<<<<<<< HEAD
};
=======
}; 
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
