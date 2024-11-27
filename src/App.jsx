import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './components/Dashboard';
import UsersPage from './components/Users';
import RolesPage from './components/Roles';

const App = () => {
  const [mode, setMode] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Navbar toggleTheme={toggleTheme} mode={mode} onMenuClick={handleMenuClick} />

        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <Box sx={{ display: 'flex', marginTop: '64px' }}>
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/roles" element={<RolesPage />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
};

export default App;
