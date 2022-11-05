import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { EToastSeverity } from "../models/ToastSeverity";
import Toast from "../components/shared/Toast/Toast";
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
  Modal,
  Box,
} from "@material-ui/core";
import { getAllTechs, createTech, deleteTech } from "../services/techs-api";
import { ITech } from "../models/Techs";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import TechModal from "../components/TechModal";

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
    editModal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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

export default function Tech() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [techs, setTechs] = useState([] as ITech[]);
  const [newName, setNewName] = useState("");
  const [filteredTechs, setFilteredTechs] = useState([] as ITech[]);
  const [selectedTech, setSelectedTech] = useState({} as ITech);
  const [isTechModalOpen, setTechModalOpen] = useState(false);
  const history = useHistory();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState(
    EToastSeverity.SUCCESS
  );

  async function getTechs() {
    try {
      const { data } = await getAllTechs();
      const newTechs = data.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );

      setTechs(newTechs);
      setFilteredTechs(newTechs);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTechs();
  }, []);

  useEffect(() => {
    if (!isTechModalOpen) {
      getTechs();
    }
  }, [isTechModalOpen]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newTech = newName.trim();

    try {
      await createTech(newTech);
      clearForm();
      getTechs();
      handleSnackbar(
        EToastSeverity.SUCCESS,
        "Nova tecnologia cadastrada com sucesso!"
      );
    } catch (err) {
      handleSnackbar(EToastSeverity.ERROR, "Erro ao cadastrar tecnologia");
      console.error(err);
    }
  };

  const clearForm = () => {
    setNewName("");
    setName("");
  };

  const handleDeleteTech = async (id: string) => {
    try {
      await deleteTech(id);
      clearForm();
      handleSnackbar(
        EToastSeverity.WARNING,
        "Tecnologia deletada com sucesso!"
      );
      getTechs();
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

  const filterTechs = (name: string) => {
    if (name.length > 0) {
      const filteredTechs = techs.filter((p) =>
        p.name.toLowerCase().trim().includes(name.toLowerCase())
      );
      const technologies = filteredTechs;
      setFilteredTechs(technologies);
    } else {
      setFilteredTechs(techs);
    }
    setNewName(name);
    setName(name);
  };

  const handleOpenTechModal = (tech: ITech) => {
    setTechModalOpen(true);
    setSelectedTech(tech);
  };

  const goBackToDashboardPage = () => {
    history.push("/dashboard");
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <Typography color="primary" className={classes.pageTitle}>
          Tecnologias
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container item xs={12} md={12}>
            <Grid container>
              <TextField
                onChange={(e) => filterTechs(e.target.value)}
                value={name}
                label="Cadastre ou filtre por tecnologias, skills, idiomas entre outros"
                variant="outlined"
                className={classes.textfield}
                color="primary"
                fullWidth
                required
                inputProps={{ maxLength: 100 }}
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
              {techs &&
                filteredTechs.map((tech: ITech) => (
                  <div key={tech.id}>
                    <ListItem alignItems="center">
                      <ListItemText
                        primary={tech.name}
                        className={classes.listDataText}
                      />
                      <IconButton
                        onClick={() => {
                          handleOpenTechModal(tech);
                        }}
                      >
                        <EditIcon className={classes.editIcon} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTech(tech.id)}>
                        <DeleteIcon className={classes.deleteIcon} />
                      </IconButton>
                    </ListItem>
                    <Divider variant="fullWidth" component="li" />
                  </div>
                ))}

              <TechModal
                tech={selectedTech}
                setTechModalOpen={setTechModalOpen}
                isTechModalOpen={isTechModalOpen}
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
