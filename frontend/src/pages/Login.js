import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authApi';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
  useTheme,
  IconButton,
  InputAdornment
} from '@mui/material';
import { School as SchoolIcon, Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData);
      // 存储用户信息和token
      localStorage.setItem('user', JSON.stringify(response.user));
<<<<<<< HEAD
      localStorage.setItem('token', response.access_token);
=======
      localStorage.setItem('token', response.token);
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7

      // 根据用户角色重定向
      switch (response.user.role) {
        case 'student':
          // 检查是否是首次登录
          const isFirstLogin = !localStorage.getItem('hasCompletedOnboarding');
          if (isFirstLogin) {
            navigate('/onboarding');
          } else {
            navigate('/student');
          }
          break;
        case 'teacher':
          navigate('/teacher/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
<<<<<<< HEAD
      setError('用户名或密码错误');
=======
      setError('账号或密码错误');
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <Container component="main" maxWidth="xs">
<<<<<<< HEAD
        <Paper
          elevation={6}
          sx={{
            p: 4,
=======
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
            width: '100%',
            borderRadius: 2,
            background: '#ffffff',
            border: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <SchoolIcon sx={{ fontSize: 48, color: '#2e7d32', mb: 1 }} />
<<<<<<< HEAD
            <Typography component="h1" variant="h4" align="center" gutterBottom sx={{
=======
            <Typography component="h1" variant="h4" align="center" gutterBottom sx={{ 
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
              color: '#2e7d32',
              fontWeight: 'bold'
            }}>
              课程预约系统
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
<<<<<<< HEAD
              请使用用户名登录
            </Typography>
          </Box>

=======
              请登录您的账号
            </Typography>
          </Box>
          
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
<<<<<<< HEAD

=======
          
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
<<<<<<< HEAD
              label="用户名"
=======
              label="账号"
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#2e7d32',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#2e7d32',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
<<<<<<< HEAD
              sx={{
                mt: 3,
=======
              sx={{ 
                mt: 3, 
>>>>>>> c8252f0dd2b94410bd1cf91957a2c69ff147b6c7
                mb: 2,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20',
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                },
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              disabled={loading}
            >
              {loading ? '登录中...' : '登录'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                还没有账号？{' '}
                <Link to="/register" style={{ color: '#2e7d32', textDecoration: 'none' }}>
                  立即注册
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 