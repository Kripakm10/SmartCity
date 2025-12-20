import React from 'react';
import {
  Box,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Grid, // ✅ Import Grid v2 directly
  Card,
  CardContent,
  CardMedia,
  GridLegacy,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from './Navbar';

// 🎨 Theme setup
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#009688', // Teal
    },
    secondary: {
      main: '#ff7043', // Coral
    },
    background: {
      default: '#f0f4f8',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const features = [
  {
    title: 'Waste Management System',
    description:
      'Track garbage collection, recycling, and smart bins across the city to ensure cleanliness and sustainability.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Water Supply Monitoring',
    description:
      'Monitor real-time water supply, detect leaks, and optimize consumption for a sustainable urban future.',
    image:
      'https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Grievance Redressal System',
    description:
      'Report city issues directly, track resolution status, and improve transparency between citizens and authorities.',
    image:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
  },
];

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* 🔹 Navbar */}
      <Navbar />

    
      {/* 🔹 Fullscreen Hero Section */}
     <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage:
      "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1950&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    px: 3,
  }}
>
  <Box
    sx={{
      bgcolor: 'rgba(255, 255, 255, 0.85)',
      p: 5,
      borderRadius: 3,
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      maxWidth: 900,
    }}
  >
    {/* Welcome Title */}
    <Typography
      variant="h3"
      gutterBottom
      sx={{
        background: 'linear-gradient(90deg, #009688, #ff7043)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
      }}
    >
      Welcome to Smart City Management
    </Typography>

    {/* Definition */}
    <Typography
      variant="h6"
      color="text.secondary"
      gutterBottom
      sx={{ mb: 3 }}
    >
      Smart City Management uses advanced technology, IoT, and data-driven solutions
      to efficiently manage urban services like water supply, waste, management
      and improving quality of life for citizens.
    </Typography>

    
  </Box>
</Box>



      {/* 🔹 Features Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: 6 }, bgcolor: '#fff' }}>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 6 }}
        >
          Smart City Features
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-10px)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;