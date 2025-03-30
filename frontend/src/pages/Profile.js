import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  styled,
  Paper,
  IconButton,
  Badge,
  Rating,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Link,
  CircularProgress,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Edit as EditIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  CalendarToday,
  VideoCall,
  Assignment,
  Book,
  Grade,
  Notifications,
  Settings,
  Lock,
  Download,
  Delete,
  AccessTime,
  CheckCircle,
  Cancel,
  Warning,
  CloudDownload,
  CloudUpload,
  Comment,
  Star,
  StarBorder,
  Visibility,
  VisibilityOff,
  Add,
  Close,
  LocalOffer,
  Timer,
  Remove,
  Event,
} from '@mui/icons-material';
import {
  BookingsPanel,
  MaterialsPanel,
  FeedbackPanel,
  NotificationsPanel,
  AccountPanel,
} from '../components/ProfileTabs';
import { getMyBookings, cancelBooking } from '../services/studentApi';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  height: '100%',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const [value, setValue] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data - In a real app, this would come from an API
  const [personalInfo, setPersonalInfo] = useState({
    name: '张三',
    age: '16',
    grade: '高中一年级',
    currentTextbook: '新概念英语第二册',
    avatar: '/avatar.jpg',
  });

  const [courseInfo] = useState({
    totalHours: 100,
    usedHours: 45,
    remainingHours: 55,
    points: {
      total: 500,
      available: 300,
      history: [
        {
          id: 1,
          type: 'earn',
          amount: 100,
          description: '完成课程奖励',
          date: '2024-03-15',
        },
        {
          id: 2,
          type: 'use',
          amount: -50,
          description: '兑换学习资料',
          date: '2024-03-16',
        },
      ],
    },
  });

  const [schedule] = useState([
    {
      id: 1,
      date: '2024-03-20',
      time: '14:00-15:00',
      teacher: '李老师',
      courseType: '英语口语',
      status: 'confirmed',
      classroomId: '123456',
      classInLink: 'https://classin.com/join/123456',
    },
    {
      id: 2,
      date: '2024-03-22',
      time: '15:00-16:00',
      teacher: '王老师',
      courseType: '阅读理解',
      status: 'pending',
    },
    {
      id: 3,
      date: '2024-03-25',
      time: '16:00-17:00',
      teacher: '张老师',
      courseType: '写作',
      status: 'confirmed',
      classroomId: '789012',
      classInLink: 'https://classin.com/join/789012',
    },
    {
      id: 4,
      date: '2024-03-27',
      time: '14:00-15:00',
      teacher: '刘老师',
      courseType: '听力',
      status: 'confirmed',
      classroomId: '345678',
      classInLink: 'https://classin.com/join/345678',
    },
  ]);

  // 获取预约列表
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getMyBookings();
      console.log('Fetched bookings:', data);
      setBookings(data);
    } catch (error) {
      console.error('获取预约列表失败:', error);
      setSnackbar({
        open: true,
        message: '获取预约列表失败',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // 取消预约
  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setSnackbar({
        open: true,
        message: '预约已取消',
        severity: 'success'
      });
      // 重新获取预约列表
      fetchBookings();
    } catch (error) {
      console.error('取消预约失败:', error);
      setSnackbar({
        open: true,
        message: '取消预约失败',
        severity: 'error'
      });
    }
  };

  // 当切换到"我的预约"标签页时获取数据
  useEffect(() => {
    if (value === 3) { // 3 是"我的预约"标签页的新索引
      fetchBookings();
    }
  }, [value]);

  const [materials] = useState([
    {
      id: 1,
      title: '英语口语练习材料',
      type: 'PDF',
      uploadDate: '2024-03-15',
      size: '2.5MB',
    },
    {
      id: 2,
      title: '阅读理解技巧总结',
      type: 'DOC',
      uploadDate: '2024-03-16',
      size: '1.8MB',
    },
  ]);

  const [feedback] = useState([
    {
      id: 1,
      teacher: '李老师',
      courseType: '英语口语',
      rating: 5,
      content: '发音准确，表达流畅，继续保持！',
      date: '2024-03-15',
    },
    {
      id: 2,
      teacher: '王老师',
      courseType: '阅读理解',
      rating: 4,
      content: '理解能力有提升，建议多练习长难句。',
      date: '2024-03-16',
    },
  ]);

  const [notifications] = useState([
    {
      id: 1,
      title: '课程提醒',
      content: '您有一节英语口语课程将在30分钟后开始',
      date: '2024-03-20 13:30',
      read: false,
    },
    {
      id: 2,
      title: '作业提醒',
      content: '新的阅读理解作业已发布',
      date: '2024-03-19 15:00',
      read: true,
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditProfile = () => {
    setOpenEditDialog(true);
  };

  const handleSaveProfile = () => {
    setOpenEditDialog(false);
    setSnackbar({
      open: true,
      message: '个人信息已更新',
      severity: 'success',
    });
  };

  const handleChangePassword = () => {
    setOpenPasswordDialog(true);
  };

  const handleSavePassword = () => {
    setOpenPasswordDialog(false);
    setSnackbar({
      open: true,
      message: '密码已更新',
      severity: 'success',
    });
  };

  const handleNotificationRead = (notificationId) => {
    // Handle marking notification as read
    setSnackbar({
      open: true,
      message: '通知已标记为已读',
      severity: 'success',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            aria-label="profile tabs"
          >
            <Tab label="个人信息" />
            <Tab label="学习资料" />
            <Tab label="课程反馈" />
            <Tab label="我的预约" />
            <Tab label="通知中心" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          {/* 个人信息面板 */}
          <AccountPanel onEditProfile={() => setOpenEditDialog(true)} onChangePassword={() => setOpenPasswordDialog(true)} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          {/* 学习资料面板 */}
          <MaterialsPanel materials={materials} homework={[]} />
        </TabPanel>

        <TabPanel value={value} index={2}>
          {/* 课程反馈面板 */}
          <FeedbackPanel feedback={feedback} />
        </TabPanel>

        <TabPanel value={value} index={3}>
          {/* 我的预约面板 */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress />
            </Box>
          ) : (
            <BookingsPanel
              bookings={bookings.map(booking => ({
                id: booking.id,
                courseType: booking.course.title,
                teacherName: booking.course.teacher.username,
                date: new Date(booking.schedule.start_time).toLocaleDateString(),
                time: `${new Date(booking.schedule.start_time).toLocaleTimeString()} - ${new Date(booking.schedule.end_time).toLocaleTimeString()}`,
                status: booking.status
              }))}
              onCancelBooking={handleCancelBooking}
            />
          )}
        </TabPanel>

        <TabPanel value={value} index={4}>
          {/* 通知中心面板 */}
          <NotificationsPanel notifications={[]} onNotificationRead={() => { }} />
        </TabPanel>
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>编辑个人资料</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="姓名"
            fullWidth
            defaultValue={personalInfo.name}
          />
          <TextField
            margin="dense"
            label="年龄"
            fullWidth
            defaultValue={personalInfo.age}
          />
          <TextField
            margin="dense"
            label="年级"
            fullWidth
            defaultValue={personalInfo.grade}
          />
          <TextField
            margin="dense"
            label="当前教材"
            fullWidth
            defaultValue={personalInfo.currentTextbook}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>取消</Button>
          <Button onClick={handleSaveProfile} variant="contained">保存</Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>修改密码</DialogTitle>
        <DialogContent>
          <TextField
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
          <Button onClick={handleSavePassword} variant="contained">保存</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile; 