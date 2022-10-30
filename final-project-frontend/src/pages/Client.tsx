import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
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
} from "@material-ui/core";
import Toast from "../components/shared/Toast/Toast";
import { EToastSeverity } from "../models/ToastSeverity";
import {
  createClient,
  getClientById,
  updateClient,
} from "../services/clients-api";
import { IClient } from "../models/Clients";
import { useHistory, useParams } from "react-router-dom";

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
    listData: {
      width: "100%",
    },
    listDataText: {
      color: "#666",
    },
    button: {
      fontSize: 14,
      justifyContent: "right",
      marginBottom: 50,
    },
    buttonSubmit: {
      color: "#3ada49",
      border: "1px solid #3ada49",
    },
    buttonBack: {
      marginRight: 50,
    },
  };
});

type ClientId = {
  clientId: string;
};
export default function Client() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState({} as IClient);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(
    EToastSeverity.SUCCESS
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const history = useHistory();
  const params: ClientId = useParams();

  async function getClient(id: string) {
    try {
      const { data }: any = await getClientById(id);
      setClient(data);
      setDescription(data.description);
      setName(data.name);
    } catch {
      handleSnackbar(EToastSeverity.ERROR, "Cliente não encontrado");
    }
  }

  useEffect(() => {
    if (params?.clientId) {
      getClient(params.clientId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleSnackbar = (severity: EToastSeverity, message: string) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    handleOpenSnackBar();
  };

  const handleOpenSnackBar = () => {
    setIsSnackbarOpen(!isSnackbarOpen);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const clientName = name.trim();
    if (params?.clientId) {
      editClient(clientName, description);
    } else {
      createNewClient(clientName, description);
    }
  };

  const editClient = async (client: string, description: string) => {
    try {
      await updateClient(params.clientId, client, description);
      handleSnackbar(EToastSeverity.SUCCESS, "Cliente editado com sucesso!");
      goToDashboardPage();
    } catch (err) {
      handleSnackbar(EToastSeverity.ERROR, "Erro ao editar cliente");
    }
  };

  const createNewClient = async (newClient: string, description: string) => {
    try {
      await createClient(newClient, description);
      clearForm();
      handleSnackbar(
        EToastSeverity.SUCCESS,
        "Novo cliente cadastrado com sucesso!"
      );
      goToDashboardPage();
    } catch (err) {
      handleSnackbar(EToastSeverity.ERROR, "Erro ao cadastrar cliente");
    }
  };

  const goToDashboardPage = () => {
    setTimeout(() => {
      history.push("/dashboard");
    }, 3000);
  };

  const goBackToDashboardPage = () => {
    history.push("/dashboard");
  };

  const clearForm = () => {
    setName("");
    setDescription("");
  };

  const handleClientName = (name: string) => {
    setName(name);
  };

  const handleClientDescription = (description: string) => {
    setDescription(description);
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <Typography color="primary" className={classes.pageTitle}>
          Cliente parceiro
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container item xs={12} md={12}>
            <TextField
              onChange={(e) => handleClientName(e.target.value)}
              value={name}
              label="Nome do Cliente"
              variant="outlined"
              className={classes.textfield}
              color="primary"
              fullWidth
              required
            />

            <TextField
              onChange={(e) => handleClientDescription(e.target.value)}
              value={description}
              className={classes.textfield}
              label="Descrição"
              placeholder="Insira aqui uma descrição sobre o cliente"
              variant="outlined"
              color="primary"
              multiline
              rows={4}
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
                {client?.id ? "Editar" : "Salvar"}
              </Button>
            </Grid>

            {client.projects ? (
              <>
                <Typography color="primary">
                  Projetos vinculados a este cliente
                </Typography>

                <List className={classes.listData}>
                  {client?.projects?.map((project: any) => (
                    <ListItem alignItems="center" key={project.id}>
                      <ListItemText
                        primary={project.name}
                        className={classes.listDataText}
                      />
                    </ListItem>
                  ))}

                  <Divider variant="fullWidth" component="li" />
                </List>
              </>
            ) : (
              <></>
            )}
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
