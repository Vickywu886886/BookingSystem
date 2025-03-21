import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Divider,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

const COURSE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const COURSE_CATEGORIES = ['Speaking', 'Listening', 'Reading', 'Writing', 'Business English', 'Test Preparation'];
const COURSE_DURATIONS = ['30 minutes', '45 minutes', '60 minutes', '90 minutes', '120 minutes'];

const TeacherCourses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Beginner English Conversation',
      description: 'English speaking course suitable for beginners',
      level: 'Beginner',
      category: 'Speaking',
      duration: '45 minutes',
      price: 200,
      maxStudents: 1,
      status: 'Open'
    },
    {
      id: 2,
      name: 'Business English Writing',
      description: 'Professional business English writing skills training',
      level: 'Advanced',
      category: 'Business English',
      duration: '60 minutes',
      price: 300,
      maxStudents: 6,
      status: 'Full'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: '',
    category: '',
    status: ''
  });
  const [currentTab, setCurrentTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleOpenDialog = (course = null) => {
    setEditingCourse(course || {
      name: '',
      description: '',
      level: 'Beginner',
      category: 'Speaking',
      duration: '45 minutes',
      price: 0,
      maxStudents: 1,
      status: 'Open'
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingCourse(null);
    setOpenDialog(false);
  };

  const validateCourse = (course) => {
    if (!course.name || !course.description || !course.level || 
        !course.category || !course.duration || !course.price) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields!',
        severity: 'error'
      });
      return false;
    }
    if (course.price <= 0) {
      setSnackbar({
        open: true,
        message: 'Course price must be greater than 0!',
        severity: 'error'
      });
      return false;
    }
    if (course.maxStudents < 1) {
      setSnackbar({
        open: true,
        message: 'Maximum number of students must be greater than 0!',
        severity: 'error'
      });
      return false;
    }
    return true;
  };

  const handleSaveCourse = () => {
    if (!validateCourse(editingCourse)) {
      return;
    }

    if (editingCourse.id) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id ? editingCourse : course
      ));
      setSnackbar({
        open: true,
        message: 'Course updated successfully!',
        severity: 'success'
      });
    } else {
      const newCourse = {
        ...editingCourse,
        id: courses.length + 1
      };
      setCourses([...courses, newCourse]);
      setSnackbar({
        open: true,
        message: 'New course added successfully!',
        severity: 'success'
      });
    }
    handleCloseDialog();
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
    setSnackbar({
      open: true,
      message: 'Course deleted successfully!',
      severity: 'success'
    });
  };

  const handleFilterChange = (field) => (event) => {
    setFilters({ ...filters, [field]: event.target.value });
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !filters.level || course.level === filters.level;
    const matchesCategory = !filters.category || course.category === filters.category;
    const matchesStatus = !filters.status || course.status === filters.status;
    
    if (currentTab === 0) return matchesSearch && matchesLevel && matchesCategory && matchesStatus;
    if (currentTab === 1) return course.status === 'Open' && matchesSearch && matchesLevel && matchesCategory;
    return course.status === 'Full' && matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Course Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Course
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Courses" />
          <Tab label="Open" />
          <Tab label="Full" />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" spacing={2}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Level</InputLabel>
                <Select
                  value={filters.level}
                  onChange={handleFilterChange('level')}
                  label="Level"
                >
                  <MenuItem value="">All</MenuItem>
                  {COURSE_LEVELS.map(level => (
                    <MenuItem key={level} value={level}>{level}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  onChange={handleFilterChange('category')}
                  label="Category"
                >
                  <MenuItem value="">All</MenuItem>
                  {COURSE_CATEGORIES.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={handleFilterChange('status')}
                  label="Status"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Full">Full</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>
                  <Chip label={course.level} size="small" />
                </TableCell>
                <TableCell>
                  <Chip label={course.category} size="small" />
                </TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>¥{course.price}</TableCell>
                <TableCell>{course.maxStudents}</TableCell>
                <TableCell>
                  <Chip
                    label={course.status}
                    color={course.status === 'Open' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(course)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredCourses.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No courses found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCourse?.id ? 'Edit Course' : 'Add New Course'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Course Name"
                  value={editingCourse?.name || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={3}
                  label="Course Description"
                  value={editingCourse?.description || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Level</InputLabel>
                  <Select
                    value={editingCourse?.level || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value })}
                    label="Level"
                  >
                    {COURSE_LEVELS.map(level => (
                      <MenuItem key={level} value={level}>{level}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={editingCourse?.category || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                    label="Category"
                  >
                    {COURSE_CATEGORIES.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Duration</InputLabel>
                  <Select
                    value={editingCourse?.duration || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    label="Duration"
                  >
                    {COURSE_DURATIONS.map(duration => (
                      <MenuItem key={duration} value={duration}>{duration}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Price"
                  value={editingCourse?.price || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, price: Number(e.target.value) })}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Maximum Students"
                  value={editingCourse?.maxStudents || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, maxStudents: Number(e.target.value) })}
                  helperText="Set to 1 for one-on-one courses"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveCourse} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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
    </Box>
  );
};

export default TeacherCourses; 