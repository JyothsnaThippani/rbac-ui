import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = ({ toggleTheme, mode, onMenuClick }) => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#304945' }}>
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          sx={{
            mr: 2, 
            '&:hover': {
              color: '#fff', 
              transform: 'scale(1.1)', 
              transition: 'transform 0.3s, color 0.3s', 
            }
          }} 
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          RBAC System
        </Typography>
        <IconButton 
          color="inherit" 
          onClick={toggleTheme}
          sx={{
            '&:hover': {
              color: '#fff', 
              transform: 'scale(1.1)', 
              transition: 'transform 0.3s, color 0.3s', 
            }
          }}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
