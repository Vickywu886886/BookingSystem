import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  ListItemAvatar,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  PhotoCamera as PhotoCameraIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Grade as GradeIcon,
  Target as TargetIcon,
  LibraryBooks as LibraryBooksIcon,
  Quiz as QuizIcon,
  EmojiEvents as EmojiEventsIcon,
  Feedback as FeedbackIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  ExpandMore as ExpandMoreIcon,
  CalendarToday as CalendarTodayIcon,
  VideoCall as VideoCallIcon,
  LocationOn as LocationOnIcon,
  NotificationsActive as NotificationsActiveIcon,
  PlayArrow as PlayArrowIcon,
  Description as DescriptionIcon,
  Timeline as TimelineIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Message as MessageIcon,
  Support as SupportIcon,
  TrendingUp as TrendingUpIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { updateAvatar } from '../services/authApi';

// 添加主题颜色常量
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
  }
};

// 添加通用卡片样式
const cardStyle = {
  p: 3,
  borderRadius: 2,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transform: 'translateY(-2px)'
  }
};

// 添加通用标题样式
const titleStyle = {
  color: theme.primary,
  fontWeight: 600,
  mb: 3,
  display: 'flex',
  alignItems: 'center',
  gap: 1
};

// 添加通用图标样式
const iconStyle = {
  color: theme.primary,
  fontSize: '1.5rem'
};

