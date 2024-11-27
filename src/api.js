import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Existing functions for roles and permissions
export const getPermissions = () => axios.get(`${BASE_URL}/permissions`);
export const getRoles = () => axios.get(`${BASE_URL}/roles`);
export const updateRole = (roleId, updatedRole) => axios.put(`${BASE_URL}/roles/${roleId}`, updatedRole);
export const fetchPermissionsForRole = async (roleId) => {
  const { data: roles } = await getRoles();
  const { data: permissions } = await getPermissions();
  
  const role = roles.find((r) => r.id === roleId);
  if (!role) return [];

  return role.permissions.map((permId) => permissions.find((p) => p.id === permId)?.name);
};

// Add the missing functions
// Fetch all users
export const getUsers = () => axios.get(`${BASE_URL}/users`);

// Delete a user by ID
export const deleteUser = (userId) => axios.delete(`${BASE_URL}/users/${userId}`);
