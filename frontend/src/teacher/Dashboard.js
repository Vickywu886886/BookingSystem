import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Button,
  Chip,
  Avatar,
  IconButton,
  Badge,
  TextField,
  LinearProgress,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  AccessTime,
  Notifications,
  Schedule,
  Delete as DeleteIcon,
  VideoCall as VideoCallIcon,
  AudioFile as AudioFileIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarTodayIcon,
  ArrowForward as ArrowForwardIcon,
  Info as InfoIcon,
  Event as EventIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TeacherNav from '../components/TeacherNav';
import TeacherLayout from '../components/TeacherLayout';

// 主题颜色
const theme = {
  primary: '#2e7d32',
  primaryLight: '#4caf50',
  primaryDark: '#1b5e20',
  secondary: '#f5f5f5',
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#999999'
  },
  background: {
    paper: '#ffffff',
    default: '#f5f5f5'
  },
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3'
};

// 通用卡片样式
const cardStyle = {
  p: 3,
  height: '100%',
  borderRadius: 2,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  background: theme.background.paper,
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    transform: 'translateY(-4px)'
  }
};

// 标题样式
const titleStyle = {
  display: 'flex',
  alignItems: 'center',
  mb: 3,
  pb: 2,
  borderBottom: `2px solid ${theme.primaryLight}`,
  '& .MuiTypography-root': {
    fontWeight: 600,
    color: theme.primary
  },
  '& .MuiSvgIcon-root': {
    mr: 1.5,
    color: theme.primary
  }
};

const TeacherDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    bio: '',
    video: null,
    audio: null,
  });
  const [notifications] = useState([
    { id: 1, type: 'class', title: 'Upcoming Class', time: '10:00 AM', student: 'Zhang Xiaoming' },
    { id: 2, type: 'assignment', title: 'Assignment to Grade', time: 'Yesterday', student: 'Li Xiaohua' },
    { id: 3, type: 'feedback', title: 'New Course Review', time: '2 days ago', student: 'Wang Xiaohong' },
  ]);
  const [reminders] = useState([
    {
      id: 1,
      type: 'class',
      priority: 'high',
      title: 'IELTS Speaking Class',
      time: '10:00 AM',
      student: {
        name: 'Zhang Xiaoming',
        level: 'Advanced',
        course: 'IELTS Speaking'
      }
    },
    {
      id: 2,
      type: 'booking',
      priority: 'high',
      title: 'New Booking Request',
      time: '15:00 PM',
      student: {
        name: 'Li Xiaohua',
        level: 'Intermediate',
        course: 'Business English'
      }
    },
    {
      id: 3,
      type: 'assignment',
      priority: 'medium',
      title: 'Assignment to Grade',
      time: 'Due Today',
      student: {
        name: 'Wang Xiaohong',
        level: 'Intermediate',
        course: 'Academic Writing'
      }
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedClass, setSelectedClass] = useState(null);

  const classSchedule = {
    today: [
      {
        id: 1,
        date: '2024-03-20',
        time: '09:00 - 10:00',
        student: {
          name: 'Zhang Xiaoming',
          level: 'Advanced',
          age: 15
        },
        course: {
          type: 'IELTS Speaking',
          topic: 'Part 2 - Cue Card Practice',
          materials: 'Cambridge IELTS 17',
          objectives: [
            'Improve descriptive expression ability',
            'Practice key word extraction and expansion',
            'Time management training'
          ]
        },
        status: 'upcoming'
      },
      {
        id: 2,
        date: '2024-03-20',
        time: '10:30 - 11:30',
        student: {
          name: 'Li Xiaohua',
          level: 'Intermediate',
          age: 14
        },
        course: {
          type: 'Business English',
          topic: 'Email Writing',
          materials: 'Market Leader - Intermediate',
          objectives: [
            'Master business email format',
            'Learn common business expressions',
            'Practice email writing'
          ]
        },
        status: 'completed'
      },
      {
        id: 3,
        date: '2024-03-20',
        time: '14:00 - 15:00',
        student: {
          name: 'Wang Xiaohong',
          level: 'Intermediate',
          age: 16
        },
        course: {
          type: 'Academic Writing',
          topic: 'Essay Structure',
          materials: 'Academic Writing Skills 2',
          objectives: [
            'Understand essay structure',
            'Practice topic sentence writing',
            'Learn paragraph development methods'
          ]
        },
        status: 'cancelled'
      }
    ],
    week: [
      // ... similar structure for weekly schedule
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return '#4caf50';
      case 'completed':
        return '#2196f3';
      case 'cancelled':
        return '#ff5252';
      default:
        return '#757575';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming Class';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
      setFormData({
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        video: user.video || null,
        audio: user.audio || null,
      });
      setLoading(false);
    }
  }, []);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...userData, avatar: reader.result };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...userData, [type]: reader.result };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
        setFormData(prev => ({
          ...prev,
          [type]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updatedUser = { 
      ...userData,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      video: formData.video,
      audio: formData.audio
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUserData(updatedUser);
    setEditMode(false);
  };

  const handleBookingResponse = (reminderId, accepted) => {
    // In a real application, this would call an API to handle the booking response
    console.log(`Booking ${accepted ? 'accepted' : 'rejected'} for reminder ${reminderId}`);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!userData) {
    return <Typography>No profile data available</Typography>;
  }

  const stats = [
    {
      title: "Today's Classes",
      value: '5',
      icon: <ClassIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
    },
    {
      title: 'Pending Assignments',
      value: '12',
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
    },
    {
      title: 'Average Rating',
      value: '4.8',
      icon: <StarIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Left Side: Profile Card */}
      <Grid container spacing={3}>
        {/* Left Side: Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Avatar
                  src={userData?.avatar}
                  alt="Teacher"
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: '#4caf50',
                    border: '3px solid #4caf50'
                  }}
                />
                <input
                  accept="image/*"
                  type="file"
                  id="dashboard-avatar-upload"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="dashboard-avatar-upload">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      bgcolor: '#4caf50',
                      color: 'white',
                      '&:hover': { bgcolor: '#45a049' }
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Teacher
              </Typography>
              {!editMode ? (
                <Button
                  variant="outlined"
                  onClick={() => setEditMode(true)}
                  sx={{
                    color: '#4caf50',
                    borderColor: '#4caf50',
                    '&:hover': {
                      borderColor: '#45a049',
                      bgcolor: 'rgba(76, 175, 80, 0.04)'
                    }
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                      bgcolor: '#4caf50',
                      '&:hover': { bgcolor: '#45a049' }
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setEditMode(false)}
                    sx={{
                      color: '#4caf50',
                      borderColor: '#4caf50',
                      '&:hover': {
                        borderColor: '#45a049',
                        bgcolor: 'rgba(76, 175, 80, 0.04)'
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>

            {/* Stats */}
            <Grid container spacing={2}>
              {stats.map((stat, index) => (
                <Grid item xs={12} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: 'rgba(76, 175, 80, 0.04)',
                      border: '1px solid #4caf50'
                    }}
                  >
                    {stat.icon}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6" sx={{ color: '#2D5A27' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Right Side: Schedule and Reminders */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#2D5A27' }}>
                Today's Schedule
              </Typography>
              <Button
                variant="outlined"
                startIcon={<CalendarTodayIcon />}
                sx={{
                  color: '#4caf50',
                  borderColor: '#4caf50',
                  '&:hover': {
                    borderColor: '#45a049',
                    bgcolor: 'rgba(76, 175, 80, 0.04)'
                  }
                }}
              >
                View Calendar
              </Button>
            </Box>

            <List>
              {classSchedule[selectedDate].map((classItem) => (
                <ListItem
                  key={classItem.id}
                  sx={{
                    mb: 1,
                    p: 2,
                    bgcolor: 'rgba(76, 175, 80, 0.04)',
                    border: '1px solid #4caf50',
                    borderRadius: 1
                  }}
                >
                  <ListItemIcon>
                    <EventIcon sx={{ color: getStatusColor(classItem.status) }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ color: '#2D5A27', mr: 1 }}>
                          {classItem.course.type}
                        </Typography>
                        <Chip
                          label={getStatusLabel(classItem.status)}
                          size="small"
                          sx={{
                            bgcolor: getStatusColor(classItem.status),
                            color: 'white'
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {classItem.time} - {classItem.student.name} ({classItem.student.level})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Topic: {classItem.course.topic}
                        </Typography>
                      </>
                    }
                  />
                  <IconButton
                    onClick={() => setSelectedClass(classItem)}
                    sx={{ color: '#4caf50' }}
                  >
                    <InfoIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>

            {/* Course Details Dialog */}
            {selectedClass && (
              <Paper
                sx={{
                  mt: 2,
                  p: 3,
                  bgcolor: 'rgba(76, 175, 80, 0.04)',
                  border: '1px solid #4caf50'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#2D5A27' }}>
                    Course Details
                  </Typography>
                  <IconButton onClick={() => setSelectedClass(null)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ color: '#2D5A27', mb: 1 }}>
                      Student Information
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Name: {selectedClass.student.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Level: {selectedClass.student.level}
                    </Typography>
                    <Typography variant="body2">
                      Age: {selectedClass.student.age} years
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ color: '#2D5A27', mb: 1 }}>
                      Course Information
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Type: {selectedClass.course.type}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Topic: {selectedClass.course.topic}
                    </Typography>
                    <Typography variant="body2">
                      Materials: {selectedClass.course.materials}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ color: '#2D5A27', mb: 1 }}>
                      Learning Objectives
                    </Typography>
                    <List dense>
                      {selectedClass.course.objectives.map((objective, index) => (
                        <ListItem key={index} sx={{ py: 0 }}>
                          <ListItemIcon sx={{ minWidth: '32px' }}>
                            <ArrowForwardIcon sx={{ color: '#4caf50', fontSize: '0.8rem' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={objective}
                            sx={{ m: 0 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Paper>

          {/* Recent Notifications */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: '#2D5A27', mb: 2 }}>
              Recent Notifications
            </Typography>
            <List>
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  sx={{
                    mb: 1,
                    p: 2,
                    bgcolor: 'rgba(76, 175, 80, 0.04)',
                    border: '1px solid #4caf50',
                    borderRadius: 1
                  }}
                >
                  <ListItemIcon>
                    {notification.type === 'class' ? (
                      <ClassIcon sx={{ color: '#4caf50' }} />
                    ) : notification.type === 'assignment' ? (
                      <AssignmentIcon sx={{ color: '#4caf50' }} />
                    ) : (
                      <StarIcon sx={{ color: '#4caf50' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.title}
                    secondary={`${notification.time} - ${notification.student}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDashboard; 