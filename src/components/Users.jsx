import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Modal,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [openZoom, setOpenZoom] = useState(false);
  const [currentZoomContent, setCurrentZoomContent] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (newUserName && newUserRole) {
      const newUser = { 
        name: newUserName.trim(), 
        role: newUserRole.trim(), 
        status: 'Active'
      };
  
      try {
        const response = await axios.post('http://localhost:5000/users', newUser);
        setUsers([...users, response.data]);
        setNewUserName('');
        setNewUserRole('');
      } catch (error) {
        console.error('Error adding user:', error);
      }
    } else {
      alert('Please fill out all fields before adding a user.');
    }
  };
  
  const handleProcessRowUpdate = async (newRow) => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${newRow.id}`, newRow);
      const updatedUsers = users.map((user) =>
        user.id === newRow.id ? { ...response.data } : user
      );
      setUsers(updatedUsers);
      return newRow;
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleZoom = (content) => {
    setCurrentZoomContent(content);
    setOpenZoom(true);
  };

  const handleCloseZoom = () => {
    setCurrentZoomContent(null);
    setOpenZoom(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200, editable: true },
    { field: 'role', headerName: 'Role', width: 200, editable: true },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Active', 'Inactive'], 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit User">
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
            <IconButton color="error" onClick={() => handleDeleteUser(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Typography variant="body1" gutterBottom color="text.secondary">
        Create, update, and manage users and their roles in the system. Ensure user roles align with organizational policies.
      </Typography>
      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        {/* Add User Form Card */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={3}
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                cursor: 'pointer',
              },
            }}
            onClick={() => handleZoom('addUserForm')}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add a New User
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Specify the user name and assign a role to add a new user.
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="User Name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="User Role"
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddUser}
                sx={{ ml: 2 }}
              >
                Add User
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Users Table Card */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={3}
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                cursor: 'pointer',
              },
            }}
            onClick={() => handleZoom('usersTable')}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Users List
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Review and manage the list of users. Edit or delete user details as needed.
              </Typography>
              <Box
                sx={{
                  height: { xs: 300, sm: 400 }, 
                  width: '100%',
                  mt: 2,
                }}
              >
                <DataGrid
                  rows={users}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  sx={{ border: 'none' }}
                  processRowUpdate={handleProcessRowUpdate}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Zoom Modal */}
      <Modal
        open={openZoom}
        onClose={handleCloseZoom}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'transform 0.3s ease',
        }}
      >
        <Box
          sx={{
            width: '90%',
            height: '90%',
            backgroundColor: 'background.paper',
            p: 3,
            boxShadow: 24,
            borderRadius: 2,
            overflow: 'auto',
            transform: 'scale(0.9)',
            transition: 'transform 0.3s ease',
          }}
        >
          {currentZoomContent === 'addUserForm' && (
            <>
              <Typography variant="h6" gutterBottom>
                Add a New User
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="User Name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="User Role"
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button variant="contained" onClick={handleAddUser} sx={{ mt: 2 }}>
                Add User
              </Button>
            </>
          )}
          {currentZoomContent === 'usersTable' && (
            <>
              <Typography variant="h6" gutterBottom>
                Users Table
              </Typography>
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                processRowUpdate={handleProcessRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default UsersPage;
