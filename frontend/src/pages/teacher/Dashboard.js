import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const TeacherDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        教师仪表板
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              我的课程
            </Typography>
            <Typography>
              这里将显示教师教授的课程列表
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              待批改作业
            </Typography>
            <Typography>
              这里将显示待批改的作业列表
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDashboard; 