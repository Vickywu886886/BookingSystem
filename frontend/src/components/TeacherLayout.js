import React from 'react';
import {
  Box,
  Container,
  Paper
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import TeacherNav from './TeacherNav';

const TeacherLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mb: '64px' // Leave space for bottom navigation bar
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{ 
            mb: 4,
            px: 0
          }}
        >
          <Paper sx={{ 
            p: 2, 
            display: 'flex', 
            flexDirection: 'column',
            borderRadius: 0,
            mt: 0,
            mr: 0
          }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
      <TeacherNav />
    </Box>
  );
};

export default TeacherLayout; 