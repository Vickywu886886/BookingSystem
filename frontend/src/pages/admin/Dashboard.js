import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  Avatar,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  AppBar,
  Toolbar,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Book as BookIcon,
  Event as EventIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  CalendarToday as CalendarTodayIcon,
  FileUpload as FileUploadIcon,
  BarChart as BarChartIcon,
  Security as SecurityIcon,
  Logout as LogoutIcon,
  List as ListIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { logout } from '../../services/authApi';

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

// 模拟数据
const mockData = {
  teachers: {
    total: 25,
    active: 20,
    todayClasses: 45,
    recentActivity: [
      { id: 1, name: '张老师', action: '上传了新教案', time: '10分钟前' },
      { id: 2, name: '李老师', action: '更新了课程安排', time: '30分钟前' },
    ],
    teacherDetails: {
      students: [
        { id: 1, name: '王同学', level: '初中', progress: '良好' },
        { id: 2, name: '李同学', level: '高中', progress: '优秀' },
      ],
      schedule: [
        { day: '周一', time: '14:00-15:30', student: '王同学', course: '英语口语' },
        { day: '周二', time: '16:00-17:30', student: '李同学', course: '英语写作' },
      ],
      leaveRecords: [
        { date: '2024-03-15', type: '病假', status: '已批准', replacement: '张老师' },
        { date: '2024-03-20', type: '事假', status: '待审批', replacement: null },
      ],
      feedback: [
        { student: '王同学', rating: 5, comment: '教学认真，讲解清晰', date: '2024-03-10' },
        { student: '李同学', rating: 4.5, comment: '课堂互动很好', date: '2024-03-12' },
      ],
      salary: {
        currentMonth: {
          hours: 45,
          income: 9000,
          average: 200,
        },
        history: [
          { month: '2024-02', hours: 40, income: 8000 },
          { month: '2024-01', hours: 42, income: 8400 },
        ],
      },
      resources: [
        { name: '英语口语教案', type: '教案', language: '英语', level: '初中' },
        { name: '写作技巧总结', type: '课件', language: '英语', level: '高中' },
      ],
      notifications: [
        { type: 'course', title: '课程调整', content: '下周一课程时间调整为15:00-16:30', date: '2024-03-15' },
        { type: 'leave', title: '请假申请', content: '张老师申请3月20日请假', date: '2024-03-14' },
      ],
      assessment: {
        rating: 4.8,
        training: [
          { name: '教学方法培训', status: '已完成', date: '2024-02-15' },
          { name: '新课程开发', status: '进行中', date: '2024-03-01' },
        ],
        certificates: [
          { name: 'TEFL证书', date: '2023-12-01', validUntil: '2026-12-01' },
          { name: '高级教师资格证', date: '2023-10-01', validUntil: '2026-10-01' },
        ],
      },
    },
  },
  students: {
    total: 150,
    active: 120,
    todayClasses: 80,
    recentActivity: [
      { id: 1, name: '王同学', action: '预约了新课程', time: '5分钟前' },
      { id: 2, name: '刘同学', action: '提交了作业', time: '15分钟前' },
    ]
  },
  courses: {
    total: 200,
    completed: 180,
    cancelled: 20,
    weeklyStats: [
      { name: '周一', value: 25 },
      { name: '周二', value: 30 },
      { name: '周三', value: 28 },
      { name: '周四', value: 35 },
      { name: '周五', value: 32 },
      { name: '周六', value: 40 },
      { name: '周日', value: 38 },
    ]
  },
  notifications: [
    { id: 1, type: 'booking', title: '新课程预约', content: '3个待处理预约', time: '10分钟前' },
    { id: 2, type: 'material', title: '教学资料审核', content: '5个待审核资料', time: '30分钟前' },
    { id: 3, type: 'complaint', title: '投诉处理', content: '2个新投诉', time: '1小时前' },
  ]
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  // 菜单到标签页的映射
  const menuToTabMap = {
    'dashboard': 0,
    'courses': 1,
    'teachers': 2,
    'students': 3,
    'materials': 4,
    'bookings': 5,
    'analytics': 6,
    'settings': 7
  };

  // 标签页到菜单的映射
  const tabToMenuMap = {
    0: 'dashboard',
    1: 'courses',
    2: 'teachers',
    3: 'students',
    4: 'materials',
    5: 'bookings',
    6: 'analytics',
    7: 'settings'
  };

  // 标签页标题映射
  const tabLabels = [
    { icon: <DashboardIcon />, label: '仪表板' },
    { icon: <SchoolIcon />, label: '课程管理' },
    { icon: <GroupIcon />, label: '教师管理' },
    { icon: <PeopleIcon />, label: '学生管理' },
    { icon: <BookIcon />, label: '教学资料' },
    { icon: <EventIcon />, label: '预约管理' },
    { icon: <AssessmentIcon />, label: '数据分析' },
    { icon: <SettingsIcon />, label: '系统设置' }
  ];

  useEffect(() => {
    const menu = searchParams.get('menu');
    if (menu) {
      setSelectedMenu(menu);
      // 同步更新 currentTab
      if (menuToTabMap[menu] !== undefined) {
        setCurrentTab(menuToTabMap[menu]);
      }
    } else {
      // 如果没有菜单参数，默认显示仪表板
      setSelectedMenu('dashboard');
      setCurrentTab(0);
    }
  }, [searchParams]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    // 根据标签页更新菜单参数
    const menu = tabToMenuMap[newValue];
    if (menu) {
      navigate(`/admin/dashboard?menu=${menu}`);
    }
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
  };

  // 渲染仪表板概览
  const renderDashboard = () => (
    <Box>
      {/* 待处理提醒 */}
      <Card sx={{ ...cardStyle, mb: 4 }}>
        <CardContent>
          <Box sx={titleStyle}>
            <NotificationsIcon />
            <Typography variant="h5">待处理提醒</Typography>
          </Box>
          <Grid container spacing={2}>
            {mockData.notifications.map((notification, index) => (
              <Grid item xs={12} md={4} key={notification.id}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    bgcolor: 'background.default',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <Box sx={{ 
                    mr: 2, 
                    p: 1, 
                    borderRadius: 1, 
                    bgcolor: notification.type === 'booking' ? 'primary.light' : 
                             notification.type === 'material' ? 'info.light' : 'error.light',
                    color: 'white'
                  }}>
                    {notification.type === 'booking' ? <EventIcon /> :
                     notification.type === 'material' ? <FileUploadIcon /> : <WarningIcon />}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notification.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* 数据概览卡片 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(46, 125, 50, 0.1)', mr: 2 }}>
                  <GroupIcon sx={{ color: theme.primary }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: theme.primary }}>
                    {mockData.teachers.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    教师总数
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                活跃教师：{mockData.teachers.active}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                今日排课：{mockData.teachers.todayClasses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(46, 125, 50, 0.1)', mr: 2 }}>
                  <PeopleIcon sx={{ color: theme.primary }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: theme.primary }}>
                    {mockData.students.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    学生总数
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                活跃学生：{mockData.students.active}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                今日课程：{mockData.students.todayClasses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(46, 125, 50, 0.1)', mr: 2 }}>
                  <SchoolIcon sx={{ color: theme.primary }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: theme.primary }}>
                    {mockData.courses.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    课程总数
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                已完成：{mockData.courses.completed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                已取消：{mockData.courses.cancelled}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(46, 125, 50, 0.1)', mr: 2 }}>
                  <NotificationsIcon sx={{ color: theme.primary }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: theme.primary }}>
                    {mockData.notifications.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    待处理提醒
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                预约请求：3个
              </Typography>
              <Typography variant="body2" color="text.secondary">
                资料审核：5个
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 图表区域 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: theme.primary }}>
                本周课程统计
              </Typography>
              <LineChart
                width={700}
                height={300}
                data={mockData.courses.weeklyStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke={theme.primary} />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: theme.primary }}>
                课程完成情况
              </Typography>
              <PieChart width={300} height={300}>
                <Pie
                  data={[
                    { name: '已完成', value: mockData.courses.completed },
                    { name: '已取消', value: mockData.courses.cancelled }
                  ]}
                  cx={150}
                  cy={150}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill={theme.success} />
                  <Cell fill={theme.error} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  // 渲染课程管理
  const renderCourseManagement = () => (
    <Box>
      {/* 顶部筛选栏 */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="搜索课程..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              select
              label="状态"
              defaultValue="all"
              SelectProps={{
                native: true,
              }}
            >
              <option value="all">全部状态</option>
              <option value="pending">待上课</option>
              <option value="completed">已完成</option>
              <option value="cancelled">已取消</option>
              <option value="rescheduled">已调课</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              select
              label="教师"
              defaultValue="all"
              SelectProps={{
                native: true,
              }}
            >
              <option value="all">全部教师</option>
              <option value="teacher1">张老师</option>
              <option value="teacher2">李老师</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              select
              label="年级"
              defaultValue="all"
              SelectProps={{
                native: true,
              }}
            >
              <option value="all">全部年级</option>
              <option value="grade1">一年级</option>
              <option value="grade2">二年级</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('addCourse')}
              sx={{ bgcolor: theme.primary }}
            >
              添加课程
            </Button>
            <Button
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              onClick={() => setViewMode('calendar')}
              sx={{ borderColor: theme.primary, color: theme.primary }}
            >
              日历视图
            </Button>
            <Button
              variant="outlined"
              startIcon={<ListIcon />}
              onClick={() => setViewMode('list')}
              sx={{ borderColor: theme.primary, color: theme.primary }}
            >
              列表视图
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* 请假调课管理卡片 */}
      <Card sx={{ ...cardStyle, mb: 3 }}>
        <CardContent>
          <Box sx={titleStyle}>
            <EventIcon />
            <Typography variant="h5">请假调课管理</Typography>
          </Box>
          <Grid container spacing={3}>
            {/* 待处理请假申请 */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: theme.primary }}>
                待处理请假申请
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.warning }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="张老师"
                    secondary="2024-03-20 请假申请"
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      color="success"
                      onClick={() => handleOpenDialog('approveLeave')}
                    >
                      批准
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleOpenDialog('rejectLeave')}
                    >
                      拒绝
                    </Button>
                  </Box>
                </ListItem>
              </List>
            </Grid>

            {/* 待处理调课申请 */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: theme.primary }}>
                待处理调课申请
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.info }}>
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="李老师 - 英语口语课"
                    secondary="申请调至 2024-03-21 14:00"
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      color="success"
                      onClick={() => handleOpenDialog('approveReschedule')}
                    >
                      批准
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleOpenDialog('rejectReschedule')}
                    >
                      拒绝
                    </Button>
                  </Box>
                </ListItem>
              </List>
            </Grid>

            {/* 请假记录统计 */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: theme.primary }}>
                本月请假统计
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>教师</TableCell>
                      <TableCell>请假天数</TableCell>
                      <TableCell>已批准</TableCell>
                      <TableCell>待审批</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>张老师</TableCell>
                      <TableCell>2天</TableCell>
                      <TableCell>1天</TableCell>
                      <TableCell>1天</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>李老师</TableCell>
                      <TableCell>1天</TableCell>
                      <TableCell>1天</TableCell>
                      <TableCell>0天</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* 调课记录统计 */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: theme.primary }}>
                本月调课统计
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>教师</TableCell>
                      <TableCell>调课次数</TableCell>
                      <TableCell>已批准</TableCell>
                      <TableCell>待审批</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>张老师</TableCell>
                      <TableCell>3次</TableCell>
                      <TableCell>2次</TableCell>
                      <TableCell>1次</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>李老师</TableCell>
                      <TableCell>1次</TableCell>
                      <TableCell>1次</TableCell>
                      <TableCell>0次</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 课程列表/日历视图 */}
      <Card sx={cardStyle}>
        <CardContent>
          <Box sx={titleStyle}>
            <SchoolIcon />
            <Typography variant="h5">课程管理</Typography>
          </Box>
          
          {viewMode === 'list' ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>课程名称</TableCell>
                    <TableCell>教师</TableCell>
                    <TableCell>学生</TableCell>
                    <TableCell>日期时间</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* 这里添加课程列表数据 */}
                  <TableRow>
                    <TableCell>英语口语课</TableCell>
                    <TableCell>张老师</TableCell>
                    <TableCell>王同学</TableCell>
                    <TableCell>2024-03-20 14:00</TableCell>
                    <TableCell>
                      <Chip 
                        label="待上课" 
                        color="primary" 
                        size="small"
                        sx={{ bgcolor: theme.primaryLight, color: 'white' }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" sx={{ color: theme.primary }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: theme.error }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ mt: 2 }}>
              {/* 这里添加日历视图组件 */}
              <Typography variant="body1" color="text.secondary">
                日历视图开发中...
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );

  // 渲染教师管理
  const renderTeacherManagement = () => (
    <Box>
      {/* 顶部操作栏 */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="搜索教师..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              select
              label="状态"
              defaultValue="all"
              SelectProps={{
                native: true,
              }}
            >
              <option value="all">全部状态</option>
              <option value="active">在职</option>
              <option value="inactive">停用</option>
              <option value="leave">请假</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              select
              label="语言"
              defaultValue="all"
              SelectProps={{
                native: true,
              }}
            >
              <option value="all">全部语言</option>
              <option value="english">英语</option>
              <option value="french">法语</option>
              <option value="spanish">西班牙语</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              select
              label="身份"
              defaultValue="all"
              SelectProps={{
                native: true,
              }}
            >
              <option value="all">全部身份</option>
              <option value="chinese">中教</option>
              <option value="foreign">外教</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('addTeacher')}
              sx={{ bgcolor: theme.primary }}
            >
              添加教师
            </Button>
            <Button
              variant="outlined"
              startIcon={<FileUploadIcon />}
              onClick={() => handleOpenDialog('importTeachers')}
              sx={{ borderColor: theme.primary, color: theme.primary }}
            >
              批量导入
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* 教师列表 */}
      <Grid container spacing={3}>
        {/* 左侧教师卡片列表 */}
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={titleStyle}>
                <GroupIcon />
                <Typography variant="h5">教师列表</Typography>
              </Box>
              <List>
                {[1, 2, 3].map((teacher) => (
                  <ListItem
                    key={teacher}
                    button
                    selected={selectedTeacher === teacher}
                    onClick={() => setSelectedTeacher(teacher)}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.light',
                        '&:hover': {
                          bgcolor: 'primary.light',
                        },
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.primary }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="张老师"
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label="英语" 
                            size="small" 
                            sx={{ bgcolor: theme.primaryLight, color: 'white' }}
                          />
                          <Chip 
                            label="中教" 
                            size="small" 
                            sx={{ bgcolor: theme.info, color: 'white' }}
                          />
                        </Box>
                      }
                    />
                    <Chip 
                      label="在职" 
                      size="small" 
                      color="success"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* 右侧教师详情 */}
        <Grid item xs={12} md={8}>
          {selectedTeacher ? (
            <Box>
              {/* 基本信息卡片 */}
              <Card sx={{ ...cardStyle, mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ color: theme.primary }}>
                        张老师
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: 10001
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        size="small"
                        sx={{ borderColor: theme.primary, color: theme.primary }}
                      >
                        编辑信息
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<SecurityIcon />}
                        size="small"
                        sx={{ borderColor: theme.primary, color: theme.primary }}
                      >
                        账号管理
                      </Button>
                    </Box>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        邮箱：teacher@example.com
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        电话：13800138000
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        入职时间：2024-01-01
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        状态：在职
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* 课程与学生管理卡片 */}
              <Card sx={{ ...cardStyle, mb: 3 }}>
                <CardContent>
                  <Box sx={titleStyle}>
                    <SchoolIcon />
                    <Typography variant="h5">课程与学生管理</Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        负责学生
                      </Typography>
                      <List>
                        {mockData.teachers.teacherDetails.students.map((student) => (
                          <ListItem key={student.id}>
                            <ListItemText
                              primary={student.name}
                              secondary={`${student.level} | 学习进度：${student.progress}`}
                            />
                            <Button
                              size="small"
                              sx={{ color: theme.primary }}
                              onClick={() => handleOpenDialog('viewStudent', student)}
                            >
                              查看详情
                            </Button>
                          </ListItem>
                        ))}
                      </List>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        size="small"
                        sx={{ mt: 1, borderColor: theme.primary, color: theme.primary }}
                        onClick={() => handleOpenDialog('assignStudent')}
                      >
                        分配新学生
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        课程安排
                      </Typography>
                      <List>
                        {mockData.teachers.teacherDetails.schedule.map((course, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={course.course}
                              secondary={`${course.day} ${course.time} | ${course.student}`}
                            />
                            <IconButton
                              size="small"
                              sx={{ color: theme.primary }}
                              onClick={() => handleOpenDialog('editSchedule', course)}
                            >
                              <EditIcon />
                            </IconButton>
                          </ListItem>
                        ))}
                      </List>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        size="small"
                        sx={{ mt: 1, borderColor: theme.primary, color: theme.primary }}
                        onClick={() => handleOpenDialog('addSchedule')}
                      >
                        添加课程
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* 请假与调课管理卡片 */}
              <Card sx={{ ...cardStyle, mb: 3 }}>
                <CardContent>
                  <Box sx={titleStyle}>
                    <EventIcon />
                    <Typography variant="h5">请假与调课管理</Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        请假记录
                      </Typography>
                      <List>
                        {mockData.teachers.teacherDetails.leaveRecords.map((record, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={`${record.date} ${record.type}`}
                              secondary={`状态：${record.status}${record.replacement ? ` | 代课：${record.replacement}` : ''}`}
                            />
                            {record.status === '待审批' && (
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  size="small"
                                  color="success"
                                  onClick={() => handleOpenDialog('approveLeave', record)}
                                >
                                  批准
                                </Button>
                                <Button
                                  size="small"
                                  color="error"
                                  onClick={() => handleOpenDialog('rejectLeave', record)}
                                >
                                  拒绝
                                </Button>
                              </Box>
                            )}
                          </ListItem>
                        ))}
                      </List>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        size="small"
                        sx={{ mt: 1, borderColor: theme.primary, color: theme.primary }}
                        onClick={() => handleOpenDialog('newLeave')}
                      >
                        新建请假
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        空闲时间设置
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        <Chip label="周一 上午" />
                        <Chip label="周二 下午" />
                        <Chip label="周三 全天" />
                      </Box>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        size="small"
                        sx={{ borderColor: theme.primary, color: theme.primary }}
                        onClick={() => handleOpenDialog('editAvailability')}
                      >
                        编辑空闲时间
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* 教学评价卡片 */}
              <Card sx={{ ...cardStyle, mb: 3 }}>
                <CardContent>
                  <Box sx={titleStyle}>
                    <AssessmentIcon />
                    <Typography variant="h5">教学评价</Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        评分统计
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="h4" sx={{ color: theme.primary }}>
                          {mockData.teachers.teacherDetails.assessment.rating}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          / 5.0
                        </Typography>
                      </Box>
                      <Typography variant="subtitle2" gutterBottom>
                        最近评价
                      </Typography>
                      <List>
                        {mockData.teachers.teacherDetails.feedback.map((item, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={item.student}
                              secondary={item.comment}
                            />
                            <Chip 
                              label={item.rating} 
                              size="small" 
                              color="success"
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        培训与证书
                      </Typography>
                      <List>
                        {mockData.teachers.teacherDetails.assessment.training.map((item, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={item.name}
                              secondary={`状态：${item.status} | 日期：${item.date}`}
                            />
                            <Chip 
                              label={item.status} 
                              size="small" 
                              color={item.status === '已完成' ? 'success' : 'primary'}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        证书
                      </Typography>
                      <List>
                        {mockData.teachers.teacherDetails.assessment.certificates.map((cert, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={cert.name}
                              secondary={`有效期至：${cert.validUntil}`}
                            />
                            <Chip 
                              label="有效" 
                              size="small" 
                              color="success"
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* 薪资与工时管理卡片 */}
              <Card sx={{ ...cardStyle, mb: 3 }}>
                <CardContent>
                  <Box sx={titleStyle}>
                    <TrendingUpIcon />
                    <Typography variant="h5">薪资与工时管理</Typography>
                  </Box>
                  <Grid container spacing={3}>
                    {/* 本月概览 */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom sx={{ color: theme.primary }}>
                        本月概览
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Typography variant="body2" color="text.secondary">
                              总课时数
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.primary }}>
                              {mockData.teachers.teacherDetails.salary.currentMonth.hours} 课时
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Typography variant="body2" color="text.secondary">
                              总薪资
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.primary }}>
                              ¥{mockData.teachers.teacherDetails.salary.currentMonth.income}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Typography variant="body2" color="text.secondary">
                              平均课时费
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.primary }}>
                              ¥{mockData.teachers.teacherDetails.salary.currentMonth.average}/课时
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Typography variant="body2" color="text.secondary">
                              出勤率
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.primary }}>
                              98%
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* 薪资明细 */}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ color: theme.primary }}>
                          薪资明细
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<FileUploadIcon />}
                          sx={{ borderColor: theme.primary, color: theme.primary }}
                          onClick={() => handleOpenDialog('exportSalary')}
                        >
                          导出明细
                        </Button>
                      </Box>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>日期</TableCell>
                              <TableCell>课时数</TableCell>
                              <TableCell>课时费</TableCell>
                              <TableCell>小计</TableCell>
                              <TableCell>备注</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>2024-03-20</TableCell>
                              <TableCell>4</TableCell>
                              <TableCell>¥200</TableCell>
                              <TableCell>¥800</TableCell>
                              <TableCell>正常课时</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2024-03-19</TableCell>
                              <TableCell>3</TableCell>
                              <TableCell>¥200</TableCell>
                              <TableCell>¥600</TableCell>
                              <TableCell>正常课时</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2024-03-18</TableCell>
                              <TableCell>2</TableCell>
                              <TableCell>¥250</TableCell>
                              <TableCell>¥500</TableCell>
                              <TableCell>周末加价</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>

                    {/* 工时统计 */}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ color: theme.primary }}>
                          工时统计
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<CalendarTodayIcon />}
                          sx={{ borderColor: theme.primary, color: theme.primary }}
                          onClick={() => handleOpenDialog('viewSchedule')}
                        >
                          查看排课
                        </Button>
                      </Box>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>时间段</TableCell>
                              <TableCell>课时数</TableCell>
                              <TableCell>占比</TableCell>
                              <TableCell>状态</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>上午 (8:00-12:00)</TableCell>
                              <TableCell>12</TableCell>
                              <TableCell>30%</TableCell>
                              <TableCell>
                                <Chip label="正常" size="small" color="success" />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>下午 (13:00-17:00)</TableCell>
                              <TableCell>20</TableCell>
                              <TableCell>50%</TableCell>
                              <TableCell>
                                <Chip label="正常" size="small" color="success" />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>晚上 (18:00-22:00)</TableCell>
                              <TableCell>8</TableCell>
                              <TableCell>20%</TableCell>
                              <TableCell>
                                <Chip label="正常" size="small" color="success" />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>

                    {/* 薪资报表 */}
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ color: theme.primary }}>
                          薪资报表
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<FileUploadIcon />}
                            sx={{ borderColor: theme.primary, color: theme.primary }}
                            onClick={() => handleOpenDialog('exportMonthlyReport')}
                          >
                            导出月报
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<FileUploadIcon />}
                            sx={{ borderColor: theme.primary, color: theme.primary }}
                            onClick={() => handleOpenDialog('exportQuarterlyReport')}
                          >
                            导出季报
                          </Button>
                        </Box>
                      </Box>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>月份</TableCell>
                              <TableCell>课时数</TableCell>
                              <TableCell>总薪资</TableCell>
                              <TableCell>平均课时费</TableCell>
                              <TableCell>出勤率</TableCell>
                              <TableCell>加班费</TableCell>
                              <TableCell>其他补贴</TableCell>
                              <TableCell>实发薪资</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {mockData.teachers.teacherDetails.salary.history.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.month}</TableCell>
                                <TableCell>{item.hours}</TableCell>
                                <TableCell>¥{item.income}</TableCell>
                                <TableCell>¥{item.income / item.hours}</TableCell>
                                <TableCell>98%</TableCell>
                                <TableCell>¥0</TableCell>
                                <TableCell>¥0</TableCell>
                                <TableCell>¥{item.income}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>

                    {/* 薪资设置 */}
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ color: theme.primary }}>
                          薪资设置
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EditIcon />}
                          sx={{ borderColor: theme.primary, color: theme.primary }}
                          onClick={() => handleOpenDialog('editSalarySettings')}
                        >
                          编辑设置
                        </Button>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Typography variant="body2" color="text.secondary">
                              基础课时费
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.primary }}>
                              ¥200/课时
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Typography variant="body2" color="text.secondary">
                              周末加价
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.primary }}>
                              ¥50/课时
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Typography variant="body2" color="text.secondary">
                              节假日加价
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.primary }}>
                              ¥100/课时
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* 教学资源管理卡片 */}
              <Card sx={{ ...cardStyle, mb: 3 }}>
                <CardContent>
                  <Box sx={titleStyle}>
                    <BookIcon />
                    <Typography variant="h5">教学资源管理</Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="subtitle2">
                          资源列表
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          size="small"
                          sx={{ borderColor: theme.primary, color: theme.primary }}
                          onClick={() => handleOpenDialog('addResource')}
                        >
                          上传资源
                        </Button>
                      </Box>
                      <List>
                        {mockData.teachers.teacherDetails.resources.map((resource, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={resource.name}
                              secondary={`${resource.type} | ${resource.language} | ${resource.level}`}
                            />
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton size="small" sx={{ color: theme.primary }}>
                                <EditIcon />
                              </IconButton>
                              <IconButton size="small" sx={{ color: theme.error }}>
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* 通知与消息卡片 */}
              <Card sx={cardStyle}>
                <CardContent>
                  <Box sx={titleStyle}>
                    <NotificationsIcon />
                    <Typography variant="h5">通知与消息</Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <List>
                        {mockData.teachers.teacherDetails.notifications.map((notification, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              {notification.type === 'course' ? <EventIcon /> : <WarningIcon />}
                            </ListItemIcon>
                            <ListItemText
                              primary={notification.title}
                              secondary={`${notification.content} | ${notification.date}`}
                            />
                            <Button
                              size="small"
                              sx={{ color: theme.primary }}
                              onClick={() => handleOpenDialog('viewNotification', notification)}
                            >
                              查看详情
                            </Button>
                          </ListItem>
                        ))}
                      </List>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        size="small"
                        sx={{ mt: 1, borderColor: theme.primary, color: theme.primary }}
                        onClick={() => handleOpenDialog('sendNotification')}
                      >
                        发送通知
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          ) : (
            <Card sx={cardStyle}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: '100%',
                  py: 4
                }}>
                  <PersonIcon sx={{ fontSize: 48, color: theme.text.secondary, mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    请选择一位教师查看详情
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* 添加/编辑教师对话框 */}
      <Dialog 
        open={openDialog && dialogType === 'addTeacher'} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle sx={{ color: theme.primary }}>
          添加新教师
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="姓名"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="邮箱"
                size="small"
                type="email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="联系电话"
                size="small"
                type="tel"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="临时密码"
                size="small"
                type="password"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="教授语言"
                size="small"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="english">英语</option>
                <option value="french">法语</option>
                <option value="spanish">西班牙语</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="教师身份"
                size="small"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="chinese">中教</option>
                <option value="foreign">外教</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                教学级别
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="小学" />
                <Chip label="初中" />
                <Chip label="高中" />
                <Chip label="成人" />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button variant="contained" sx={{ bgcolor: theme.primary }}>
            创建账号
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  // 渲染学生管理
  const renderStudentManagement = () => (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          placeholder="搜索学生..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('addStudent')}
          sx={{ bgcolor: theme.primary }}
        >
          添加学生
        </Button>
      </Box>

      <Card sx={cardStyle}>
        <CardContent>
          <Box sx={titleStyle}>
            <PeopleIcon />
            <Typography variant="h5">学生列表</Typography>
          </Box>
          <List>
            {/* 这里添加学生列表内容 */}
          </List>
        </CardContent>
      </Card>
    </Box>
  );

  // 渲染教学资料管理
  const renderMaterialManagement = () => (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          placeholder="搜索资料..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('addMaterial')}
          sx={{ bgcolor: theme.primary }}
        >
          上传资料
        </Button>
      </Box>

      <Card sx={cardStyle}>
        <CardContent>
          <Box sx={titleStyle}>
            <BookIcon />
            <Typography variant="h5">教学资料库</Typography>
          </Box>
          <List>
            {/* 这里添加资料列表内容 */}
          </List>
        </CardContent>
      </Card>
    </Box>
  );

  // 渲染预约管理
  const renderBookingManagement = () => (
    <Box>
      <Card sx={cardStyle}>
        <CardContent>
          <Box sx={titleStyle}>
            <EventIcon />
            <Typography variant="h5">预约管理</Typography>
          </Box>
          <List>
            {/* 这里添加预约列表内容 */}
          </List>
        </CardContent>
      </Card>
    </Box>
  );

  // 渲染数据分析
  const renderAnalytics = () => (
    <Box>
      <Grid container spacing={3}>
        {/* 收入统计 */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={titleStyle}>
                <TrendingUpIcon />
                <Typography variant="h5">收入统计</Typography>
              </Box>
              {/* 这里添加收入统计图表 */}
            </CardContent>
          </Card>
        </Grid>

        {/* 课程统计 */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={titleStyle}>
                <BarChartIcon />
                <Typography variant="h5">课程统计</Typography>
              </Box>
              {/* 这里添加课程统计图表 */}
            </CardContent>
          </Card>
        </Grid>

        {/* 教师评价分析 */}
        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={titleStyle}>
                <AssessmentIcon />
                <Typography variant="h5">教师评价分析</Typography>
              </Box>
              <Grid container spacing={3}>
                {/* 评分分布 */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom sx={{ color: theme.primary }}>
                    评分分布
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <PieChart width={500} height={300}>
                      <Pie
                        data={[
                          { name: '5星', value: 45 },
                          { name: '4星', value: 30 },
                          { name: '3星', value: 15 },
                          { name: '2星', value: 7 },
                          { name: '1星', value: 3 }
                        ]}
                        cx={250}
                        cy={150}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell fill={theme.success} />
                        <Cell fill={theme.primaryLight} />
                        <Cell fill={theme.warning} />
                        <Cell fill={theme.error} />
                        <Cell fill={theme.error} />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </Box>
                </Grid>

                {/* 教师评分排名 */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom sx={{ color: theme.primary }}>
                    教师评分排名
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>教师</TableCell>
                          <TableCell>评分</TableCell>
                          <TableCell>评价数</TableCell>
                          <TableCell>趋势</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>张老师</TableCell>
                          <TableCell>4.8</TableCell>
                          <TableCell>128</TableCell>
                          <TableCell>
                            <TrendingUpIcon sx={{ color: theme.success }} />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>李老师</TableCell>
                          <TableCell>4.7</TableCell>
                          <TableCell>95</TableCell>
                          <TableCell>
                            <TrendingUpIcon sx={{ color: theme.success }} />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>王老师</TableCell>
                          <TableCell>4.6</TableCell>
                          <TableCell>76</TableCell>
                          <TableCell>
                            <TrendingUpIcon sx={{ color: theme.success }} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                {/* 问题反馈分析 */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom sx={{ color: theme.primary }}>
                    问题反馈分析
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          教学态度
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText
                              primary="迟到早退"
                              secondary="3次反馈"
                            />
                            <Chip 
                              label="待处理" 
                              size="small" 
                              color="warning"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="备课不充分"
                              secondary="2次反馈"
                            />
                            <Chip 
                              label="处理中" 
                              size="small" 
                              color="info"
                            />
                          </ListItem>
                        </List>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          教学质量
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText
                              primary="讲解不清晰"
                              secondary="4次反馈"
                            />
                            <Chip 
                              label="已处理" 
                              size="small" 
                              color="success"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="进度过快"
                              secondary="2次反馈"
                            />
                            <Chip 
                              label="处理中" 
                              size="small" 
                              color="info"
                            />
                          </ListItem>
                        </List>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          师生互动
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText
                              primary="互动不足"
                              secondary="5次反馈"
                            />
                            <Chip 
                              label="已处理" 
                              size="small" 
                              color="success"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="作业批改不及时"
                              secondary="3次反馈"
                            />
                            <Chip 
                              label="待处理" 
                              size="small" 
                              color="warning"
                            />
                          </ListItem>
                        </List>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>

                {/* 教师成长追踪 */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom sx={{ color: theme.primary }}>
                    教师成长追踪
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          培训完成情况
                        </Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>培训项目</TableCell>
                                <TableCell>参与人数</TableCell>
                                <TableCell>完成率</TableCell>
                                <TableCell>平均成绩</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>教学方法培训</TableCell>
                                <TableCell>25</TableCell>
                                <TableCell>92%</TableCell>
                                <TableCell>4.5</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>课堂管理培训</TableCell>
                                <TableCell>20</TableCell>
                                <TableCell>85%</TableCell>
                                <TableCell>4.2</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>新课程开发</TableCell>
                                <TableCell>15</TableCell>
                                <TableCell>60%</TableCell>
                                <TableCell>4.0</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          证书升级情况
                        </Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>证书类型</TableCell>
                                <TableCell>持有人数</TableCell>
                                <TableCell>待升级</TableCell>
                                <TableCell>即将到期</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>TEFL证书</TableCell>
                                <TableCell>18</TableCell>
                                <TableCell>5</TableCell>
                                <TableCell>2</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>教师资格证</TableCell>
                                <TableCell>22</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>1</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>专业等级证书</TableCell>
                                <TableCell>15</TableCell>
                                <TableCell>8</TableCell>
                                <TableCell>3</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  // 渲染系统设置
  const renderSettings = () => (
    <Box>
      <Card sx={cardStyle}>
        <CardContent>
          <Box sx={titleStyle}>
            <SettingsIcon />
            <Typography variant="h5">系统设置</Typography>
          </Box>
          <List>
            {/* 这里添加系统设置选项 */}
          </List>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 顶部应用栏 */}
      <AppBar position="static" sx={{ bgcolor: theme.primary }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            课程预约系统 - 管理员控制台
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 标签页导航 */}
      <Paper sx={{ mb: 3, boxShadow: 1 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              minWidth: 120,
            },
          }}
        >
          {tabLabels.map((tab, index) => (
            <Tab 
              key={index}
              icon={tab.icon}
              label={tab.label}
              value={index}
            />
          ))}
        </Tabs>
      </Paper>

      {/* 主要内容区域 */}
      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
        <Box sx={{ mt: 3 }}>
          {selectedMenu === 'dashboard' && renderDashboard()}
          {selectedMenu === 'courses' && renderCourseManagement()}
          {selectedMenu === 'teachers' && renderTeacherManagement()}
          {selectedMenu === 'students' && renderStudentManagement()}
          {selectedMenu === 'materials' && renderMaterialManagement()}
          {selectedMenu === 'bookings' && renderBookingManagement()}
          {selectedMenu === 'analytics' && renderAnalytics()}
          {selectedMenu === 'settings' && renderSettings()}
        </Box>
      </Container>

      {/* 通用对话框 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: theme.primary }}>
          {dialogType === 'addCourse' && '添加课程'}
          {dialogType === 'addTeacher' && '添加教师'}
          {dialogType === 'addStudent' && '添加学生'}
          {dialogType === 'addMaterial' && '上传资料'}
        </DialogTitle>
        <DialogContent>
          {/* 根据 dialogType 显示不同的表单内容 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button variant="contained" sx={{ bgcolor: theme.primary }}>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard; 