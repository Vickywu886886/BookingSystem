import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@mui/material';
import {
  School as SchoolIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Book as BookIcon,
  Chat as ChatIcon,
  PlayArrow as PlayIcon,
  SkipNext as SkipIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const Onboarding = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    learningGoals: [],
    languages: [],
  });
  const [openDialog, setOpenDialog] = useState(false);

  const steps = [
    '欢迎',
    '个人资料',
    '课程指引',
    '功能介绍',
    '个性化推荐',
    '任务提示',
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // 完成引导流程，设置标记
      localStorage.setItem('hasCompletedOnboarding', 'true');
      navigate('/student');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSkip = () => {
    // 跳过引导流程，也设置标记
    localStorage.setItem('hasCompletedOnboarding', 'true');
    navigate('/student');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoalToggle = (goal) => {
    setFormData((prev) => ({
      ...prev,
      learningGoals: prev.learningGoals.includes(goal)
        ? prev.learningGoals.filter((g) => g !== goal)
        : [...prev.learningGoals, goal],
    }));
  };

  const handleLanguageToggle = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }));
  };

  const renderWelcomeStep = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <SchoolIcon sx={{ fontSize: 64, color: '#2e7d32', mb: 2 }} />
      <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
        欢迎来到 KidNest！
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        您的专属在线学习平台
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" paragraph>
          ✨ 轻松预约课程，随时随地学习
        </Typography>
        <Typography variant="body1" paragraph>
          📚 丰富的课程回放，巩固学习效果
        </Typography>
        <Typography variant="body1" paragraph>
          🎮 互动学习体验，让学习更有趣
        </Typography>
      </Box>
    </Box>
  );

  const renderProfileStep = () => (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32' }}>
        完善个人资料
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="姓名"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="年龄"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>年级</InputLabel>
            <Select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              label="年级"
            >
              <MenuItem value="小学一年级">小学一年级</MenuItem>
              <MenuItem value="小学二年级">小学二年级</MenuItem>
              <MenuItem value="小学三年级">小学三年级</MenuItem>
              <MenuItem value="小学四年级">小学四年级</MenuItem>
              <MenuItem value="小学五年级">小学五年级</MenuItem>
              <MenuItem value="小学六年级">小学六年级</MenuItem>
              <MenuItem value="初中一年级">初中一年级</MenuItem>
              <MenuItem value="初中二年级">初中二年级</MenuItem>
              <MenuItem value="初中三年级">初中三年级</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            学习目标
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['提升口语', '准备KET', '提高听力', '加强阅读', '提升写作'].map((goal) => (
              <Chip
                key={goal}
                label={goal}
                onClick={() => handleGoalToggle(goal)}
                color={formData.learningGoals.includes(goal) ? 'primary' : 'default'}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            所学语言
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['英语', '法语', '西班牙语'].map((language) => (
              <Chip
                key={language}
                label={language}
                onClick={() => handleLanguageToggle(language)}
                color={formData.languages.includes(language) ? 'primary' : 'default'}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const renderCourseGuideStep = () => (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32' }}>
        课程指引
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <CalendarIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                查看课程
              </Typography>
              <Typography variant="body2" color="text.secondary">
                在"我的课程"中查看已预约的课程安排
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <BookIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                教材与作业
              </Typography>
              <Typography variant="body2" color="text.secondary">
                在课程详情页查看教材和作业要求
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <ChatIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                联系老师
              </Typography>
              <Typography variant="body2" color="text.secondary">
                通过消息系统与老师沟通或联系客服
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderFeaturesStep = () => (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32' }}>
        平台功能介绍
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <CalendarIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                预约课程
              </Typography>
              <Typography variant="body2" color="text.secondary">
                快速选择时间并完成课程预约
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <BookIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                查看课表
              </Typography>
              <Typography variant="body2" color="text.secondary">
                轻松找到上课时间及教学材料
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <PlayIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                互动练习区
              </Typography>
              <Typography variant="body2" color="text.secondary">
                使用丰富的学习资源进行练习
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderRecommendationsStep = () => (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32' }}>
        个性化推荐
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                推荐学习资料
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="KET词汇卡片" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="西语口语小测" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                免费资源
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="音频学习材料" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="趣味学习游戏" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderTasksStep = () => (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32' }}>
        任务提示
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Checkbox color="primary" />
          </ListItemIcon>
          <ListItemText primary="完成个人资料填写" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox color="primary" />
          </ListItemIcon>
          <ListItemText primary="浏览平台功能" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox color="primary" />
          </ListItemIcon>
          <ListItemText primary="检查设备并提前5分钟上线" />
        </ListItem>
      </List>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderWelcomeStep();
      case 1:
        return renderProfileStep();
      case 2:
        return renderCourseGuideStep();
      case 3:
        return renderFeaturesStep();
      case 4:
        return renderRecommendationsStep();
      case 5:
        return renderTasksStep();
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleSkip}
            startIcon={<SkipIcon />}
            sx={{ color: '#2e7d32', borderColor: '#2e7d32' }}
          >
            跳过引导
          </Button>
          <Box>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ mr: 1, color: '#2e7d32', borderColor: '#2e7d32' }}
            >
              上一步
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ bgcolor: '#2e7d32' }}
            >
              {activeStep === steps.length - 1 ? '完成' : '下一步'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Onboarding; 