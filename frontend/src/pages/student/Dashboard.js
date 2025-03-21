import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Chip,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import {
  School as SchoolIcon,
  Event as EventIcon,
  Book as BookIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);

  // 模拟数据
  const courses = [
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
  ];

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

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderCourses = () => (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} md={4} key={course.id}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {course.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              教师：{course.teacher}
            </Typography>
            <Typography variant="body2" gutterBottom>
              上课时间：{course.schedule}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Box>
                <Chip label={course.level} color="primary" size="small" sx={{ mr: 1 }} />
                <Chip label={`剩余${course.spots}个名额`} color="secondary" size="small" />
              </Box>
              <Box>
                <Typography variant="h6" color="primary" component="span">
                  ¥{course.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={() => navigate(`/student/courses/${course.id}`)}
                >
                  查看详情
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  const renderMyCourses = () => (
    <List>
      {myCourses.map((course) => (
        <React.Fragment key={course.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <SchoolIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={course.name}
              secondary={
                <Box>
                  <Typography component="span" variant="body2">
                    教师：{course.teacher}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2">
                    下次上课：{course.nextClass}
                  </Typography>
                </Box>
              }
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip
                label={`进度 ${course.progress}%`}
                color="primary"
                size="small"
                sx={{ mr: 1 }}
              />
              <Chip
                label={course.status}
                color="success"
                size="small"
              />
            </Box>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  const renderAppointments = () => (
    <List>
      {appointments.map((appointment) => (
        <React.Fragment key={appointment.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EventIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={appointment.course}
              secondary={
                <Box>
                  <Typography component="span" variant="body2">
                    教师：{appointment.teacher}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2">
                    {appointment.date} {appointment.time}
                  </Typography>
                </Box>
              }
            />
            <Chip
              label={appointment.status}
              color={appointment.status === '已确认' ? 'success' : 'warning'}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        学生仪表板
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab icon={<BookIcon />} label="课程列表" />
          <Tab icon={<SchoolIcon />} label="我的课程" />
          <Tab icon={<ScheduleIcon />} label="预约记录" />
        </Tabs>
      </Paper>

      <Box sx={{ mt: 3 }}>
        {currentTab === 0 && renderCourses()}
        {currentTab === 1 && renderMyCourses()}
        {currentTab === 2 && renderAppointments()}
      </Box>
    </Box>
  );
};

export default StudentDashboard; 