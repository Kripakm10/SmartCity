import React, { useState } from "react";
import {
  Box,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import Navbar from "./Navbar";

// 🎨 Same theme as the other pages
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#009688" }, // Teal
    secondary: { main: "#ff7043" }, // Coral
    background: { default: "#f0f4f8" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const WasteManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    wasteType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Waste collection application:", formData);
    alert("Your waste collection request has been submitted successfully!");
    setFormData({
      name: "",
      address: "",
      contact: "",
      wasteType: "",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />

      {/* 🔹 Hero Section */}
      <Box
        sx={{
          height: "60vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1590411208763-5e4c46dfc9b4?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(255,255,255,0.9)",
            p: 5,
            borderRadius: 3,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              background: "linear-gradient(90deg, #009688, #ff7043)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Smart Waste Management
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Using smart technologies to monitor, manage, and optimize city waste
            collection for a cleaner and more sustainable environment.
          </Typography>

          {/* ✳️ Added line */}
          <Typography variant="body1" color="text.secondary">
            Track garbage collection, recycling, and smart bins across the city
            to ensure cleanliness and sustainability.
          </Typography>
        </Box>
      </Box>

      {/* 🔹 About Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: 6 }, bgcolor: "#fff" }}>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          What is Smart Waste Management?
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ maxWidth: 900, mx: "auto" }}
        >
          Smart Waste Management is an IoT-enabled system that optimizes waste
          collection, recycling, and disposal through data analytics and
          real-time monitoring. Sensors in smart bins track fill levels,
          enabling efficient route planning and reducing unnecessary pickups.
          This approach saves time, energy, and operational costs while keeping
          the city cleaner and greener.
        </Typography>
      </Box>

      {/* 🔹 Key Features */}
      <Box sx={{ py: 8, px: { xs: 2, md: 6 }, bgcolor: "#f7fafc" }}>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          sx={{ fontWeight: "bold", mb: 6 }}
        >
          Key Features
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: "Smart Bins with IoT Sensors",
              desc: "Bins equipped with sensors detect fill levels and send data to the central system in real-time.",
              img: "https://images.unsplash.com/photo-1624381977216-6b1f48e3bfa1?auto=format&fit=crop&w=1200&q=80",
            },
            {
              title: "Route Optimization",
              desc: "AI-powered algorithms create efficient routes for waste collection vehicles, saving fuel and time.",
              img: "https://images.unsplash.com/photo-1615397349750-8c4efb8e3177?auto=format&fit=crop&w=1200&q=80",
            },
            {
              title: "Recycling Tracking",
              desc: "Smart systems help monitor recycling rates, reduce contamination, and encourage waste segregation.",
              img: "https://images.unsplash.com/photo-1618590999969-c397b9cb5a08?auto=format&fit=crop&w=1200&q=80",
            },
            {
              title: "Real-time Monitoring Dashboard",
              desc: "City officials can view live data on waste collection, bin status, and analytics for better planning.",
              img: "https://images.unsplash.com/photo-1618342244436-94481ffde7b0?auto=format&fit=crop&w=1200&q=80",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-8px)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={feature.img}
                  alt={feature.title}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🔹 Benefits Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: 6 }, bgcolor: "#fff" }}>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          sx={{ fontWeight: "bold", mb: 6 }}
        >
          Benefits of Smart Waste Management
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: "Cleaner Cities",
              desc: "Minimizes overflowing bins and keeps streets cleaner with timely waste collection.",
            },
            {
              title: "Operational Efficiency",
              desc: "Reduces collection trips and fuel consumption through optimized routes.",
            },
            {
              title: "Environmental Sustainability",
              desc: "Encourages recycling and decreases landfill waste for a greener future.",
            },
            {
              title: "Data-Driven Decisions",
              desc: "Provides actionable insights for city administrators to plan better waste policies.",
            },
          ].map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-8px)" },
                }}
              >
                <Typography
                  variant="h6"
                  color="secondary"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🔹 Apply Form Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: 6 }, bgcolor: "#f7fafc" }}>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Apply for Waste Collection
        </Typography>

        <Paper
          elevation={6}
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 4,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.95)",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              variant="outlined"
            />
            <TextField
              label="Contact Number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              variant="outlined"
            />
            <TextField
              label="Waste Type"
              name="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              <option value="">Select Waste Type</option>
              <option value="Municipal Solid Waste">Municipal Solid Waste</option>
              <option value="Biomedical Waste">Biomedical Waste</option>
              <option value="Hazardous Waste">Hazardous Waste</option>
              <option value="E-Waste">E-Waste</option>
              <option value="Construction and Demolition Waste">
                Construction and Demolition Waste
              </option>
              <option value="Agricultural Waste">Agricultural Waste</option>
              <option value="Plastic Waste">Plastic Waste</option>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 2, py: 1.2, fontWeight: "bold" }}
            >
              Apply
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default WasteManagement;
