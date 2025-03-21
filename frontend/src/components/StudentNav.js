import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  IconButton,
  Badge,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  color: '#2e7d32',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  '& .MuiToolbar-root': {
    padding: 0,
    minHeight: 'unset'
  }
}));

const StudentNav = () => {
  const [userData, setUserData] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
      // Add logic to get notification count here
      setNotificationCount(3); // Example count
    }
  }, []);

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

  if (!userData) return null;

  return (
    <StyledAppBar>
      <Toolbar
        sx={{
          height: { xs: '48px', sm: '56px' },
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          flex: 1,
          gap: { xs: 1, sm: 1.5 },
          pl: { xs: 1, sm: 1.5 }
        }}>
          <Avatar 
            src={userData.avatar} 
            alt={userData.username}
            onClick={handleMenuOpen}
            sx={{ 
              width: { xs: 32, sm: 36 }, 
              height: { xs: 32, sm: 36 },
              border: '2px solid #4caf50',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
          />
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              color: '#2e7d32',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: { xs: '150px', sm: '200px' }
            }}
          >
            {userData.username}
          </Typography>
        </Box>
        <IconButton 
          size={isMobile ? "small" : "medium"}
          sx={{ 
            color: '#2e7d32',
            mr: { xs: 1, sm: 1.5 },
            p: { xs: 0.5, sm: 1 },
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
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                minWidth: { xs: '16px', sm: '20px' },
                height: { xs: '16px', sm: '20px' },
                padding: 0
              }
            }}
          >
            <NotificationsIcon sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }} />
          </Badge>
        </IconButton>

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
          <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: '#d32f2f' }} />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default StudentNav; 