const DashboardCard = ({ title, icon, children, onClick }) => (
  <Card
    sx={{
      height: '100%',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
      }
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ mr: 1 }}>{icon}</Typography>
        <Typography variant="h6">{title}</Typography>
      </Box>
      {children}
    </CardContent>
  </Card>
);

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const navigate = useNavigate();

  // 从 localStorage 获取用户信息
  const user = JSON.parse(localStorage.getItem('user'));

  const [userInfo, setUserInfo] = useState({
    name: user?.name || '张三',
    englishName: user?.englishName || 'Zhang San',
    phone: user?.phone || '13800138000',
    school: user?.school || '第一中学',
    grade: user?.grade || '高一',
    hobbies: user?.hobbies || '篮球、阅读、音乐',
    avatar: user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'
  });

  const [followedTeachers] = useState([
    {
      id: 1,
      name: '王老师',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      subject: '英语',
      description: '资深英语教师，专注英语教学10年'
    },
    {
      id: 2,
      name: '李老师',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      subject: '西班牙语',
      description: '西班牙留学归国，专注西语教学8年'
    },
    {
      id: 3,
      name: '张老师',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      subject: '法语',
      description: '法国语言文学硕士，培养多名法语高级人才'
    }
  ]);

  const [courses] = useState([
    {
      id: 1,
      name: '英语基础班',
      teacher: '李老师',
      price: 2000,
      schedule: '周一、周三 14:00-15:30',
      level: '初级',
      spots: 5,
    },
    {
      id: 2,
      name: '数学提高班',
      teacher: '张老师',
      price: 1800,
      schedule: '周二、周四 15:00-16:30',
      level: '中级',
      spots: 3,
    },
    {
      id: 3,
      name: '语文阅读班',
      teacher: '王老师',
      price: 1500,
      schedule: '周五 14:00-15:30',
      level: '初级',
      spots: 8,
    },
  ]);

  const myCourses = [
    {
      id: 1,
      name: '英语口语班',
      teacher: '李老师',
      nextClass: '2024-03-15 14:00',
      progress: 60,
      status: '进行中',
    },
    {
      id: 2,
      name: '数学竞赛班',
      teacher: '张老师',
      nextClass: '2024-03-16 15:00',
      progress: 30,
      status: '进行中',
    },
  ];

  const appointments = [
    {
      id: 1,
      course: '英语基础班',
      teacher: '李老师',
      date: '2024-03-20',
      time: '14:00-15:30',
      status: '已确认',
    },
    {
      id: 2,
      course: '数学提高班',
      teacher: '张老师',
      date: '2024-03-21',
      time: '15:00-16:30',
      status: '待确认',
    },
  ];

  // 模拟本周课程数据
  const weeklySchedule = [
    {
      id: 1,
      date: '2024-03-20',
      time: '14:00-15:30',
      subject: '英语口语',
      teacher: '李老师',
      type: 'online',
      status: 'upcoming',
      materials: ['lesson1.pdf', 'homework1.docx'],
      recording: 'https://example.com/recording1'
    },
    {
      id: 2,
      date: '2024-03-21',
      time: '15:00-16:30',
      subject: '数学竞赛',
      teacher: '张老师',
      type: 'offline',
      location: '教室301',
      status: 'upcoming',
      materials: ['math_lesson2.pdf']
    }
  ];

  // 模拟历史课程数据
  const completedCourses = [
    {
      id: 1,
      name: '英语基础班',
      teacher: '王老师',
      completionDate: '2024-03-15',
      progress: 100,
      rating: 4.5,
      feedback: '老师讲解很清晰，收获很大'
    }
  ];

  // 模拟学习统计
  const learningStats = {
    totalHours: 120,
    completedCourses: 5,
    upcomingCourses: 2,
    averageRating: 4.8
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setSnackbar({
      open: true,
      message: '个人信息更新成功！',
      severity: 'success'
    });
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        setSnackbar({
          open: true,
          message: '请选择图片文件',
          severity: 'error'
        });
        return;
      }

      // 检查文件大小（限制为 2MB）
      if (file.size > 2 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: '图片大小不能超过 2MB',
          severity: 'error'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const newAvatar = reader.result;
        try {
          // 调用后端API更新头像
          console.log('开始更新头像...');
          const response = await updateAvatar(newAvatar);
          console.log('头像更新响应:', response);

          if (!response || !response.user) {
            throw new Error('服务器响应格式不正确');
          }

          // 更新本地状态
          setUserInfo(prevState => ({
            ...prevState,
            avatar: newAvatar
          }));

          // 从 localStorage 获取最新的用户信息
          const currentUser = JSON.parse(localStorage.getItem('user'));

          // 更新 localStorage 中的用户信息
          const updatedUser = {
            ...currentUser,
            avatar: newAvatar
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));

          setSnackbar({
            open: true,
            message: '头像更新成功！',
            severity: 'success'
          });

          // 等待一小段时间后再刷新页面，确保数据已保存
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } catch (error) {
          console.error('头像更新失败:', error);
          setSnackbar({
            open: true,
            message: `头像更新失败: ${error.message || '请重试'}`,
            severity: 'error'
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    setOpenPasswordDialog(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderWeeklySchedule = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={titleStyle}>
          <CalendarTodayIcon sx={iconStyle} />
          本周课程
        </Typography>
        <Button
          startIcon={<NotificationsActiveIcon />}
          variant="outlined"
          color="primary"
          size="small"
          sx={{
            borderColor: theme.primary,
            color: theme.primary,
            '&:hover': {
              borderColor: theme.primaryDark,
              backgroundColor: 'rgba(46, 125, 50, 0.08)'
            }
          }}
        >
          设置提醒
        </Button>
      </Box>
      <Grid container spacing={2}>
        {weeklySchedule.map((course) => (
          <Grid item xs={12} key={course.id}>
            <Paper sx={cardStyle}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ color: theme.text.primary }}>
                    {course.subject}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon fontSize="small" sx={{ color: theme.text.secondary }} />
                      <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                        {course.date} {course.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" sx={{ color: theme.text.secondary }} />
                      <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                        {course.teacher}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {course.type === 'online' ? (
                      <>
                        <VideoCallIcon fontSize="small" sx={{ color: theme.primary }} />
                        <Typography variant="body2" sx={{ color: theme.primary }}>
                          线上课程
                        </Typography>
                      </>
                    ) : (
                      <>
                        <LocationOnIcon fontSize="small" sx={{ color: theme.primary }} />
                        <Typography variant="body2" sx={{ color: theme.primary }}>
                          {course.location}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
                {course.type === 'online' && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlayArrowIcon />}
                    size="small"
                    sx={{
                      bgcolor: theme.primary,
                      '&:hover': {
                        bgcolor: theme.primaryDark
                      }
                    }}
                  >
                    加入课程
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderCourseHistory = () => (
    <Box>
      <Typography variant="h6" sx={titleStyle}>
        <HistoryIcon sx={iconStyle} />
        课程记录
      </Typography>
      <Grid container spacing={2}>
        {completedCourses.map((course) => (
          <Grid item xs={12} key={course.id}>
            <Paper sx={cardStyle}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ color: theme.text.primary }}>
                    {course.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" sx={{ color: theme.text.secondary }} />
                      <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                        {course.teacher}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon fontSize="small" sx={{ color: theme.text.secondary }} />
                      <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                        完成于 {course.completionDate}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarIcon fontSize="small" sx={{ color: '#ffa000' }} />
                    <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                      {course.rating}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.text.light }}>
                      {course.feedback}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<DescriptionIcon />}
                  sx={{
                    borderColor: theme.primary,
                    color: theme.primary,
                    '&:hover': {
                      borderColor: theme.primaryDark,
                      backgroundColor: 'rgba(46, 125, 50, 0.08)'
                    }
                  }}
                >
                  查看详情
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderCourseBooking = () => (
    <Box>
      <Typography variant="h6" sx={titleStyle}>
        <BookIcon sx={iconStyle} />
        课程预约
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="搜索课程、老师或日期"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: theme.text.secondary }} />,
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>科目</InputLabel>
          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            label="科目"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.primary
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.primaryLight
              }
            }}
          >
            <MenuItem value="all">全部</MenuItem>
            <MenuItem value="english">英语</MenuItem>
            <MenuItem value="math">数学</MenuItem>
            <MenuItem value="chinese">语文</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{
            borderColor: theme.primary,
            color: theme.primary,
            '&:hover': {
              borderColor: theme.primaryDark,
              backgroundColor: 'rgba(46, 125, 50, 0.08)'
            }
          }}
        >
          更多筛选
        </Button>
      </Box>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={12} md={4} key={course.id}>
            <Paper sx={cardStyle}>
              <Typography variant="h6" gutterBottom sx={{ color: theme.text.primary }}>
                {course.name}
              </Typography>
              <Typography sx={{ color: theme.text.secondary }} gutterBottom>
                教师：{course.teacher}
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ color: theme.text.secondary }}>
                上课时间：{course.schedule}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Box>
                  <Chip
                    label={course.level}
                    color="primary"
                    size="small"
                    sx={{ mr: 1, bgcolor: theme.primary }}
                  />
                  <Chip
                    label={`剩余${course.spots}个名额`}
                    color="secondary"
                    size="small"
                    sx={{ bgcolor: theme.secondary, color: theme.text.secondary }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: theme.primary }} component="span">
                    ¥{course.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      ml: 1,
                      bgcolor: theme.primary,
                      '&:hover': {
                        bgcolor: theme.primaryDark
                      }
                    }}
                    onClick={() => navigate(`/student/courses/${course.id}`)}
                  >
                    预约
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderLearningProgress = () => (
    <Box>
      <Typography variant="h6" sx={titleStyle}>
        <TimelineIcon sx={iconStyle} />
        学习进度
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={cardStyle}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TimelineIcon sx={{ mr: 1, color: theme.primary }} />
              <Typography variant="h6" sx={{ color: theme.text.primary }}>学习统计</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: theme.primary, mb: 1 }}>
                    {learningStats.totalHours}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                    总学习时长（小时）
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: theme.primary, mb: 1 }}>
                    {learningStats.completedCourses}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                    已完成课程
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: theme.primary, mb: 1 }}>
                    {learningStats.upcomingCourses}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                    待上课程
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: theme.primary, mb: 1 }}>
                    {learningStats.averageRating}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                    平均评分
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={cardStyle}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUpIcon sx={{ mr: 1, color: theme.primary }} />
              <Typography variant="h6" sx={{ color: theme.text.primary }}>学习目标</Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: theme.primary }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ color: theme.text.primary }}>
                      完成英语口语课程
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: theme.text.secondary }}>
                      目标：提高口语表达能力
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: theme.primary }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ color: theme.text.primary }}>
                      完成数学竞赛课程
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: theme.text.secondary }}>
                      目标：掌握竞赛解题技巧
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const renderMyBookings = () => (
    <Box>
      <Typography variant="h6" sx={titleStyle}>
        <EventIcon sx={iconStyle} />
        我的预约
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="搜索预约"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: theme.text.secondary }} />,
          }}
        />
      </Box>
      <Grid container spacing={2}>
        {appointments.map((appointment) => (
          <Grid item xs={12} key={appointment.id}>
            <Paper sx={cardStyle}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ color: theme.text.primary }}>
                    {appointment.course}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" sx={{ color: theme.text.secondary }} />
                      <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                        {appointment.teacher}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon fontSize="small" sx={{ color: theme.text.secondary }} />
                      <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                        {appointment.date} {appointment.time}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={appointment.status}
                    color={appointment.status === '已确认' ? 'success' : 'warning'}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                </Box>
                <Box>
                  {appointment.status === '待确认' && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      取消预约
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      borderColor: theme.primary,
                      color: theme.primary,
                      '&:hover': {
                        borderColor: theme.primaryDark,
                        backgroundColor: 'rgba(46, 125, 50, 0.08)'
                      }
                    }}
                  >
                    查看详情
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: theme.background.default }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.primary }}>
            课程管理
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Paper sx={{ p: 3, bgcolor: theme.background.paper }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              centered
              sx={{
                mb: 3,
                '& .MuiTab-root': {
                  color: theme.text.secondary,
                  '&.Mui-selected': {
                    color: theme.primary,
                    fontWeight: 600
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.primary
                }
              }}
            >
              <Tab icon={<CalendarTodayIcon />} label="本周课程" />
              <Tab icon={<HistoryIcon />} label="课程记录" />
              <Tab icon={<BookIcon />} label="课程预约" />
              <Tab icon={<TimelineIcon />} label="学习进度" />
              <Tab icon={<EventIcon />} label="我的预约" />
            </Tabs>

            <Box sx={{ mt: 3 }}>
              {currentTab === 0 && renderWeeklySchedule()}
              {currentTab === 1 && renderCourseHistory()}
              {currentTab === 2 && renderCourseBooking()}
              {currentTab === 3 && renderLearningProgress()}
              {currentTab === 4 && renderMyBookings()}
            </Box>
          </Paper>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#2e7d32' }}>
                个人资料
              </Typography>
              <Button
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                onClick={isEditing ? handleSave : handleEdit}
                sx={{
                  color: isEditing ? '#fff' : '#2e7d32',
                  bgcolor: isEditing ? '#2e7d32' : 'transparent',
                  '&:hover': {
                    bgcolor: isEditing ? '#1b5e20' : 'rgba(46, 125, 50, 0.08)',
                  },
                }}
              >
                {isEditing ? '保存修改' : '编辑资料'}
              </Button>
            </Box>
            <Accordion
              expanded={isEditing}
              onChange={(e, expanded) => setIsEditing(expanded)}
              sx={{
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  display: 'none',
                  '& .MuiAccordionSummary-content': {
                    margin: 0,
                  }
                }}
              >
                <Typography variant="h6" sx={{ color: '#2e7d32' }}>
                  编辑个人资料
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon sx={{ color: '#2e7d32' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="姓名"
                      secondary={
                        isEditing ? (
                          <TextField
                            fullWidth
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                            size="small"
                          />
                        ) : (
                          userInfo.name
                        )
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon sx={{ color: '#2e7d32' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="英文名"
                      secondary={
                        isEditing ? (
                          <TextField
                            fullWidth
                            value={userInfo.englishName}
                            onChange={(e) => setUserInfo({ ...userInfo, englishName: e.target.value })}
                            size="small"
                          />
                        ) : (
                          userInfo.englishName
                        )
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon sx={{ color: '#2e7d32' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="手机号"
                      secondary={
                        isEditing ? (
                          <TextField
                            fullWidth
                            value={userInfo.phone}
                            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                            size="small"
                          />
                        ) : (
                          userInfo.phone
                        )
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon sx={{ color: '#2e7d32' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="学校"
                      secondary={
                        isEditing ? (
                          <TextField
                            fullWidth
                            value={userInfo.school}
                            onChange={(e) => setUserInfo({ ...userInfo, school: e.target.value })}
                            size="small"
                          />
                        ) : (
                          userInfo.school
                        )
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon sx={{ color: '#2e7d32' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="年级"
                      secondary={
                        isEditing ? (
                          <FormControl fullWidth size="small">
                            <Select
                              value={userInfo.grade}
                              onChange={(e) => setUserInfo({ ...userInfo, grade: e.target.value })}
                            >
                              <MenuItem value="初一">初一</MenuItem>
                              <MenuItem value="初二">初二</MenuItem>
                              <MenuItem value="初三">初三</MenuItem>
                              <MenuItem value="高一">高一</MenuItem>
                              <MenuItem value="高二">高二</MenuItem>
                              <MenuItem value="高三">高三</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          userInfo.grade
                        )
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon sx={{ color: '#2e7d32' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="爱好"
                      secondary={
                        isEditing ? (
                          <TextField
                            fullWidth
                            value={userInfo.hobbies}
                            onChange={(e) => setUserInfo({ ...userInfo, hobbies: e.target.value })}
                            size="small"
                            placeholder="请输入爱好，用顿号分隔"
                          />
                        ) : (
                          userInfo.hobbies
                        )
                      }
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
              我的关注
            </Typography>
            <Grid container spacing={2}>
              {followedTeachers.map((teacher) => (
                <Grid item xs={12} sm={6} md={4} key={teacher.id}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '&:hover': {
                        boxShadow: 3,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s'
                      }
                    }}
                  >
                    <Avatar
                      src={teacher.avatar}
                      sx={{
                        width: 80,
                        height: 80,
                        mb: 1,
                        border: '2px solid #e8f5e9'
                      }}
                    />
                    <Typography variant="h6" sx={{ color: '#2D5A27', mb: 0.5 }}>
                      {teacher.name}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                      {teacher.subject}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {teacher.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
              账号安全
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LockIcon sx={{ color: '#2e7d32' }} />
                </ListItemIcon>
                <ListItemText
                  primary="修改密码"
                  secondary="定期修改密码可以提高账号安全性"
                />
                <Button
                  variant="outlined"
                  onClick={handlePasswordChange}
                  sx={{
                    color: '#2e7d32',
                    borderColor: '#2e7d32',
                    '&:hover': {
                      borderColor: '#1b5e20',
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    },
                  }}
                >
                  修改
                </Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon sx={{ color: '#2e7d32' }} />
                </ListItemIcon>
                <ListItemText
                  primary="消息通知"
                  secondary="管理您的消息通知设置"
                />
                <Button
                  variant="outlined"
                  sx={{
                    color: '#2e7d32',
                    borderColor: '#2e7d32',
                    '&:hover': {
                      borderColor: '#1b5e20',
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    },
                  }}
                >
                  设置
                </Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <HelpIcon sx={{ color: '#2e7d32' }} />
                </ListItemIcon>
                <ListItemText
                  primary="帮助中心"
                  secondary="查看常见问题和使用帮助"
                />
                <Button
                  variant="outlined"
                  sx={{
                    color: '#2e7d32',
                    borderColor: '#2e7d32',
                    '&:hover': {
                      borderColor: '#1b5e20',
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    },
                  }}
                >
                  查看
                </Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: '#f44336' }} />
                </ListItemIcon>
                <ListItemText
                  primary="退出登录"
                  secondary="安全退出您的账号"
                />
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    color: '#f44336',
                    borderColor: '#f44336',
                    '&:hover': {
                      borderColor: '#d32f2f',
                      backgroundColor: 'rgba(244, 67, 54, 0.08)',
                    },
                  }}
                >
                  退出
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Box>

        <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
          <DialogTitle>修改密码</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="当前密码"
              type="password"
              fullWidth
            />
            <TextField
              margin="dense"
              label="新密码"
              type="password"
              fullWidth
            />
            <TextField
              margin="dense"
              label="确认新密码"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPasswordDialog(false)}>取消</Button>
            <Button
              onClick={() => {
                setOpenPasswordDialog(false);
                setSnackbar({
                  open: true,
                  message: '密码修改成功！',
                  severity: 'success'
                });
              }}
              variant="contained"
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20',
                },
              }}
            >
              确认修改
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default StudentProfile; 