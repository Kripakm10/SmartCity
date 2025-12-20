import React from "react";
import {
  Box,
  CssBaseline,
  Typography,
  createTheme,
  ThemeProvider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import {
  Dashboard,
  DeleteOutline,
  Opacity,
  ReportProblem,
  People,
  Settings,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Navbar from "./Navbar";

// 🎨 Same theme as other pages
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#009688" }, // Teal
    secondary: { main: "#ff7043" }, // Coral
    background: { default: "#f0f4f8" },
  },
  typography: { fontFamily: "Roboto, sans-serif" },
});

const drawerWidth = 240;

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={{ bgcolor: "#fff", height: "100%" }}>
      <Typography
        variant="h5"
        color="primary"
        sx={{ p: 2, fontWeight: "bold", textAlign: "center" }}
      >
        Admin Panel
      </Typography>
      <List>
        {[
          { text: "Dashboard Overview", icon: <Dashboard /> },
          { text: "Waste Management", icon: <DeleteOutline /> },
          { text: "Water Supply", icon: <Opacity /> },
          { text: "Grievance Reports", icon: <ReportProblem /> },
          { text: "User Management", icon: <People /> },
          { text: "Settings", icon: <Settings /> },
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{
              "&:hover": {
                bgcolor: "rgba(0,150,136,0.1)",
                borderLeft: "4px solid #009688",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#009688" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />

      <Box sx={{ display: "flex" }}>
        {/* 🔹 AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: "#009688",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Smart City Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* 🔹 Sidebar Drawer */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* 🔹 Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: 8,
          }}
        >
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bold", mb: 4 }}
          >
            Dashboard Overview
          </Typography>

          {/* ✅ Stats Grid */}
          <Grid container spacing={3}>
            {[
              {
                title: "Active Waste Collection Points",
                value: "128",
                color: "#009688",
              },
              {
                title: "Water Supply Monitors Active",
                value: "42",
                color: "#2196f3",
              },
              {
                title: "Grievances Resolved",
                value: "89%",
                color: "#ff7043",
              },
              {
                title: "Registered Citizens",
                value: "12,540",
                color: "#8bc34a",
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: stat.color,
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "text.primary" }}
                  >
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* ✅ Activity & Reports Section */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h5"
              color="secondary"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              Recent Activity
            </Typography>

            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="body1" color="text.secondary" paragraph>
                • Waste collection completed in Sector 9.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                • New water leak detected and repaired in Block C.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                • 12 new grievances resolved this week.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                • Smart bins fill-level analytics updated successfully.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
