import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';

const Sidebar = ({ open, onClose }) => {
  const [active, setActive] = useState('');

  const handleItemClick = (item) => {
    setActive(item); 
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#304945', 
        },
      }}
    >
      <Box sx={{ width: 240 }}>
        <Typography variant="h6" sx={{ p: 2, color: '#fff' }}>
          RBAC System
        </Typography>
        <Divider />
        <List>
          {/* Dashboard */}
          <ListItem 
            button 
            component="a" 
            href="/dashboard"
            onClick={() => handleItemClick('dashboard')}
            sx={{
              '&:hover': {
                backgroundColor: '#506C67', 
                color: '#fff',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s, background-color 0.2s',
              },
              backgroundColor: active === 'dashboard' ? '#4B7A73' : 'transparent', 
              color: active === 'dashboard' ? '#fff' : 'inherit', 
            }}
          >
            <ListItemIcon sx={{ color: active === 'dashboard' ? '#fff' : '#fff' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: active === 'dashboard' ? '#fff' : '#fff' }} />
          </ListItem>

          {/* Users */}
          <ListItem 
            button 
            component="a" 
            href="/users"
            onClick={() => handleItemClick('users')}
            sx={{
              '&:hover': {
                backgroundColor: '#506C67', 
                color: '#fff',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s, background-color 0.2s',
              },
              backgroundColor: active === 'users' ? '#4B7A73' : 'transparent', 
              color: active === 'users' ? '#fff' : 'inherit', 
            }}
          >
            <ListItemIcon sx={{ color: active === 'users' ? '#fff' : '#fff' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" sx={{ color: active === 'users' ? '#fff' : '#fff' }} />
          </ListItem>

          {/* Roles */}
          <ListItem 
            button 
            component="a" 
            href="/roles"
            onClick={() => handleItemClick('roles')}
            sx={{
              '&:hover': {
                backgroundColor: '#506C67', 
                color: '#fff',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s, background-color 0.2s',
              },
              backgroundColor: active === 'roles' ? '#4B7A73' : 'transparent', 
              color: active === 'roles' ? '#fff' : 'inherit', 
            }}
          >
            <ListItemIcon sx={{ color: active === 'roles' ? '#fff' : '#fff' }}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Roles" sx={{ color: active === 'roles' ? '#fff' : '#fff' }} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
