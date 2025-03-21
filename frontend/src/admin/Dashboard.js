import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Container,
  Paper,
  Grid,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import {
  People as PeopleIcon,
  Class as ClassIcon,
  Schedule as ScheduleIcon,
  ShoppingCart as OrderIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Book as BookIcon,
  CalendarToday as CalendarIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Payment as PaymentIcon,
  Notifications as NotificationsIcon,
  LockReset as LockResetIcon,
  UploadFile as UploadFileIcon
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(searchParams.get('menu') || 'staff');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [staffForm, setStaffForm] = useState({
    name: '',
    username: '',
    role: 'admin',
    email: '',
    phone: '',
    password: ''
  });
  const [resetPasswordForm, setResetPasswordForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [staffList, setStaffList] = useState([
    { id: 1, name: '张老师', username: 'teacher1', role: 'teacher', status: 'active', lastLogin: '2024-03-20 10:30' },
    { id: 2, name: '李教务', username: 'staff1', role: 'staff', status: 'active', lastLogin: '2024-03-20 09:15' }
  ]);
  const [studentList, setStudentList] = useState([
    { 
      id: 1, 
      name: '王小明', 
      username: 'student1', 
      grade: '三年级', 
      parent: '王先生', 
      status: 'active', 
      lastLogin: '2024-03-19 15:20',
      totalHours: 120,
      remainingHours: 45,
      courses: ['英语口语', '数学思维']
    },
    { 
      id: 2, 
      name: '李小红', 
      username: 'student2', 
      grade: '四年级', 
      parent: '李女士', 
      status: 'active', 
      lastLogin: '2024-03-19 16:45',
      totalHours: 150,
      remainingHours: 80,
      courses: ['英语阅读', '数学提高']
    }
  ]);
  const [studentForm, setStudentForm] = useState({
    name: '',
    username: '',
    grade: '',
    parent: '',
    parentPhone: '',
    email: '',
    password: '',
    totalHours: 0,
    remainingHours: 0
  });

  // 添加购买课时表单状态
  const [purchaseHoursForm, setPurchaseHoursForm] = useState({
    hours: 0,
    amount: 0,
    paymentMethod: 'cash',
    notes: ''
  });

  // 课表管理相关状态
  const [scheduleView, setScheduleView] = useState('week');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClassForGeneration, setSelectedClassForGeneration] = useState('');
  const [scheduleForm, setScheduleForm] = useState({
    classId: '',
    teacherId: '',
    subject: '',
    classroom: '',
    time: '',
    day: ''
  });

  // 添加订单相关状态
  const [orderList, setOrderList] = useState([
    {
      id: 1,
      orderNo: 'ORD2024032001',
      studentName: '王小明',
      courseName: '英语口语课程',
      hours: 20,
      amount: 2000,
      status: 'pending',
      createTime: '2024-03-20 10:30',
      paymentMethod: 'wechat',
      paymentTime: null,
      notes: '家长要求尽快安排课程'
    },
    {
      id: 2,
      orderNo: 'ORD2024032002',
      studentName: '李小红',
      courseName: '数学提高班',
      hours: 30,
      amount: 3000,
      status: 'paid',
      createTime: '2024-03-20 11:15',
      paymentMethod: 'alipay',
      paymentTime: '2024-03-20 11:20',
      notes: '已确认课程时间'
    }
  ]);

  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSearchText, setOrderSearchText] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const drawerWidth = isMobile ? 200 : isTablet ? 240 : 280;

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    console.log('Current user info:', userInfo);
    
    if (!userInfo || userInfo.role !== 'admin') {
      console.log('No admin user found, redirecting to login');
      navigate('/login');
      return;
    }
    
    // 初始化管理员菜单项
    const adminMenuItems = [
      { label: '员工管理', value: 'staff' },
      { label: '学员管理', value: 'students' },
      { label: '班级管理', value: 'classes' },
      { label: '课表管理', value: 'schedule' },
      { label: '课程订单', value: 'orders' }
    ];
    
    // 更新用户信息，添加菜单项
    const updatedUserInfo = {
      ...userInfo,
      adminMenuItems
    };
    localStorage.setItem('user', JSON.stringify(updatedUserInfo));
    setUser(updatedUserInfo);
  }, [navigate]);

  useEffect(() => {
    const menu = searchParams.get('menu');
    if (menu) {
      setSelectedMenu(menu);
    }
  }, [searchParams]);

  useEffect(() => {
    console.log('Selected menu:', selectedMenu);
    console.log('Open dialog:', openDialog);
    console.log('Dialog type:', dialogType);
  }, [selectedMenu, openDialog, dialogType]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMenuItemClick = (value) => {
    setSelectedMenu(value);
    navigate(`/admin/dashboard?menu=${value}`);
  };

  const getMenuIcon = (value) => {
    switch (value) {
      case 'staff':
        return <PeopleIcon />;
      case 'students':
        return <PersonIcon />;
      case 'classes':
        return <ClassIcon />;
      case 'schedule':
        return <ScheduleIcon />;
      case 'orders':
        return <OrderIcon />;
      default:
        return <PeopleIcon />;
    }
  };

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
    setSelectedItem(null);
    // Reset forms
    setStaffForm({
      name: '',
      username: '',
      role: 'admin',
      email: '',
      phone: '',
      password: ''
    });
    setResetPasswordForm({
      password: '',
      confirmPassword: ''
    });
    setStudentForm({
      name: '',
      username: '',
      grade: '',
      parent: '',
      parentPhone: '',
      email: '',
      password: '',
      totalHours: 0,
      remainingHours: 0
    });
    setPurchaseHoursForm({
      hours: 0,
      amount: 0,
      paymentMethod: 'cash',
      notes: ''
    });
  };

  const handleSaveStaff = () => {
    // Here you would typically make an API call to save the staff member
    console.log('Saving staff:', staffForm);
    handleCloseDialog();
  };

  const handleResetPassword = () => {
    // Here you would typically make an API call to reset the password
    console.log('Resetting password for:', selectedItem);
    handleCloseDialog();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImportStaff = () => {
    // Here you would typically make an API call to import staff from the file
    console.log('Importing staff from file:', selectedFile);
    handleCloseDialog();
  };

  const handleSaveStudent = () => {
    // Here you would typically make an API call to save the student
    console.log('Saving student:', studentForm);
    handleCloseDialog();
  };

  const handleResetStudentPassword = () => {
    // Here you would typically make an API call to reset the student's password
    console.log('Resetting password for student:', selectedItem);
    handleCloseDialog();
  };

  const handleDeleteStudent = () => {
    // Here you would typically make an API call to delete the student
    console.log('Deleting student:', selectedItem);
    handleCloseDialog();
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'staff':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                员工管理
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('addStaff')}
                  sx={{ 
                    color: '#2D5A27',
                    borderColor: '#2D5A27',
                    '&:hover': {
                      borderColor: '#2D5A27',
                      bgcolor: 'rgba(45, 90, 39, 0.04)'
                    }
                  }}
                >
                  添加员工
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('importStaff')}
                  sx={{ 
                    color: '#2D5A27',
                    borderColor: '#2D5A27',
                    '&:hover': {
                      borderColor: '#2D5A27',
                      bgcolor: 'rgba(45, 90, 39, 0.04)'
                    }
                  }}
                >
                  批量导入
                </Button>
              </Box>
            </Box>

            {/* 员工列表 */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>姓名</TableCell>
                    <TableCell>用户名</TableCell>
                    <TableCell>角色</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>最后登录</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffList.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>{staff.name}</TableCell>
                      <TableCell>{staff.username}</TableCell>
                      <TableCell>
                        <Chip 
                          label={staff.role} 
                          color={
                            staff.role === 'admin' ? 'error' :
                            staff.role === 'teacher' ? 'primary' :
                            'default'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={staff.status} 
                          color={staff.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{staff.lastLogin}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('editStaff', staff)}
                            sx={{ color: '#2D5A27' }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('resetPassword', staff)}
                            sx={{ color: '#2D5A27' }}
                          >
                            <LockResetIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('deleteStaff', staff)}
                            sx={{ color: '#f44336' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* 添加/编辑员工对话框 */}
            <Dialog 
              open={openDialog && (dialogType === 'addStaff' || dialogType === 'editStaff')} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>
                {dialogType === 'addStaff' ? '添加员工' : '编辑员工信息'}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="姓名"
                    fullWidth
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                  />
                  <TextField
                    label="用户名"
                    fullWidth
                    value={staffForm.username}
                    onChange={(e) => setStaffForm({ ...staffForm, username: e.target.value })}
                  />
                  <FormControl fullWidth>
                    <InputLabel>角色</InputLabel>
                    <Select
                      value={staffForm.role}
                      label="角色"
                      onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                    >
                      <MenuItem value="admin">管理员</MenuItem>
                      <MenuItem value="teacher">教师</MenuItem>
                      <MenuItem value="staff">教务</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="邮箱"
                    fullWidth
                    type="email"
                    value={staffForm.email}
                    onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                  />
                  <TextField
                    label="手机号"
                    fullWidth
                    value={staffForm.phone}
                    onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                  />
                  {dialogType === 'addStaff' && (
                    <TextField
                      label="初始密码"
                      fullWidth
                      type="password"
                      value={staffForm.password}
                      onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                    />
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleSaveStaff}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  保存
                </Button>
              </DialogActions>
            </Dialog>

            {/* 重置密码对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'resetPassword'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>重置密码</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    确定要重置 {selectedItem?.name} 的密码吗？
                  </Typography>
                  <TextField
                    label="新密码"
                    fullWidth
                    type="password"
                    value={resetPasswordForm.password}
                    onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, password: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="确认密码"
                    fullWidth
                    type="password"
                    value={resetPasswordForm.confirmPassword}
                    onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, confirmPassword: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleResetPassword}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  确认重置
                </Button>
              </DialogActions>
            </Dialog>

            {/* 批量导入对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'importStaff'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>批量导入员工</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    请上传包含员工信息的Excel文件
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    sx={{ mt: 2 }}
                  >
                    选择文件
                    <input
                      type="file"
                      hidden
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  {selectedFile && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      已选择: {selectedFile.name}
                    </Typography>
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleImportStaff}
                  disabled={!selectedFile}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  开始导入
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        );
      case 'students':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                学员管理
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('addStudent')}
                  sx={{ 
                    color: '#2D5A27',
                    borderColor: '#2D5A27',
                    '&:hover': {
                      borderColor: '#2D5A27',
                      bgcolor: 'rgba(45, 90, 39, 0.04)'
                    }
                  }}
                >
                  添加学员
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  onClick={() => handleOpenDialog('importStudents')}
                  sx={{ 
                    color: '#2D5A27',
                    borderColor: '#2D5A27',
                    '&:hover': {
                      borderColor: '#2D5A27',
                      bgcolor: 'rgba(45, 90, 39, 0.04)'
                    }
                  }}
                >
                  批量导入
                </Button>
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>姓名</TableCell>
                    <TableCell>账号</TableCell>
                    <TableCell>年级</TableCell>
                    <TableCell>家长</TableCell>
                    <TableCell>总课时</TableCell>
                    <TableCell>剩余课时</TableCell>
                    <TableCell>在读课程</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>最后登录</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentList.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.username}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.parent}</TableCell>
                      <TableCell>{student.totalHours}</TableCell>
                      <TableCell>{student.remainingHours}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {student.courses.map((course, index) => (
                            <Chip 
                              key={index}
                              label={course}
                              size="small"
                              sx={{ 
                                bgcolor: 'rgba(45, 90, 39, 0.1)',
                                color: '#2D5A27',
                                '&:hover': {
                                  bgcolor: 'rgba(45, 90, 39, 0.2)'
                                }
                              }}
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={student.status} 
                          color={student.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{student.lastLogin}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('purchaseHours', student)}
                            sx={{ color: '#2D5A27' }}
                          >
                            <PaymentIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('editStudent', student)}
                            sx={{ color: '#2D5A27' }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('resetStudentPassword', student)}
                            sx={{ color: '#2D5A27' }}
                          >
                            <LockResetIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('deleteStudent', student)}
                            sx={{ color: '#f44336' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* 添加/编辑学员对话框 */}
            <Dialog 
              open={openDialog && (dialogType === 'addStudent' || dialogType === 'editStudent')} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>
                {dialogType === 'addStudent' ? '添加学员' : '编辑学员信息'}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="姓名"
                    fullWidth
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  />
                  <TextField
                    label="账号"
                    fullWidth
                    value={studentForm.username}
                    onChange={(e) => setStudentForm({ ...studentForm, username: e.target.value })}
                  />
                  <TextField
                    label="年级"
                    fullWidth
                    value={studentForm.grade}
                    onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                  />
                  <TextField
                    label="家长姓名"
                    fullWidth
                    value={studentForm.parent}
                    onChange={(e) => setStudentForm({ ...studentForm, parent: e.target.value })}
                  />
                  <TextField
                    label="家长手机号"
                    fullWidth
                    value={studentForm.parentPhone}
                    onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                  />
                  <TextField
                    label="邮箱"
                    fullWidth
                    type="email"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  />
                  <TextField
                    label="总课时"
                    fullWidth
                    type="number"
                    value={studentForm.totalHours || 0}
                    onChange={(e) => setStudentForm({ ...studentForm, totalHours: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="剩余课时"
                    fullWidth
                    type="number"
                    value={studentForm.remainingHours || 0}
                    onChange={(e) => setStudentForm({ ...studentForm, remainingHours: parseInt(e.target.value) })}
                  />
                  {dialogType === 'addStudent' && (
                    <TextField
                      label="初始密码"
                      fullWidth
                      type="password"
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                    />
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleSaveStudent}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  保存
                </Button>
              </DialogActions>
            </Dialog>

            {/* 重置密码对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'resetStudentPassword'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>重置密码</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    确定要重置 {selectedItem?.name} 的密码吗？
                  </Typography>
                  <TextField
                    label="新密码"
                    fullWidth
                    type="password"
                    value={resetPasswordForm.password}
                    onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, password: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="确认密码"
                    fullWidth
                    type="password"
                    value={resetPasswordForm.confirmPassword}
                    onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, confirmPassword: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  onClick={handleResetStudentPassword}
                  sx={{ bgcolor: '#2D5A27', '&:hover': { bgcolor: '#1b3d17' } }}
                >
                  确认重置
                </Button>
              </DialogActions>
            </Dialog>

            {/* 删除确认对话框 */}
            <Dialog 
              open={openDialog && dialogType === 'deleteStudent'} 
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>删除学员</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    确定要删除学员 {selectedItem?.name} 吗？此操作不可恢复。
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>取消</Button>
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={handleDeleteStudent}
                >
                  确认删除
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        );
      case 'classes':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              班级管理
            </Typography>
            {/* 班级管理内容 */}
          </Paper>
        );
      case 'schedule':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                课表管理
              </Typography>
            </Box>
            {/* 课表管理内容 */}
          </Paper>
        );
      case 'orders':
        return (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              课程订单
            </Typography>
            {/* 课程订单内容 */}
          </Paper>
        );
      default:
        return null;
    }
  };

  const drawer = (
    <Box sx={{ overflow: 'auto', mt: 2 }}>
      <List>
        {user?.adminMenuItems.map((item) => (
          <ListItem
            button
            key={item.value}
            selected={selectedMenu === item.value}
            onClick={() => handleMenuItemClick(item.value)}
            sx={{
              '&.Mui-selected': {
                bgcolor: 'rgba(197,230,176,0.2)',
                '&:hover': {
                  bgcolor: 'rgba(197,230,176,0.3)'
                }
              },
              '&:hover': {
                bgcolor: 'rgba(197,230,176,0.1)'
              },
              borderRadius: '0 24px 24px 0',
              mr: 2,
              mb: 1,
              py: { xs: 2, sm: 1.5 }
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: selectedMenu === item.value ? '#2D5A27' : 'inherit',
                minWidth: { xs: 40, sm: 45 }
              }}
            >
              {getMenuIcon(item.value)}
            </ListItemIcon>
            <ListItemText 
              primary={item.label} 
              sx={{ 
                '& .MuiTypography-root': { 
                  fontWeight: selectedMenu === item.value ? 600 : 400,
                  color: selectedMenu === item.value ? '#2D5A27' : 'inherit',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                } 
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (!user || !user.adminMenuItems) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Typography>加载中...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexGrow: 1 
          }}>
            <Avatar 
              src={user.avatar} 
              alt={user.username}
              sx={{ 
                width: { xs: 32, sm: 40 }, 
                height: { xs: 32, sm: 40 },
                mr: 2
              }}
            />
            <span style={{ 
              fontSize: '1rem',
              color: '#2D5A27',
              fontWeight: 600
            }}>
              {user.username}
            </span>
          </Box>
          <IconButton 
            onClick={handleLogout}
            sx={{ 
              color: '#2D5A27',
              '&:hover': {
                bgcolor: 'rgba(197,230,176,0.2)'
              }
            }}
          >
            <LogoutIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'white',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
