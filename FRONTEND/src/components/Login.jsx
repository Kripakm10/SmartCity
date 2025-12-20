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

// 🌈 Theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#009688' },
    secondary: { main: '#ff7043' },
    background: { default: '#f0f4f8' },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
});

const Login = () => {
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
      .post('http://localhost:3000/api/', input)
      .then((response) => {
        console.log('Login success:', response.data);
        setErrorMessage('');
        setSuccessMessage('Login successful!');
        // ✅ Redirect logic here if needed
      })
      .catch((error) => {
        console.error('Login error:', error);
        setErrorMessage('Login failed. Please check your credentials.');
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
          p: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 420,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            p: 4,
          }}
        >
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Smart City Login
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            Access your smart city dashboard
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

            {/* 🔹 Forgot Password */}
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Link
                component={RouterLink}
                to="/res"
                underline="hover"
                color="secondary"
                variant="body2"
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 3, py: 1 }}
            >
              <Link component={RouterLink} to="/home" underline="hover" >
                                            LOGIN</Link>
            </Button>
          </form>

          {/* ✅ Messages */}
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
            Don't have an account?{' '}
            <Link
              component={RouterLink}
              to="/signup"
              underline="hover"
              color="secondary"
            >
              Signup here
            </Link>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;

