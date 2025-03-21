import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  CalendarToday,
  CalendarMonth,
  Notifications,
  AccessTime,
  LocationOn
} from '@mui/icons-material';

const TeacherDashboard = () => {
  // 模拟数据
  const [todaySchedule] = useState([
    { time: '08:00-08:30', course: '高等数学', location: '教学楼A101', type: '上课' },
    { time: '10:00-10:30', course: '线性代数', location: '教学楼B203', type: '上课' },
    { time: '14:00-14:30', course: '概率论', location: '教学楼C305', type: '上课' }
  ]);

  const [weeklySchedule] = useState([
    { day: '周一', time: '08:00-08:30', course: '高等数学', location: '教学楼A101' },
    { day: '周二', time: '10:00-10:30', course: '线性代数', location: '教学楼B203' },
    { day: '周三', time: '14:00-14:30', course: '概率论', location: '教学楼C305' },
    { day: '周四', time: '08:00-08:30', course: '高等数学', location: '教学楼A101' },
    { day: '周五', time: '10:00-10:30', course: '线性代数', location: '教学楼B203' }
  ]);

  const [notifications] = useState([
    { id: 1, title: '教学大纲更新', content: '请各位教师及时更新本学期教学大纲', time: '2024-03-20', type: '重要' },
    { id: 2, title: '期中考试安排', content: '期中考试将于下月进行，请提前做好准备', time: '2024-03-19', type: '通知' },
    { id: 3, title: '教学评估', content: '本学期教学评估即将开始，请关注通知', time: '2024-03-18', type: '提醒' }
  ]);

  // 转换周课表数据为网格格式
  const timeSlots = [
    '07:00-07:30', '07:30-08:00', '08:00-08:30', '08:30-09:00',
    '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00',
    '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00',
    '13:00-13:30', '13:30-14:00', '14:00-14:30', '14:30-15:00',
    '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00',
    '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00',
    '19:00-19:30', '19:30-20:00', '20:00-20:30', '20:30-21:00',
    '21:00-21:30', '21:30-22:00', '22:00-22:30', '22:30-23:00',
    '23:00-23:30', '23:30-24:00'
  ];
  const weekDays = ['周一', '周二', '周三', '周四', '周五'];

  const getScheduleForSlot = (day, time) => {
    return weeklySchedule.find(schedule => schedule.day === day && schedule.time === time);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        教师仪表板
      </Typography>
      
      <Grid container spacing={3}>
        {/* 重要通知 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Notifications sx={{ mr: 1, color: '#2e7d32' }} />
              <Typography variant="h6">重要通知</Typography>
            </Box>
            <List>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">{notification.title}</Typography>
                          <Chip 
                            label={notification.type} 
                            size="small" 
                            color={notification.type === '重要' ? 'error' : 'default'}
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {notification.time}
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 0.5 }}>
                            {notification.content}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 今日课表 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarToday sx={{ mr: 1, color: '#2e7d32' }} />
              <Typography variant="h6">今日课表</Typography>
            </Box>
            <List>
              {todaySchedule.map((schedule, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTime sx={{ fontSize: '1rem' }} />
                          <Typography variant="subtitle1">{schedule.time}</Typography>
                          <Chip 
                            label={schedule.type} 
                            size="small" 
                            color="primary" 
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body1">{schedule.course}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <LocationOn sx={{ fontSize: '1rem', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              {schedule.location}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < todaySchedule.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 本周课表 */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarMonth sx={{ mr: 1, color: '#2e7d32' }} />
              <Typography variant="h6">本周课表</Typography>
            </Box>
            <TableContainer sx={{ maxHeight: '600px', overflow: 'auto' }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: '100px', fontWeight: 'bold', backgroundColor: '#fff' }}>时间</TableCell>
                    {weekDays.map(day => (
                      <TableCell key={day} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#fff' }}>
                        {day}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeSlots.map(time => (
                    <TableRow key={time}>
                      <TableCell sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>{time}</TableCell>
                      {weekDays.map(day => {
                        const schedule = getScheduleForSlot(day, time);
                        return (
                          <TableCell 
                            key={`${day}-${time}`}
                            sx={{ 
                              textAlign: 'center',
                              backgroundColor: schedule ? '#e8f5e9' : 'inherit',
                              border: '1px solid #e0e0e0',
                              minHeight: '40px',
                              verticalAlign: 'top',
                              padding: '2px'
                            }}
                          >
                            {schedule && (
                              <Box sx={{ p: 0.5 }}>
                                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>
                                  {schedule.course}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                  {schedule.location}
                                </Typography>
                              </Box>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDashboard; 