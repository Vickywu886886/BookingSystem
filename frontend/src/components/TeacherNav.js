import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Typography,
  Box
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';

const TeacherNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/teacher/dashboard' },
    { text: 'Students', icon: <PeopleIcon />, path: '/teacher/students' },
    { text: 'Courses', icon: <BookIcon />, path: '/teacher/courses' },
    { text: 'Schedule', icon: <CalendarTodayIcon />, path: '/teacher/availability' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/teacher/settings' },
  ];

  return (
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TeacherNav; 