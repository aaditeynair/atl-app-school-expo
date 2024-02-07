/* eslint-disable react/prop-types */

import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const AlertCustom = forwardRef(function AlertCustom(props, ref) {
  return <Alert elevation={4} ref={ref} variant="filled" {...props} />;
});

const SnackbarMessage = ({ open, message, severity, handleClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <AlertCustom onClose={handleClose} severity={severity}>
        {message}
      </AlertCustom>
    </Snackbar>
  );
};

export default SnackbarMessage;
