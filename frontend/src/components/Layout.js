import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  Typography
} from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import LoginIcon from '@mui/icons-material/Login';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  // Check if on login page
  const isLoginPage = location.pathname === '/login';

  // Monitor user data changes
  useEffect(() => {
    const checkUserData = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (JSON.stringify(user) !== JSON.stringify(userData)) {
        setUserData(user);
      }
    };

    // Initialize user data
    checkUserData();

    // Set periodic check
    const interval = setInterval(checkUserData, 1000);

    // Add storage event listener
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        const user = JSON.parse(e.newValue);
        setUserData(user);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userData]);

  // If on login page, return content directly without navigation bar
  if (isLoginPage) {
    return <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Outlet />
    </Box>;
  }

  // Base menu items
  const baseMenuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Courses', icon: <AutoStoriesIcon />, path: '/courses' },
    { text: 'Teachers', icon: <SchoolIcon />, path: '/teachers' },
  ];

  // Teacher menu items
  const teacherMenuItems = [];

  // Student menu items
  const studentMenuItems = [
    ...baseMenuItems,
    { text: 'Learning Center', icon: <SchoolIcon />, path: '/student/dashboard' },
    { text: 'Profile', icon: <PersonIcon />, path: '/student/profile' },
  ];

  // Admin menu items
  const adminMenuItems = [
    { text: 'Staff Management', icon: <SchoolIcon />, path: '/admin/dashboard?menu=staff' },
    { text: 'Student Management', icon: <PersonIcon />, path: '/admin/dashboard?menu=students' },
    { text: 'Class Management', icon: <CalendarIcon />, path: '/admin/dashboard?menu=classes' },
    { text: 'Schedule Management', icon: <CalendarIcon />, path: '/admin/dashboard?menu=schedule' },
    { text: 'Course Orders', icon: <AutoStoriesIcon />, path: '/admin/dashboard?menu=orders' },
  ];

  // Choose menu items based on user role
  const menuItems = userData ? (
    userData.role === 'admin' ? adminMenuItems :
    userData.role === 'teacher' ? teacherMenuItems : 
    studentMenuItems
  ) : baseMenuItems;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          mb: '64px' // Leave space for bottom navigation bar
        }}
      >
        <Outlet />
      </Box>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          top: 'auto',
          bottom: 0,
          bgcolor: 'white',
          boxShadow: 'none',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          height: '64px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              minHeight: '64px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            {menuItems.map((item, index) => (
              <Button
                key={index}
                onClick={() => navigate(item.path)}
                sx={{
                  color: location.pathname === item.path ? '#4caf50' : '#666',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 'auto',
                  padding: '8px',
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#4caf50'
                  }
                }}
              >
                {item.icon}
                <Typography
                  variant="caption"
                  sx={{
                    marginTop: '4px',
                    fontSize: '12px',
                    fontWeight: location.pathname === item.path ? 600 : 400
                  }}
                >
                  {item.text}
                </Typography>
              </Button>
            ))}
            {!userData && (
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  color: '#666',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 'auto',
                  padding: '8px',
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#4caf50'
                  }
                }}
              >
                <LoginIcon />
                <Typography
                  variant="caption"
                  sx={{
                    marginTop: '4px',
                    fontSize: '12px',
                    fontWeight: location.pathname === '/login' ? 600 : 400
                  }}
                >
                  登录
                </Typography>
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Layout; 