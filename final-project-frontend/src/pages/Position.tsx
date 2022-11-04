import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { EToastSeverity } from "../models/ToastSeverity";

import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@material-ui/core";
import {
  getAllPositions,
  createPosition,
  deletePosition,
} from "../services/positions-api";
import { IPosition } from "../models/Positions";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Toast from "../components/shared/Toast/Toast";
import { useHistory } from "react-router-dom";
import PositionModal from "../components/PositionModal";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      marginTop: 30,
    },
    pageTitle: {
      marginBottom: 25,
      fontSize: 20,
    },
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
    listData: {
      width: "100%",
      //backgroundColor: "pink",
    },
    listDataText: {
      color: "#666",
    },
    search: {
      width: "100%",
      color: "#666",
      marginTop: "20px",
      marginBottom: "20px",
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
    editModalButtonBack: {
      fontSize: 14,
      color: "#2FA4FF",
      border: "1px solid #2FA4FF",
      justifyContent: "start",
      marginLeft: "auto",
      display: "flex",
    },
    button: {
      fontSize: 14,
      justifyContent: "space-between",
      marginBottom: 50,
    },
    buttonSubmit: {
      fontSize: 14,
      justifyContent: "right",
      color: "#3ada49",
      border: "1px solid #3ada49",
    },
    buttonBack: {
      marginRight: 50,
    },
    editIcon: {
      color: "#2FA4FF",
    },
    deleteIcon: {
      color: "#F86483",
    },
  };
});

export default function Position() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [positions, setPositions] = useState([] as IPosition[]);
  const [selectedPosition, setSelectedPosition] = useState({} as IPosition);
  const [filteredPositions, setFilteredPositions] = useState([] as IPosition[]);
  const [isPositionModalOpen, setPositionModalOpen] = useState(false);
  const history = useHistory();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState(
    EToastSeverity.SUCCESS
  );

  async function getPositions() {
    try {
      const { data } = await getAllPositions();
      const newPositions = data.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );

      setPositions(newPositions);
      setFilteredPositions(newPositions);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getPositions();
  }, []);

  useEffect(() => {
    if (!isPositionModalOpen) {
      getPositions();
    }
  }, [isPositionModalOpen]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newPosition = newName.trim();

    try {
      await createPosition(newPosition);
      clearForm();
      getPositions();
      handleSnackbar(
        EToastSeverity.SUCCESS,
        "Novo cargo cadastrado com sucesso!"
      );
    } catch (err) {
      handleSnackbar(EToastSeverity.ERROR, "Erro ao cadastrar cargo");
      console.error(err);
    }
  };

  const clearForm = () => {
    setNewName("");
    setName("");
  };

  const handleDeletePosition = async (id: string) => {
    try {
      await deletePosition(id);
      clearForm();
      handleSnackbar(EToastSeverity.WARNING, "Cargo deletado com sucesso!");
      getPositions();
    } catch (err) {
      console.error(err);
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

  const filterPositions = (name: string) => {
    if (name.length > 0) {
      const filteredPositions = positions.filter((p) =>
        p.name.toLowerCase().trim().includes(name.toLowerCase())
      );
      const pos = filteredPositions;
      setFilteredPositions(pos);
    } else {
      setFilteredPositions(positions);
    }
    setNewName(name);
    setName(name);
  };

  const handleOpenPositionModal = (position: IPosition) => {
    setPositionModalOpen(true);
    setSelectedPosition(position);
  };

  const goBackToDashboardPage = () => {
    history.push("/dashboard");
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <Typography color="primary" className={classes.pageTitle}>
          Cargo
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container item xs={12} md={12}>
            <Grid container>
              <TextField
                onChange={(e) => filterPositions(e.target.value)}
                label="Cadastre ou filtre por um cargo"
                variant="outlined"
                className={classes.textfield}
                color="primary"
                fullWidth
                required
                value={name}
              />

              <Grid container className={classes.button}>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.buttonBack}
                  onClick={() => {
                    goBackToDashboardPage();
                  }}
                >
                  Voltar ao dash
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  className={classes.buttonSubmit}
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
            <List className={classes.listData}>
              {positions &&
                filteredPositions.map((position: IPosition) => (
                  <div key={position.id}>
                    <ListItem alignItems="center">
                      <ListItemText
                        primary={position.name}
                        className={classes.listDataText}
                      />
                      <IconButton
                        onClick={() => {
                          handleOpenPositionModal(position);
                        }}
                      >
                        <EditIcon className={classes.editIcon} />
                      </IconButton>

                      <IconButton
                        onClick={() => handleDeletePosition(position.id)}
                      >
                        <DeleteIcon className={classes.deleteIcon} />
                      </IconButton>
                    </ListItem>
                    <Divider variant="fullWidth" component="li" />
                  </div>
                ))}

              <PositionModal
                position={selectedPosition}
                setModalPositionOpen={setPositionModalOpen}
                isPositionModalOpen={isPositionModalOpen}
              />
            </List>
          </Grid>
        </form>
      </Container>
      <Toast
        severity={snackbarSeverity}
        message={snackbarMessage}
        isOpen={isSnackbarOpen}
        handleSnackbar={handleOpenSnackBar}
      />
    </div>
  );
}
