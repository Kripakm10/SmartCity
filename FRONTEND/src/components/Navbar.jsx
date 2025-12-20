import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar 
      position="absolute" 
      color="primary"
      sx={{
        height: '70px', // Adjust height to match Home page look
        justifyContent: 'center', // Vertical centering
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo / Title */}
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            fontWeight: 'bold',
            fontFamily: 'Roboto, sans-serif', // Matching homepage font
            fontSize: { xs: '1.2rem', md: '1.5rem' }, // Responsive size
            color: 'inherit',
          }}
        >
          SMART CITY PORTAL
        </Typography>

        {/* Navigation Links */}
        <Box>
          
          <Button color="inherit" component={RouterLink} to="/mi">
            Our mission
          </Button>
          <Button color="inherit" component={RouterLink} to="/r">
            Register
          </Button>
          <Button color="inherit" component={RouterLink} to="/co">
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
