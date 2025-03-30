import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Avatar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import LoginIcon from '@mui/icons-material/Login';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  // Check if on login page
  const isLoginPage = location.pathname === '/login';

  // Monitor user data changes
  useEffect(() => {
    const checkUserData = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (JSON.stringify(user) !== JSON.stringify(userData)) {
        setUserData(user);
        if (user) {
          setNotificationCount(3); // Example count
        }
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
        if (user) {
          setNotificationCount(3); // Example count
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userData]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', color: '#2e7d32', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <Toolbar sx={{ justifyContent: 'flex-end', minHeight: '56px' }}>
          {userData && (
            <>
              <IconButton
                size="medium"
                sx={{
                  color: '#2e7d32',
                  mr: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(46, 125, 50, 0.08)'
                  }
                }}
              >
                <Badge
                  badgeContent={notificationCount}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ff4444',
                      fontSize: '0.8rem',
                      minWidth: '20px',
                      height: '20px',
                      padding: 0
                    }
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar
                src={userData.avatar}
                alt={userData.username}
                onClick={handleMenuOpen}
                sx={{
                  width: 36,
                  height: 36,
                  border: '2px solid #4caf50',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    minWidth: 200
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => navigate('/student/bookings')}>
                  <ListItemIcon>
                    <CalendarTodayIcon fontSize="small" sx={{ color: '#2e7d32' }} />
                  </ListItemIcon>
                  <ListItemText>我的预约</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: '#d32f2f' }} />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          pt: '56px', // Add padding for the top app bar
          pb: { xs: '56px', sm: '64px' } // Add padding for the bottom navigation bar
        }}
      >
        <Outlet />
      </Box>
      {userData && (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            value={location.pathname}
            onChange={(event, newValue) => {
              const selectedItem = menuItems.find(item => item.path === newValue);
              if (selectedItem) {
                navigate(selectedItem.path);
              }
            }}
            showLabels
          >
            {menuItems.map((item) => (
              <BottomNavigationAction
                key={item.path}
                label={item.text}
                value={item.path}
                icon={item.icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
};

export default Layout; 