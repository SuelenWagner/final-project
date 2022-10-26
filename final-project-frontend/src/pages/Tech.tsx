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
} from "@material-ui/core";
import { getAllTechs, createTech, deleteTech } from "../services/techs-api";
import { iTechs } from "../models/Techs";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Toast from "../components/shared/Toast/Toast";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      //backgroundColor: "pink",
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
    buttonSubmit: {
      fontSize: 14,
      justifyContent: "right",
    },
  };
});

export default function Tech() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [techs, setTechs] = useState([] as iTechs[]);
  const [filteredTechs, setFilteredTechs] = useState([] as iTechs[]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(
    EToastSeverity.SUCCESS
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <Typography color="primary" className={classes.pageTitle}>
          Tecnologias
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container item xs={12} md={12}>
            <Grid container className={classes.buttonSubmit}>
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
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={name === ""}
              >
                Salvar
              </Button>
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
                      <IconButton onClick={() => handleDeleteTech(tech.id)}>
                        <DeleteOutlineIcon />
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
