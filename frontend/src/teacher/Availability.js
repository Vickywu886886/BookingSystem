import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  GridOn as GridOnIcon,
  List as ListIcon
} from '@mui/icons-material';
import { format, startOfWeek, addDays, isWithinInterval, eachHourOfInterval, set, isEqual } from 'date-fns';
import { enUS } from 'date-fns/locale';

// Generate time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 22; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TeacherAvailability = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      date: new Date('2024-03-20'),
      startTime: new Date('2024-03-20T09:00:00'),
      endTime: new Date('2024-03-20T10:30:00'),
      type: 'One-on-One',
      status: 'Available',
      repeat: 'Weekly'
    },
    {
      id: 2,
      date: new Date('2024-03-21'),
      startTime: new Date('2024-03-21T14:00:00'),
      endTime: new Date('2024-03-21T15:30:00'),
      type: 'Small Group',
      status: 'Booked',
      repeat: 'Once'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState(0); // 0: grid view, 1: list view
  const [availabilityGrid, setAvailabilityGrid] = useState(() => {
    const grid = {};
    WEEKDAYS.forEach(day => {
      grid[day] = {};
      TIME_SLOTS.forEach(time => {
        grid[day][time] = false;
      });
    });
    return grid;
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCellClick = (day, time) => {
    setAvailabilityGrid(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !prev[day][time]
      }
    }));
  };

  const handleOpenDialog = (schedule = null) => {
    setEditingSchedule(schedule || {
      date: selectedDate,
      startTime: new Date(selectedDate.setHours(9, 0, 0)),
      endTime: new Date(selectedDate.setHours(10, 30, 0)),
      type: 'One-on-One',
      status: 'Available',
      repeat: 'Once'
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingSchedule(null);
    setOpenDialog(false);
  };

  const handleSaveSchedule = () => {
    if (!editingSchedule.date || !editingSchedule.startTime || !editingSchedule.endTime) {
      setSnackbar({
        open: true,
        message: 'Please fill in all time information!',
        severity: 'error'
      });
      return;
    }

    if (editingSchedule.startTime >= editingSchedule.endTime) {
      setSnackbar({
        open: true,
        message: 'End time must be later than start time!',
        severity: 'error'
      });
      return;
    }

    if (editingSchedule.id) {
      setSchedules(schedules.map(schedule =>
        schedule.id === editingSchedule.id ? editingSchedule : schedule
      ));
      setSnackbar({
        open: true,
        message: 'Time slot updated successfully!',
        severity: 'success'
      });
    } else {
      const newSchedule = {
        ...editingSchedule,
        id: schedules.length + 1
      };
      setSchedules([...schedules, newSchedule]);
      setSnackbar({
        open: true,
        message: 'New time slot added successfully!',
        severity: 'success'
      });
    }
    handleCloseDialog();
  };

  const handleDeleteSchedule = (scheduleId) => {
    setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
    setSnackbar({
      open: true,
      message: 'Time slot deleted successfully!',
      severity: 'success'
    });
  };

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const filteredSchedules = schedules.filter(schedule => {
    if (viewMode === 0) { // grid view
      const weekDays = getWeekDays();
      return isWithinInterval(schedule.date, {
        start: weekDays[0],
        end: weekDays[6]
      });
    } else { // list view
      return format(schedule.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    }
  });

  const handleSaveAvailability = () => {
    // Add logic to save availability to backend
    setSnackbar({
      open: true,
      message: 'Available time settings saved!',
      severity: 'success'
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Time Management
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ mr: 1 }}
            >
              Add Time Slot
            </Button>
            {viewMode === 0 && (
              <Button
                variant="contained"
                color="success"
                onClick={handleSaveAvailability}
              >
                Save Available Time
              </Button>
            )}
          </Box>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={viewMode} onChange={(e, newValue) => setViewMode(newValue)}>
              <Tab icon={<GridOnIcon />} label="Grid View" />
              <Tab icon={<ListIcon />} label="List View" />
            </Tabs>
          </Box>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  slotProps={{ textField: { size: 'small' } }}
                />
              </Grid>
              {viewMode === 0 && (
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    {format(getWeekDays()[0], 'MM/dd')} - {format(getWeekDays()[6], 'MM/dd')}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Paper>

        {viewMode === 0 ? (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  {WEEKDAYS.map((day) => (
                    <TableCell key={day} align="center">{day}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {TIME_SLOTS.map((time) => (
                  <TableRow key={time}>
                    <TableCell>{time}</TableCell>
                    {WEEKDAYS.map((day) => (
                      <TableCell
                        key={`${day}-${time}`}
                        align="center"
                        onClick={() => handleCellClick(day, time)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: availabilityGrid[day][time] ? '#4caf50' : 'inherit',
                          '&:hover': {
                            bgcolor: availabilityGrid[day][time] ? '#45a049' : '#f5f5f5'
                          }
                        }}
                      >
                        {availabilityGrid[day][time] ? 'Available' : ''}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Class Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Repeat</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSchedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{format(schedule.date, 'yyyy-MM-dd')}</TableCell>
                    <TableCell>{format(schedule.startTime, 'HH:mm')}</TableCell>
                    <TableCell>{format(schedule.endTime, 'HH:mm')}</TableCell>
                    <TableCell>{schedule.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={schedule.status}
                        color={schedule.status === 'Available' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{schedule.repeat}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(schedule)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteSchedule(schedule.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSchedules.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body2" color="textSecondary">
                        No schedules found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingSchedule?.id ? 'Edit Time Slot' : 'Add New Time Slot'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DatePicker
                    label="Date"
                    value={editingSchedule?.date}
                    onChange={(newValue) => setEditingSchedule({ ...editingSchedule, date: newValue })}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="Start Time"
                    value={editingSchedule?.startTime}
                    onChange={(newValue) => setEditingSchedule({ ...editingSchedule, startTime: newValue })}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="End Time"
                    value={editingSchedule?.endTime}
                    onChange={(newValue) => setEditingSchedule({ ...editingSchedule, endTime: newValue })}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Class Type</InputLabel>
                    <Select
                      value={editingSchedule?.type || ''}
                      onChange={(e) => setEditingSchedule({ ...editingSchedule, type: e.target.value })}
                      label="Class Type"
                    >
                      <MenuItem value="One-on-One">One-on-One</MenuItem>
                      <MenuItem value="Small Group">Small Group</MenuItem>
                      <MenuItem value="Large Group">Large Group</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Repeat</InputLabel>
                    <Select
                      value={editingSchedule?.repeat || ''}
                      onChange={(e) => setEditingSchedule({ ...editingSchedule, repeat: e.target.value })}
                      label="Repeat"
                    >
                      <MenuItem value="Once">Once</MenuItem>
                      <MenuItem value="Daily">Daily</MenuItem>
                      <MenuItem value="Weekly">Weekly</MenuItem>
                      <MenuItem value="Monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveSchedule} variant="contained" color="primary">
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
    </LocalizationProvider>
  );
};

export default TeacherAvailability; 