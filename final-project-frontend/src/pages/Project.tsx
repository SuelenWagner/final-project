import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
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
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@material-ui/core";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../services/projects-api";
import Toast from "../components/shared/Toast/Toast";
import { getAllClients } from "../services/clients-api";
import { IClient } from "../models/Clients";
import { IProject, EProjectStatus } from "../models/Projects";
import { EToastSeverity } from "../models/ToastSeverity";
import { useParams, useHistory } from "react-router-dom";

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
      width: 300,
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
    gridInline: {
      display: "flex",
      justifyContent: "space-between",
    },
  };
});

type ProjectId = {
  projectId: string;
};

export default function Project() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Em Progresso");
  //const [startDate, setStartDate] = useState("");
  //const [finishDate, setFinishDate] = useState("");
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});
  const [project, setProject] = useState({} as IProject);
  const [projects, setProjects] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(
    EToastSeverity.SUCCESS
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const params: ProjectId = useParams();
  const history = useHistory();

  async function getProject(id: string) {
    try {
      const { data }: any = await getProjectById(id);
      setProject(data);
      setName(data.name);
      setDescription(data.description);
      setStatus(data.status);
      setClient(data.client);
    } catch {
      handleSnackbar(EToastSeverity.ERROR, "Projeto não encontrado");
    }
  }

  useEffect(() => {
    if (params?.projectId) {
      getProject(params.projectId);
    }
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

    const projectName = name.trim();
    if (params?.projectId) {
      editProject(projectName, description);
    } else {
      createNewProject(projectName, description);
    }
  };

  const editProject = async (name: string, description: string) => {
    try {
      await updateProject(params.projectId, name, description);
      handleSnackbar(EToastSeverity.SUCCESS, "Projeto editado com sucesso!");
      goToDashboardPage();
    } catch (err) {
      handleSnackbar(EToastSeverity.ERROR, "Erro ao editar projeto");
    }
  };

  const createNewProject = async (newProject: string, description: string) => {
    try {
      await createProject(newProject, description);
      clearForm();
      handleSnackbar(
        EToastSeverity.SUCCESS,
        "Novo Projeto cadastrado com sucesso!"
      );
      goToDashboardPage();
    } catch (err) {
      handleSnackbar(EToastSeverity.ERROR, "Erro ao cadastrar projeto");
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

  // const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setStatus(event.target.value as string);
  // };

  // const handleClientChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setClient(event.target.value as string);
  // };

  // const handleManagerChange = (
  //   event: React.ChangeEvent<{ value: unknown }>
  // ) => {
  //   setManager(event.target.value as string);
  // };

  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   setTitleError(false);
  //   setDetailsError(false);

  //   if (title === "" || details === "") setTitleError(true);
  // };

  const getClients = async () => {
    try {
      const { data } = await getAllClients();
      setClients(data);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleProjectName = (value: string) => {
    setName(value);
  };

  const handleProjectDescription = (value: string) => {
    setDescription(value);
  };

  const handleProjectClient = (value: any) => {
    setClient(value);
  };

  const handleProjectStatus = (value: EProjectStatus) => {
    setStatus(value);
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <Typography color="primary" className={classes.pageTitle}>
          Projeto
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid item xs={12} md={12} direction="column">
            <TextField
              onChange={(e) => handleProjectName(e.target.value)}
              value={name}
              label="Nome do projeto"
              variant="outlined"
              className={classes.textfield}
              color="primary"
              fullWidth
              required
            />

            <TextField
              onChange={(e) => handleProjectDescription(e.target.value)}
              value={description}
              label="Descrição do projeto"
              placeholder="Este projeto se trata de um gerenciador de projetos..."
              variant="outlined"
              className={classes.textfield}
              color="primary"
              multiline
              rows={4}
              fullWidth
              required
            />
            <FormControl
              variant="outlined"
              className={classes.textfield}
              fullWidth
            >
              <InputLabel>Cliente</InputLabel>
              <Select
                value={client}
                onChange={(e) => handleProjectClient(e.target.value)}
                label="Client"
              >
                {clients &&
                  clients.map((client: IClient) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <Grid container className={classes.gridInline}>
              <FormControl
                variant="outlined"
                required
                fullWidth
                className={classes.selectStatus}
              >
                <InputLabel>Status</InputLabel>
                <Select value={status} label="Status">
                  {projects &&
                    projects.map((status: IProject) => (
                      <MenuItem key={project.status} value={project.status}>
                        {project.status}
                      </MenuItem>
                    ))}
                  <MenuItem value={20}>Em andamento mock</MenuItem>
                  <MenuItem value={30}>Cancelado mock</MenuItem>
                  <MenuItem value={40}>Concluído mock</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Data de início"
                type="date"
                defaultValue="dd/MM/AAAA"
                variant="outlined"
                className={classes.dateTextfield}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="Data de término"
                type="date"
                defaultValue="dd/MM/AAAA"
                variant="outlined"
                className={classes.dateTextfield}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
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
              {project?.id ? "Editar" : "Salvar"}
            </Button>
          </Grid>

          <Grid item xs={12} md={12} direction="column">
            <Typography color="primary">
              Colaboradores que trabalham neste projeto
            </Typography>

            {project.employees ? (
              <>
                <List className={classes.listEmployees}>
                  {project?.employees?.map((employee: any) => (
                    <ListItem alignItems="flex-start" key={employee.id}>
                      <ListItemAvatar>
                        <Avatar>{employee.fullName[0].toUpperCase()}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={employee.fullName}
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.listEmployeesName}
                            color="textPrimary"
                          >
                            Desenvolvedor Backend
                            {employee.position}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                  <Divider variant="inset" component="li" />
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
