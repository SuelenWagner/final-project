import React, { useEffect, useState } from "react";
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
  Modal,
  Box,
} from "@material-ui/core";
import { getAllTechs, createTech, deleteTech } from "../services/techs-api";
import { iTechs } from "../models/Techs";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Toast from "../components/shared/Toast/Toast";
import { useHistory } from "react-router-dom";

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
      justifyContent: "right",
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
  const [techs, setTechs] = useState([] as iTechs[]);
  const [newName, setNewName] = useState("");
  const [filteredTechs, setFilteredTechs] = useState([] as iTechs[]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(
    EToastSeverity.SUCCESS
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();

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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newTechs = name.trim();

    try {
      await createTech(newTechs);
      setName("");
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

  const handleNewTechs = (newName: string) => {
    setNewName(newName);
  };

  const handleEditTech = (newName: string) => {
    const aaa = filteredTechs.filter((fp) => fp.name === newName);
    console.log(aaa);
    //   try {
    //     await updateTech(name);
    //     getTechs();
    //   } catch (err) {
    //     console.error(err);
    //   }
  };

  const handleDeleteTech = async (id: string) => {
    try {
      await deleteTech(id);
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

  const handleTechs = (name: string) => {
    if (name.length > 0) {
      const filteredTechnologies = techs.filter((t) =>
        t.name.trim().includes(name)
      );
      const technologies = filteredTechnologies;
      setFilteredTechs(technologies);
    } else {
      setFilteredTechs(techs);
    }

    setName(name);
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
                onChange={(e) => handleTechs(e.target.value)}
                value={name}
                label="Cadastre ou filtre por tecnologias, skills, idiomas entre outros"
                variant="outlined"
                className={classes.textfield}
                color="primary"
                fullWidth
                required
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

              {/* <Button
                type="submit"
                variant="outlined"
                className={classes.buttonSubmit}
                disabled={name === ""}
              >
                Salvar
              </Button>*/}
            </Grid>

            <List className={classes.listData}>
              {techs &&
                filteredTechs.map((tech: iTechs) => (
                  <div key={tech.id}>
                    <ListItem alignItems="center">
                      <ListItemText
                        primary={tech.name}
                        className={classes.listDataText}
                      />
                      <IconButton onClick={() => handleOpen()}>
                        <EditIcon className={classes.editIcon} />
                      </IconButton>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        className={classes.editModal}
                        BackdropProps={{
                          style: {
                            backgroundColor: "rgba(120, 120, 120, 0.04)",
                          },
                        }}
                      >
                        <Box className={classes.editModalBox}>
                          <TextField
                            onChange={(e) => handleEditTech(e.target.value)}
                            value={name}
                            label="Alterar tech"
                            variant="outlined"
                            className={classes.textfield}
                            color="primary"
                            fullWidth
                            required
                          />
                          <Button
                            type="submit"
                            variant="outlined"
                            className={classes.editModalButtonSave}
                          >
                            Salvar alterações
                          </Button>
                        </Box>
                      </Modal>

                      <IconButton onClick={() => handleDeleteTech(tech.id)}>
                        <DeleteIcon className={classes.deleteIcon} />
                      </IconButton>
                    </ListItem>
                    <Divider variant="fullWidth" component="li" />
                  </div>
                ))}
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
