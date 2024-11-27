import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showSnackbar = (msg, sev = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const SnackbarComponent = () => (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={() => setOpen(false)} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
};
