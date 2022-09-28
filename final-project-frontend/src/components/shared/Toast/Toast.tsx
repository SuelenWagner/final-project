import { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { EToastSeverity } from "../../../models/ToastSeverity";
import MuiAlert from "@material-ui/lab/Alert";

interface IToast {
  severity: EToastSeverity;
  message: string;
  isOpen: boolean;
  handleSnackbar: () => void;
}

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Toast({
  severity,
  message,
  isOpen,
  handleSnackbar,
}: IToast) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    setIsSnackbarOpen(isOpen);
  }, [isOpen]);

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbar}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}
