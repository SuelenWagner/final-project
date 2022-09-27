import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import MuiAlert from "@material-ui/lab/Alert";

import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  Snackbar,
  ListItemText,
  Divider,
  IconButton,
} from "@material-ui/core";
import { getAllTechs, createTech, deleteTech } from "../../services/techs-api";
import { iTechs } from "../../models/Techs";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    listDataName: {
      display: "inline",
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
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [techs, setTechs] = useState([] as iTechs[]);
  const [filteredTechs, setFilteredTechs] = useState([] as iTechs[]);

  console.log(techs);
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
    } catch (err) {
      handleSnackbar();
      console.error(err);
    }
  };

  const handleSnackbar = () => {
    setIsSnackbarOpen(!isSnackbarOpen);
  };

  const handleDeleteTech = async (id: string) => {
    try {
      await deleteTech(id);
      getTechs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleTechs = (name: string) => {
    if (name.length > 0) {
      const filteredTechnologies = techs.filter((t) =>
        t.name.trim().toLowerCase().includes(name)
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
                      <ListItemText primary={tech.name} />
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

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbar}
      >
        <Alert onClose={handleSnackbar} severity="error">
          Erro ao cadastrar nova tecnologia
        </Alert>
      </Snackbar>
    </div>
  );
}
