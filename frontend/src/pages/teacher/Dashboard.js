import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  IconButton,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  LinearProgress,
  Avatar,
  Stack
} from '@mui/material';
import {
  CalendarToday,
  Notifications,
  AccessTime,
  LocationOn,
  VideoCall,
  Person,
  Book,
  School,
  Description,
  CheckCircle,
  Cancel,
  Message,
  Upload,
  Download,
  Share,
  Timeline,
  TrendingUp,
  Assessment,
  Folder,
  Star,
  Note
} from '@mui/icons-material';

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

// 标签页样式
const tabStyle = {
  mb: 4,
  '& .MuiTab-root': {
    color: theme.text.secondary,
    textTransform: 'none',
    fontSize: '1rem',
    minHeight: 48,
    '&.Mui-selected': {
      color: theme.primary,
      fontWeight: 600
    }
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.primary,
    height: 3
  }
};

// 统计卡片样式
const statCardStyle = {
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
  }
};

const TeacherDashboard = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // 模拟数据
  const [weeklySchedule] = useState([
    {
      day: '周一',
      time: '08:00-08:30',
      student: 'Nicole',
      material: 'Power Up 1 - U5',
      type: 'online',
      status: 'pending'
    },
    {
      day: '周一',
      time: '10:00-10:30',
      student: 'Joey',
      material: 'KET Speaking Practice',
      type: 'offline',
      status: 'completed'
    }
  ]);

  const [appointments] = useState([
    {
      id: 1,
      time: '09:00-09:30',
      student: 'Yanni',
      material: 'Power Up 1 - U6',
      status: 'pending'
    }
  ]);

  const [students] = useState([
    {
      id: 1,
      name: 'Nicole',
      age: 15,
      grade: '高一',
      currentProgress: 'Power Up 1 - U5',
      lastClass: '2024-03-20',
      note: '注意提升句型使用',
      totalClasses: 24,
      completedClasses: 20,
      attendanceRate: 95,
      performance: '优秀',
      nextClass: '2024-03-25 14:00',
      subjects: ['英语', '数学', '物理'],
      learningGoals: '提高口语表达能力和阅读理解能力',
      recentNotes: [
        {
          date: '2024-03-20',
          content: '课堂表现积极，口语表达有进步',
          type: '课堂反馈'
        },
        {
          date: '2024-03-18',
          content: '需要加强语法练习',
          type: '学习建议'
        }
      ]
    }
  ]);

  const [materials] = useState([
    {
      id: 1,
      name: 'Power Up 1 - U5 PDF',
      type: 'PDF',
      size: '2.5MB'
    },
    {
      id: 2,
      name: 'KET Speaking Practice Guide',
      type: 'DOC',
      size: '1.8MB'
    }
  ]);

  const [statistics] = useState({
    monthlyHours: 18,
    completionRate: 95,
    upcomingClasses: 5,
    averageRating: 4.8
  });

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleAppointmentAction = (appointment, action) => {
    setSelectedAppointment(appointment);
    if (action === 'message') {
      setOpenMessageDialog(true);
    }
  };

  const renderWeeklySchedule = () => (
    <Paper sx={cardStyle}>
      <Box sx={titleStyle}>
        <CalendarToday />
        <Typography variant="h6">本周课表</Typography>
      </Box>
      <List>
        {weeklySchedule.map((schedule, index) => (
          <React.Fragment key={index}>
            <ListItem 
              sx={{ 
                mb: 2,
                borderRadius: 1,
                bgcolor: schedule.status === 'completed' ? 'rgba(76, 175, 80, 0.05)' : 'inherit',
                '&:hover': {
                  bgcolor: 'rgba(46, 125, 50, 0.05)'
                }
              }}
            >
              <ListItemIcon>
                <AccessTime sx={{ color: theme.primary }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {schedule.day} {schedule.time}
                    </Typography>
                    <Chip
                      label={schedule.status === 'completed' ? '已完成' : '待完成'}
                      size="small"
                      color={schedule.status === 'completed' ? 'success' : 'warning'}
                      sx={{ 
                        fontWeight: 500,
                        '& .MuiChip-label': {
                          px: 1
                        }
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {schedule.student} - {schedule.material}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {schedule.type === 'online' ? (
                        <VideoCall sx={{ fontSize: '1.2rem', mr: 1, color: theme.primary }} />
                      ) : (
                        <LocationOn sx={{ fontSize: '1.2rem', mr: 1, color: theme.primary }} />
                      )}
                      <Typography variant="body2" color="text.secondary">
                        {schedule.type === 'online' ? '线上课程' : '线下课程'}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            {index < weeklySchedule.length - 1 && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );

  const renderAppointments = () => (
    <Paper sx={cardStyle}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Notifications sx={{ mr: 1, color: theme.primary }} />
        <Typography variant="h6">预约管理</Typography>
      </Box>
      <List>
        {appointments.map((appointment, index) => (
          <React.Fragment key={appointment.id}>
            <ListItem>
              <ListItemIcon>
                <AccessTime sx={{ color: theme.primary }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">
                      {appointment.time}
                    </Typography>
                    <Chip
                      label="新预约"
                      size="small"
                      color="error"
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1">
                      {appointment.student} - {appointment.material}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<CheckCircle />}
                        onClick={() => handleAppointmentAction(appointment, 'accept')}
                      >
                        接受
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<Cancel />}
                        onClick={() => handleAppointmentAction(appointment, 'reject')}
                      >
                        拒绝
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={<Message />}
                        onClick={() => handleAppointmentAction(appointment, 'message')}
                      >
                        留言
                      </Button>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            {index < appointments.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );

  const renderStudentManagement = () => (
    <Paper sx={cardStyle}>
      <Box sx={titleStyle}>
        <Person />
        <Typography variant="h6">学生信息管理</Typography>
      </Box>
      <Grid container spacing={3}>
        {students.map((student) => (
          <Grid item xs={12} key={student.id}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                {/* 学生基本信息 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      mr: 2,
                      bgcolor: theme.primary,
                      fontSize: '1.5rem'
                    }}
                  >
                    {student.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {student.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {student.age}岁 | {student.grade} | {student.performance}
                    </Typography>
                  </Box>
                </Box>

                {/* 学习进度和统计 */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 1, 
                      bgcolor: 'rgba(46, 125, 50, 0.05)',
                      border: `1px solid ${theme.primaryLight}`
                    }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        课程进度
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={(student.completedClasses / student.totalClasses) * 100}
                          sx={{ 
                            flexGrow: 1, 
                            mr: 1,
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(46, 125, 50, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: theme.primary
                            }
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {student.completedClasses}/{student.totalClasses}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        出勤率：{student.attendanceRate}%
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 1, 
                      bgcolor: 'rgba(46, 125, 50, 0.05)',
                      border: `1px solid ${theme.primaryLight}`
                    }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        当前进度
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {student.currentProgress}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        下次课程：{student.nextClass}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* 学习目标和科目 */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    学习目标
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {student.learningGoals}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {student.subjects.map((subject, index) => (
                      <Chip
                        key={index}
                        label={subject}
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(46, 125, 50, 0.1)',
                          color: theme.primary,
                          '&:hover': {
                            bgcolor: 'rgba(46, 125, 50, 0.2)'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* 最近笔记 */}
                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    最近笔记
                  </Typography>
                  <List>
                    {student.recentNotes.map((note, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemIcon>
                            <Note sx={{ color: theme.primary }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle2">
                                  {note.type}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {note.date}
                                </Typography>
                              </Box>
                            }
                            secondary={note.content}
                          />
                        </ListItem>
                        {index < student.recentNotes.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<Book />}
                  sx={{ 
                    bgcolor: theme.primary,
                    '&:hover': {
                      bgcolor: theme.primaryDark
                    }
                  }}
                >
                  查看学习记录
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  startIcon={<Note />}
                >
                  添加笔记
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  const renderMaterials = () => (
    <Paper sx={cardStyle}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Folder sx={{ mr: 1, color: theme.primary }} />
        <Typography variant="h6">教学材料管理</Typography>
      </Box>
      <Grid container spacing={2}>
        {materials.map((material) => (
          <Grid item xs={12} sm={6} key={material.id}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Description sx={{ mr: 1, color: theme.primary }} />
                  <Typography variant="subtitle1">{material.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  类型：{material.type} | 大小：{material.size}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<Download />}>
                  下载
                </Button>
                <Button size="small" startIcon={<Share />}>
                  分享
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        startIcon={<Upload />}
        sx={{ mt: 2 }}
      >
        上传新资料
      </Button>
    </Paper>
  );

  const renderStatistics = () => (
    <Paper sx={cardStyle}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Timeline sx={{ mr: 1, color: theme.primary }} />
        <Typography variant="h6">数据统计</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTime sx={{ mr: 1, color: theme.primary }} />
                <Typography variant="h6">{statistics.monthlyHours}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                本月授课时长（小时）
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ mr: 1, color: theme.primary }} />
                <Typography variant="h6">{statistics.completionRate}%</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                课程完成率
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CalendarToday sx={{ mr: 1, color: theme.primary }} />
                <Typography variant="h6">{statistics.upcomingClasses}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                即将到来的课程
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Star sx={{ mr: 1, color: theme.primary }} />
                <Typography variant="h6">{statistics.averageRating}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                平均评分
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 4, 
          color: theme.primary,
          fontWeight: 600,
          fontSize: { xs: '1.75rem', sm: '2rem' }
        }}
      >
        教师仪表板
      </Typography>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={tabStyle}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab 
          icon={<CalendarToday />} 
          label="本周课表"
          sx={{ minWidth: { xs: 'auto', sm: 120 } }}
        />
        <Tab 
          icon={<Notifications />} 
          label="预约管理"
          sx={{ minWidth: { xs: 'auto', sm: 120 } }}
        />
        <Tab 
          icon={<Person />} 
          label="学生管理"
          sx={{ minWidth: { xs: 'auto', sm: 120 } }}
        />
        <Tab 
          icon={<Folder />} 
          label="教学材料"
          sx={{ minWidth: { xs: 'auto', sm: 120 } }}
        />
        <Tab 
          icon={<Timeline />} 
          label="数据统计"
          sx={{ minWidth: { xs: 'auto', sm: 120 } }}
        />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {currentTab === 0 && renderWeeklySchedule()}
        {currentTab === 1 && renderAppointments()}
        {currentTab === 2 && renderStudentManagement()}
        {currentTab === 3 && renderMaterials()}
        {currentTab === 4 && renderStatistics()}
      </Box>

      <Dialog 
        open={openMessageDialog} 
        onClose={() => setOpenMessageDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: theme.primary, fontWeight: 600 }}>
          发送消息
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="消息内容"
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setOpenMessageDialog(false)}
            sx={{ color: theme.text.secondary }}
          >
            取消
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ 
              bgcolor: theme.primary,
              '&:hover': {
                bgcolor: theme.primaryDark
              }
            }}
          >
            发送
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherDashboard; 