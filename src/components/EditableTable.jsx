import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const EditableTable = ({ rows, columns, title }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default EditableTable;
