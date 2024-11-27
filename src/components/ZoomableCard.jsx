import React, { useState } from 'react';
import { Card, CardContent, Typography, Dialog, DialogActions, DialogContent, Button } from '@mui/material';

const ZoomableCard = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
        <CardContent>
          <Typography variant="h6">{user.name}</Typography>
          <Typography color="text.secondary">{user.role}</Typography>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogContent>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="h6" color="text.secondary">
            Role: {user.role}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ZoomableCard;
