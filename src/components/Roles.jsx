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
  Checkbox,
  FormControlLabel,
  FormGroup,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [permissions, setPermissions] = useState({ read: false, write: false, delete: false });
  const [openZoom, setOpenZoom] = useState(false);
  const [currentZoomContent, setCurrentZoomContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleAddRole = async () => {
    if (newRoleName && (permissions.read || permissions.write || permissions.delete)) {
      const newRole = { name: newRoleName.trim(), permissions };
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/roles', newRole);
        setRoles([...roles, response.data]);
        setNewRoleName('');
        setPermissions({ read: false, write: false, delete: false });
      } catch (error) {
        console.error('Error adding role:', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill out all fields and select at least one permission.');
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/roles/${id}`);
      setRoles(roles.filter((role) => role.id !== id));
    } catch (error) {
      console.error('Error deleting role:', error);
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

  const handlePermissionChange = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Role Name', width: 200, editable: true },
    {
      field: 'permissions',
      headerName: 'Permissions',
      width: 300,
      renderCell: (params) => {
        const { read, write, delete: del } = params.row.permissions || {};
        return (
          <Box>
            {read && <Typography>Read</Typography>}
            {write && <Typography>Write</Typography>}
            {del && <Typography>Delete</Typography>}
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit Role">
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Role">
            <IconButton color="error" onClick={() => handleDeleteRole(params.row.id)}>
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
        Manage Roles
      </Typography>
      <Typography variant="body1" gutterBottom color="text.secondary">
        Assign roles and permissions to users. Manage and update the permissions for different roles.
      </Typography>
      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        {/* Add Role Form Card */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={3}
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)', cursor: 'pointer' },
            }}
            onClick={() => handleZoom('addRoleForm')}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add a New Role
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Specify the role name and permissions to add a new role.
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Role Name"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Permissions
                  </Typography>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permissions.read}
                          onChange={handlePermissionChange}
                          name="read"
                        />
                      }
                      label="Read"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permissions.write}
                          onChange={handlePermissionChange}
                          name="write"
                        />
                      }
                      label="Write"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permissions.delete}
                          onChange={handlePermissionChange}
                          name="delete"
                        />
                      }
                      label="Delete"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddRole}
                sx={{ ml: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Add Role'}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Roles Table Card */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={3}
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)', cursor: 'pointer' },
            }}
            onClick={() => handleZoom('rolesTable')}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Roles List
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage the existing roles and their permissions.
              </Typography>
              <Box sx={{ height: 400, width: '100%', mt: 2 }}>
                <DataGrid
                  rows={roles}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
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
          }}
        >
          {currentZoomContent === 'addRoleForm' && (
            <>
              <Typography variant="h6" gutterBottom>
                Add a New Role
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Role Name"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Permissions
                  </Typography>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permissions.read}
                          onChange={handlePermissionChange}
                          name="read"
                        />
                      }
                      label="Read"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permissions.write}
                          onChange={handlePermissionChange}
                          name="write"
                        />
                      }
                      label="Write"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permissions.delete}
                          onChange={handlePermissionChange}
                          name="delete"
                        />
                      }
                      label="Delete"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </>
          )}
          {currentZoomContent === 'rolesTable' && (
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid rows={roles} columns={columns} pageSize={5} />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default RolesPage;
