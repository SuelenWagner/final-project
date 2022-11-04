import { useEffect, useLayoutEffect, useState } from "react";
import { TextField, Button, Modal, Box, makeStyles } from "@material-ui/core";
import { IPosition } from "../models/Positions";
import { updatePosition } from "../services/positions-api";

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

interface IPositionModal {
  isPositionModalOpen: boolean;
  setModalPositionOpen: Function;
  position: IPosition;
}

export default function PositionModal({
  isPositionModalOpen,
  setModalPositionOpen,
  position,
}: IPositionModal) {
  const classes = useStyles();
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    setEditedName(position.name);
  }, [position]);

  const handlePositionName = (newName: string) => {
    setEditedName(newName);
  };

  const handleEditPosition = async () => {
    try {
      await updatePosition(position.id, editedName);
    } catch (err) {
      console.warn(err);
    } finally {
      setModalPositionOpen(false);
    }
  };

  return (
    <Modal
      open={isPositionModalOpen}
      onClose={() => {
        setModalPositionOpen(false);
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
          onChange={(e) => handlePositionName(e.target.value)}
          value={editedName}
          label="Alterar cargo"
          variant="outlined"
          className={classes.textfield}
          color="primary"
          fullWidth
          required
        />
        <Button
          type="button"
          variant="outlined"
          onClick={handleEditPosition}
          className={classes.editModalButtonSave}
        >
          Salvar alterações
        </Button>
      </Box>
    </Modal>
  );
}
