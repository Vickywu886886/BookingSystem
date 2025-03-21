import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { logout } from '../../services/authApi';

const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentMenu = searchParams.get('menu') || 'staff';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 模拟数据
  const staffData = [
    { id: 1, name: '李老师', role: '教师', email: 'teacher1@example.com', status: '活跃' },
    { id: 2, name: '张老师', role: '教师', email: 'teacher2@example.com', status: '活跃' },
    { id: 3, name: '王老师', role: '教师', email: 'teacher3@example.com', status: '离职' },
  ];

  const studentData = [
    { id: 1, name: '张三', grade: '一年级', email: 'student1@example.com', status: '在读' },
    { id: 2, name: '李四', grade: '二年级', email: 'student2@example.com', status: '在读' },
    { id: 3, name: '王五', grade: '三年级', email: 'student3@example.com', status: '休学' },
  ];

  const classData = [
    { id: 1, name: '英语基础班', teacher: '李老师', students: 20, schedule: '周一、周三 14:00-15:30' },
    { id: 2, name: '数学提高班', teacher: '张老师', students: 15, schedule: '周二、周四 15:00-16:30' },
    { id: 3, name: '语文阅读班', teacher: '王老师', students: 18, schedule: '周五 14:00-15:30' },
  ];

  const scheduleData = [
    { id: 1, class: '英语基础班', room: '教室101', time: '周一、周三 14:00-15:30', capacity: 20 },
    { id: 2, class: '数学提高班', room: '教室102', time: '周二、周四 15:00-16:30', capacity: 15 },
    { id: 3, class: '语文阅读班', room: '教室103', time: '周五 14:00-15:30', capacity: 18 },
  ];

  const orderData = [
    { id: 1, student: '张三', course: '英语基础班', amount: 2000, status: '已支付', date: '2024-03-01' },
    { id: 2, student: '李四', course: '数学提高班', amount: 1800, status: '待支付', date: '2024-03-02' },
    { id: 3, student: '王五', course: '语文阅读班', amount: 1500, status: '已支付', date: '2024-03-03' },
  ];

  const renderContent = () => {
    switch (currentMenu) {
      case 'staff':
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">教师管理</Typography>
              <Button variant="contained" color="primary">添加教师</Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>姓名</TableCell>
                    <TableCell>角色</TableCell>
                    <TableCell>邮箱</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffData.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>{staff.name}</TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>{staff.status}</TableCell>
                      <TableCell>
                        <Button size="small" color="primary">编辑</Button>
                        <Button size="small" color="error">删除</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );

      case 'students':
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">学生管理</Typography>
              <Button variant="contained" color="primary">添加学生</Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>姓名</TableCell>
                    <TableCell>年级</TableCell>
                    <TableCell>邮箱</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.status}</TableCell>
                      <TableCell>
                        <Button size="small" color="primary">编辑</Button>
                        <Button size="small" color="error">删除</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );

      case 'classes':
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">班级管理</Typography>
              <Button variant="contained" color="primary">添加班级</Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>班级名称</TableCell>
                    <TableCell>教师</TableCell>
                    <TableCell>学生人数</TableCell>
                    <TableCell>上课时间</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classData.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>{cls.name}</TableCell>
                      <TableCell>{cls.teacher}</TableCell>
                      <TableCell>{cls.students}</TableCell>
                      <TableCell>{cls.schedule}</TableCell>
                      <TableCell>
                        <Button size="small" color="primary">编辑</Button>
                        <Button size="small" color="error">删除</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );

      case 'schedule':
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">课程安排</Typography>
              <Button variant="contained" color="primary">添加课程</Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>班级</TableCell>
                    <TableCell>教室</TableCell>
                    <TableCell>时间</TableCell>
                    <TableCell>容量</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduleData.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>{schedule.class}</TableCell>
                      <TableCell>{schedule.room}</TableCell>
                      <TableCell>{schedule.time}</TableCell>
                      <TableCell>{schedule.capacity}</TableCell>
                      <TableCell>
                        <Button size="small" color="primary">编辑</Button>
                        <Button size="small" color="error">删除</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );

      case 'orders':
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">订单管理</Typography>
              <Button variant="contained" color="primary">导出订单</Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>学生</TableCell>
                    <TableCell>课程</TableCell>
                    <TableCell>金额</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>日期</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.student}</TableCell>
                      <TableCell>{order.course}</TableCell>
                      <TableCell>¥{order.amount}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Button size="small" color="primary">查看详情</Button>
                        <Button size="small" color="error">取消订单</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );

      default:
        return (
          <Box>
            <Typography variant="h6">欢迎使用管理系统</Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">教师总数</Typography>
                  <Typography variant="h4">12</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">学生总数</Typography>
                  <Typography variant="h4">156</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">班级总数</Typography>
                  <Typography variant="h4">8</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          管理员仪表板
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </Box>
      {renderContent()}
    </Box>
  );
};

export default AdminDashboard; 