import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  CircularProgress
} from '@mui/material';
import { getMyBookings, cancelBooking } from '../../services/bookingService';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      console.log('Fetching bookings...');
      const data = await getMyBookings();
      console.log('Bookings data:', data);
      setBookings(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('获取预约记录失败');
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      // 重新获取预约列表
      fetchBookings();
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError('取消预约失败');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return '待确认';
      case 'confirmed':
        return '已确认';
      case 'cancelled':
        return '已取消';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        我的预约
      </Typography>

      {bookings.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          暂无预约记录
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} md={6} key={booking.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">
                      {booking.course.title}
                    </Typography>
                    <Chip
                      label={getStatusText(booking.status)}
                      color={getStatusColor(booking.status)}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    教师：{booking.course.teacher.username}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    开始时间：{new Date(booking.schedule.start_time).toLocaleString()}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    结束时间：{new Date(booking.schedule.end_time).toLocaleString()}
                  </Typography>

                  {booking.status === 'pending' && (
                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        取消预约
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyBookings; 