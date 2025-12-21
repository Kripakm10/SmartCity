import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Avatar, Stack } from '@mui/material';
import Navbar from './Navbar';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [wastes, setWastes] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    fetchMine();
  }, []);

  const authHeaders = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
  };

  const fetchMine = async () => {
    try {
      setLoading(true);
      const w = await fetch('http://localhost:3000/api/waste/mine', { headers: authHeaders() });
      const r = await fetch('http://localhost:3000/api/registrations/mine', { headers: authHeaders() });
      const wastesData = await w.json();
      const regsData = await r.json();
      setWastes(wastesData);
      setRegistrations(regsData);
    } catch (err) {
      console.error('fetch mine', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box sx={{ p: 4, mt: 10 }}>
        <Typography variant="h4" color="primary" sx={{ mb: 3 }}>My Dashboard</Typography>
        {user ? (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: '#009688' }}>{(user.fullName || user.email || 'U')[0]}</Avatar>
              <Box>
                <Typography variant="h6">{user.fullName}</Typography>
                <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              </Box>
            </Stack>
          </Paper>
        ) : (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography>Please login to view your dashboard.</Typography>
          </Paper>
        )}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>My Waste Requests</Typography>
              {wastes.length ? wastes.map(w => (
                <Paper key={w._id} sx={{ p: 2, mb: 1 }}>
                  <Typography variant="subtitle1">{w.name}</Typography>
                  <Typography variant="body2">{w.address}</Typography>
                  <Typography variant="body2">{w.wasteType} • {w.status}</Typography>
                </Paper>
              )) : <Typography color="text.secondary">No waste requests yet.</Typography>}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>My Registrations</Typography>
              {registrations.length ? registrations.map(r => (
                <Paper key={r._id} sx={{ p: 2, mb: 1 }}>
                  <Typography variant="subtitle1">{r.firstName} {r.lastName}</Typography>
                  <Typography variant="body2">{r.email} • {r.department}</Typography>
                  <Typography variant="body2">Status: {r.status}</Typography>
                </Paper>
              )) : <Typography color="text.secondary">No registrations yet.</Typography>}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDashboard;
