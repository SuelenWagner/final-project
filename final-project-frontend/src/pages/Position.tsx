import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../components/NavBar";
import MuiAlert from "@material-ui/lab/Alert";

import {
  makeStyles,
  Container,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  Snackbar,
  ListItemText,
  Divider,
  IconButton,
} from "@material-ui/core";
import {
  getAllPositions,
  createPosition,
  deletePosition,
} from "../services/positions-api";
import { iPositions } from "../models/Positions";
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
    dateTextfield: {
      width: 220,
      marginBottom: 40,
      marginRight: 40,
      marginLeft: 4,
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
    },
    selectStatus: {
      width: 220,
      marginBottom: 40,
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
    },
    listEmployees: {
      width: "100%",
      //backgroundColor: "pink",
    },
    listEmployeesName: {
      display: "inline",
      color: "#666",
    },
    buttonSubmit: {
      fontSize: 14,
      justifyContent: "right",
    },
  };
});

export default function Client() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [status, setStatus] = useState("");
  const [client, setClient] = useState("");
  const [manager, setManager] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [positions, setPositions] = useState([] as iPositions[]);

  async function getPositions() {
    try {
      const response = await getAllPositions();
      const newPositions = response.data.content.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );

      setPositions(newPositions);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getPositions();
  }, []);

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  const handleClientChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClient(event.target.value as string);
  };

  const handleManagerChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setManager(event.target.value as string);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newPosition = name.trim();

    try {
      await createPosition(newPosition);
      setName("");
      getPositions();
    } catch (err) {
      handleSnackbar();
      console.error(err);
    }
  };

  const handleSnackbar = () => {
    setIsSnackbarOpen(!isSnackbarOpen);
  };

  const handleDeletePosition = async (id: string) => {
    try {
      await deletePosition(id);
      getPositions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <Typography color="secondary" className={classes.pageTitle}>
          Funções - Papéis de trabalho
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container item xs={12} md={9}>
            <Grid container className={classes.buttonSubmit}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                value={name}
                label="Nome do papel"
                variant="outlined"
                className={classes.textfield}
                color="primary"
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                disabled={name === ""}
              >
                Salvar
              </Button>
            </Grid>

            <List className={classes.listEmployees}>
              {positions &&
                positions.map((position: iPositions) => (
                  <div key={position.id}>
                    <ListItem alignItems="flex-start">
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

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbar}
      >
        <Alert onClose={handleSnackbar} severity="error">
          Erro ao cadastrar novo papel
        </Alert>
      </Snackbar>
    </div>
  );
}
