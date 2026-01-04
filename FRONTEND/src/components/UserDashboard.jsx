import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Avatar, Stack , Grid } from '@mui/material';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [wastes, setWastes] = useState([]);
  const [waters, setWaters] = useState([]);
  const [grievances, setGrievances] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('token');

    console.log("Session Storage User:", storedUser); // Debugging

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (storedToken) {
            fetchMine(storedToken);
        }
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    } else {
        navigate('/login');
    }
  }, []);

  const authHeaders = (token) => {
    return { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
    };
  };

  const fetchMine = async (token) => {
    try {
      setLoading(true);
      const headers = authHeaders(token);

      const [w, wa, g, r] = await Promise.all([
        fetch('http://localhost:3000/api/waste/mine', { headers }),
        fetch('http://localhost:3000/api/water/mine', { headers }),
        fetch('http://localhost:3000/api/grievance/mine', { headers }),
        fetch('http://localhost:3000/api/registrations/mine', { headers }),
      ]);

      if (w.ok) {
        const wasteData = await w.json();
        setWastes(wasteData);
      }
      if (wa.ok) {
        const waterData = await wa.json();
        setWaters(waterData);
      }
      if (g.ok) {
        const grievanceData = await g.json();
        setGrievances(grievanceData);
      }
      if (r.ok) {
        const regData = await r.json();
        setRegistrations(regData);
      }
    } catch (err) {
      console.error('fetch mine error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear(); 
    setUser(null);
    navigate('/login'); 
  };

  return (
    <Box>
      <Navbar />
      <Box sx={{ p: 4, mt: 8 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h4" color="primary">My Dashboard</Typography>
            {user && (
                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Logout
                </Button>
            )}
        </Stack>

        {user ? (
          <Paper sx={{ p: 3, mb: 4, bgcolor: '#e0f2f1' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: '#009688', width: 56, height: 56 }}>
                {(user.fullName || user.email || 'U')[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h5">{user.fullName}</Typography>
                <Typography variant="body1" color="text.secondary">{user.email}</Typography>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {user.role || 'User'}
                </Typography>
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
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid #009688', display:'inline-block' }}>
                My Waste Requests
              </Typography>
              {wastes.length ? wastes.map((w, i) => (
                <Paper key={w._id || i} variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#fafafa' }}>
                  <Typography variant="subtitle1" fontWeight="bold">{w.wasteType || 'Waste Collection'}</Typography>
                  <Typography variant="body2">{w.address}</Typography>
                  <Typography variant="caption" sx={{ 
                      color: w.status === 'Resolved' ? 'green' : 'orange', 
                      fontWeight:'bold', 
                      mt: 1, 
                      display: 'block' 
                  }}>
                    Status: {w.status || 'Pending'}
                  </Typography>
                </Paper>
              )) : <Typography color="text.secondary">No waste requests yet.</Typography>}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="h6" sx={{ borderBottom: '2px solid #ff7043', display:'inline-block' }}>
                  My Registrations
                </Typography>
                <Button size="small" onClick={() => navigate('/user/registrations')}>View all</Button>
              </Stack>

              {registrations.length ? registrations.map((r, i) => (
                <Paper key={r._id || i} variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#fafafa' }}>
                  <Typography variant="subtitle1" fontWeight="bold">{r.department || 'General'}</Typography>
                  <Typography variant="body2">{r.firstName} {r.lastName}</Typography>
                  {r.location && r.location.lat && (
                    <Typography variant="caption" color="text.secondary" display="block">Location: {r.location.lat.toFixed(5)}, {r.location.lng.toFixed(5)}</Typography>
                  )}
                  <Typography variant="caption" sx={{ fontWeight:'bold', mt: 1, display: 'block' }}>
                    Status: {r.status || 'Pending'}
                  </Typography>
                </Paper>
              )) : <Typography color="text.secondary">No registrations yet.</Typography>}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid #1976d2', display:'inline-block' }}>
                My Water Reports
              </Typography>
              {waters.length ? waters.map((w, i) => (
                <Paper key={w._id || i} variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#fafafa' }}>
                  <Typography variant="subtitle1" fontWeight="bold">{w.issueType || 'Water Issue'}</Typography>
                  <Typography variant="body2">{w.address}</Typography>
                  {w.location && w.location.lat && (
                    <Typography variant="caption" color="text.secondary" display="block">Location: {w.location.lat.toFixed(5)}, {w.location.lng.toFixed(5)}</Typography>
                  )}
                  <Typography variant="caption" sx={{ fontWeight:'bold', mt: 1, display: 'block' }}>
                    Status: {w.status || 'Pending'}
                  </Typography>
                </Paper>
              )) : <Typography color="text.secondary">No water reports yet.</Typography>}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid #ff9800', display:'inline-block' }}>
                My Grievances
              </Typography>
              {grievances.length ? grievances.map((g, i) => (
                <Paper key={g._id || i} variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#fafafa' }}>
                  <Typography variant="subtitle1" fontWeight="bold">{g.subject}</Typography>
                  <Typography variant="body2">{g.description}</Typography>
                  {g.location && g.location.lat && (
                    <Typography variant="caption" color="text.secondary" display="block">Location: {g.location.lat.toFixed(5)}, {g.location.lng.toFixed(5)}</Typography>
                  )}
                  <Typography variant="caption" sx={{ fontWeight:'bold', mt: 1, display: 'block' }}>
                    Status: {g.status || 'Open'}
                  </Typography>
                </Paper>
              )) : <Typography color="text.secondary">No grievances yet.</Typography>}
            </Paper>
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
};

export default UserDashboard;