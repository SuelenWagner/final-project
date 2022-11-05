import { useEffect, useLayoutEffect, useState } from "react";
import { TextField, Button, Modal, Box, makeStyles } from "@material-ui/core";
import { ITech } from "../models/Techs";
import { updateTech } from "../services/techs-api";
import { EToastSeverity } from "../models/ToastSeverity";
import Toast from "../components/shared/Toast/Toast";

const useStyles = makeStyles((theme) => {
  return {
    textfield: {
      marginBottom: 16,
      "& label": {
        color: "#666",
      },
      "& label.Mui-focused": {
        color: "#666",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#666",
        },
        "&:hover fieldset": {
          borderColor: "#666",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#666",
        },
      },
      "& .MuiInputBase-root": {
        color: "#666",
      },
    },
    editModal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#666",
    },
    editModalBox: {
      padding: 30,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      height: 250,
      minWidth: 400,
      width: 600,
      backgroundColor: "#fff",
      borderRadius: "5px",
      flexWrap: "wrap",
    },
    editModalButtonSave: {
      fontSize: 14,
      color: "#3ada49",
      border: "1px solid #3ada49",
      justifyContent: "end",
      marginLeft: "auto",
      display: "flex",
    },
  };
});

interface ITechModal {
  isTechModalOpen: boolean;
  setTechModalOpen: Function;
  tech: ITech;
}

export default function TechModal({
  isTechModalOpen,
  setTechModalOpen,
  tech,
}: ITechModal) {
  const classes = useStyles();
  const [editedName, setEditedName] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState(
    EToastSeverity.SUCCESS
  );

  useEffect(() => {
    setEditedName(tech.name);
  }, [tech]);

  const handleTechName = (newName: string) => {
    setEditedName(newName);
  };

  const handleEditTech = async () => {
    try {
      await updateTech(tech.id, editedName);
      handleSnackbar(EToastSeverity.SUCCESS, "Tech editada com sucesso!");
    } catch (err) {
      handleSnackbar(EToastSeverity.ERROR, "Erro ao editar tech");
      console.warn(err);
    } finally {
      setTechModalOpen(false);
    }
  };

  const handleSnackbar = (severity: EToastSeverity, message: string) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    handleOpenSnackBar();
  };

  const handleOpenSnackBar = () => {
    setIsSnackbarOpen(!isSnackbarOpen);
  };

  return (
    <div>
      <Modal
        open={isTechModalOpen}
        onClose={() => {
          setTechModalOpen(false);
        }}
        className={classes.editModal}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(120, 120, 120, 0.05)",
          },
        }}
      >
        <Box className={classes.editModalBox}>
          <TextField
            onChange={(e) => handleTechName(e.target.value)}
            value={editedName}
            label="Alterar tecn"
            variant="outlined"
            className={classes.textfield}
            color="primary"
            fullWidth
            required
          />
          <Button
            type="button"
            variant="outlined"
            onClick={handleEditTech}
            className={classes.editModalButtonSave}
          >
            Salvar alterações
          </Button>
        </Box>
      </Modal>
      <Toast
        severity={snackbarSeverity}
        message={snackbarMessage}
        isOpen={isSnackbarOpen}
        handleSnackbar={handleOpenSnackBar}
      />
    </div>
  );
}
