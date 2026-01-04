import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from './Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }} elevation={1}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>About Smart City Management</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Smart City Management helps citizens report issues, track service requests,
            and enables authorities to respond faster and more transparently.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Built with a focus on usability, real-time dashboards, and geolocation-aware reporting.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={RouterLink} to="/contact" variant="contained">Contact Us</Button>
            <Button component={RouterLink} to="/signup" variant="outlined">Create Account</Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default About;
