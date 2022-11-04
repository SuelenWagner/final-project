import { useEffect, useLayoutEffect, useState } from "react";
import { TextField, Button, Modal, Box, makeStyles } from "@material-ui/core";
import { ITech } from "../models/Techs";
import { updateTech } from "../services/techs-api";

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

  useEffect(() => {
    setEditedName(tech.name);
  }, [tech]);

  const handleTechName = (newName: string) => {
    setEditedName(newName);
  };

  const handleEditTech = async () => {
    try {
      await updateTech(tech.id, editedName);
    } catch (err) {
      console.warn(err);
    } finally {
      setTechModalOpen(false);
    }
  };

  return (
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
  );
}
