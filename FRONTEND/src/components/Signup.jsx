import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// 🌈 Aesthetic Theme to match login
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

const Signup = () => {
  const [input, setInput] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', input);

    axios
      .post('http://localhost:3000/api/s', input)
      .then((response) => {
        console.log('Signup success:', response.data);
        setSuccessMessage('');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Signup error:', error);
        setErrorMessage('Signup failed. Please try again.');
        setSuccessMessage('');
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 420,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            padding: 4,
          }}
        >
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Smart City Signup
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            Create your account to manage smart city services.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              name="fullName"
              onChange={inputHandler}
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              name="email"
              onChange={inputHandler}
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              name="password"
              type="password"
              onChange={inputHandler}
              InputLabelProps={{ style: { fontSize: 14 } }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 3, py: 1 }}
            >
              <Link component={RouterLink} to="/home" underline="hover" >
                            Signup</Link>
            </Button>
          </form>

          {/* ✅ Success & Error Messages */}
          {successMessage && (
            <Typography
              variant="body1"
              align="center"
              color="success.main"
              sx={{ mt: 2 }}
            >
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography
              variant="body1"
              align="center"
              color="error.main"
              sx={{ mt: 2 }}
            >
              {errorMessage}
            </Typography>
          )}

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: 'text.secondary' }}
          >
            Already a user?{' '}
            <Link component={RouterLink} to="/" underline="hover" color="secondary">
              Login here
            </Link>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;

