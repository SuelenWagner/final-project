import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { EToastSeverity } from "../../models/ToastSeverity";

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
} from "../../services/positions-api";
import { iPositions } from "../../models/Positions";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Toast from "../../components/shared/Toast/Toast";

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
    buttonSubmit: {
      fontSize: 14,
      justifyContent: "right",
    },
  };
});

export default function Position() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [positions, setPositions] = useState([] as iPositions[]);
  const [filteredPositions, setFilteredPositions] = useState(
    [] as iPositions[]
  );
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(
    EToastSeverity.SUCCESS
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");

  console.log(positions);
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newPosition = name.trim();

    try {
      await createPosition(newPosition);
      setName("");
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

  const handleDeletePosition = async (id: string) => {
    try {
      await deletePosition(id);
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

  const handlePositions = (name: string) => {
    if (name.length > 0) {
      const filteredPositions = positions.filter((p) =>
        p.name.trim().includes(name)
      );
      const pos = filteredPositions;
      setFilteredPositions(pos);
    } else {
      setFilteredPositions(positions);
    }

    setName(name);
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <Typography color="primary" className={classes.pageTitle}>
          Cargos de trabalho
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container item xs={12} md={12}>
            <Grid container className={classes.buttonSubmit}>
              <TextField
                onChange={(e) => handlePositions(e.target.value)}
                value={name}
                label="Cadastre ou filtre por um cargo"
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
              {positions &&
                filteredPositions.map((position: iPositions) => (
                  <div key={position.id}>
                    <ListItem alignItems="center">
                      <ListItemText primary={position.name} />
                      <IconButton
                        onClick={() => handleDeletePosition(position.id)}
                      >
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
