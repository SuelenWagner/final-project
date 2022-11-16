import { useEffect, useState } from "react";
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
import { IProject } from "../models/Projects";
import { EToastSeverity } from "../models/ToastSeverity";
import { useParams, useHistory } from "react-router-dom";

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
      color: "#666",
      //backgroundColor: "pink",
    },
    listEmployeesOccupation: {
      display: "inline",
      color: "#a1a1a1",
    },
    button: {
      fontSize: 14,
      justifyContent: "space-between",
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
    employeeAvatar: {
      color: "#fff",
      backgroundColor: "#2FA4FF",
    },
  };
});

type ProjectId = {
  projectId: string;
};

const STATUS = [
  { key: "WAITING_START", value: "Aguardando início" },
  { key: "IN_PROGRESS", value: "Em andamento" },
  { key: "DONE", value: "Concluído" },
  { key: "CANCELED", value: "Cancelado" },
];

export default function Project() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [status, setStatus] = useState("");
  const [client, setClient] = useState({});
  const [clients, setClients] = useState([]);
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
      console.log(data);
      setData(data);
    } catch {
      handleSnackbar(EToastSeverity.ERROR, "Projeto não encontrado");
    }
  }

  const setData = (data: any) => {
    setProject(data);
    setName(data.name);
    setDescription(data.description);

    const startDateFormatted = data.startDate.slice(0, 10);
    const finishDateFormatted = data.finishDate.slice(0, 10);

    setStartDate(startDateFormatted);
    setFinishDate(finishDateFormatted);
    setStatus(data.status);
    setClient(data.client);
    console.log(data);
  };

  useEffect(() => {
    if (params?.projectId) {
      getProject(params.projectId);
    }
    getClients();
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
      editProject(
        projectName,
        description,
        startDate,
        finishDate,
        status,
        client
      );
    } else {
      createNewProject(
        projectName,
        description,
        startDate,
        finishDate,
        status,
        client
      );
    }
  };

  const editProject = async (
    name: string,
    description: string,
    startDate: string,
    finishDate: string,
    status: any,
    client: any
  ) => {
    try {
      await updateProject(
        params.projectId,
        name,
        description,
        startDate,
        finishDate,
        status,
        client
      );
      handleSnackbar(EToastSeverity.SUCCESS, "Projeto editado com sucesso!");
      goToDashboardPage();
    } catch (err) {
      handleSnackbar(EToastSeverity.ERROR, "Erro ao editar projeto");
    }
  };

  const createNewProject = async (
    newProject: string,
    description: string,
    startDate: string,
    finishDate: string,
    status: any,
    client: any
  ) => {
    try {
      await createProject(
        newProject,
        description,
        startDate,
        finishDate,
        status,
        client
      );
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
    setStartDate("");
    setFinishDate("");
    setStatus("");
  };

  const getClients = async () => {
    try {
      const { data } = await getAllClients();
      console.log(data);
      setClients(data);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    console.log(project.id);
    // console.log(clients);

    const proj = clients.filter((client: any) => {
      //return client.projects.includes(project);
      return client.projects.find((p: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        p.id === project.id;
      });
    });

    console.log(proj);
    //console.log(proj.includes(project));
  }, [clients, project]);

  const handleProjectName = (value: string) => {
    setName(value);
  };

  const handleProjectDescription = (value: string) => {
    setDescription(value);
  };

  const handleProjectStartDate = (date: string) => {
    setStartDate(date);
  };

  const handleProjectFinishDate = (date: string) => {
    setFinishDate(date);
  };

  const handleProjectStatus = (value: string) => {
    setStatus(value);
  };

  const handleProjectClient = (value: any) => {
    setClient(value);
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
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) =>
                    handleProjectStatus(e.target.value as string)
                  }
                >
                  {projects &&
                    STATUS.map((status: any) => (
                      <MenuItem key={status.key} value={status.key}>
                        {status.value}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <TextField
                label="Data de início"
                type="date"
                defaultValue={startDate}
                value={startDate}
                variant="outlined"
                className={classes.dateTextfield}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleProjectStartDate(e.target.value)}
              />

              <TextField
                label="Data de término"
                type="date"
                value={finishDate}
                defaultValue={finishDate}
                variant="outlined"
                className={classes.dateTextfield}
                onChange={(e) => handleProjectFinishDate(e.target.value)}
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
              {project?.id ? "Salvar alterações" : "Salvar"}
            </Button>
          </Grid>

          <Grid item xs={12} md={12} direction="column">
            {project.employees ? (
              <>
                <Typography color="primary">
                  Colaboradores que trabalham neste projeto
                </Typography>
                <List className={classes.listEmployees}>
                  {project?.employees?.map((employee: any) => (
                    <ListItem alignItems="flex-start" key={employee.id}>
                      <ListItemAvatar>
                        <Avatar className={classes.employeeAvatar}>
                          {employee.fullName[0].toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={employee.fullName}
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.listEmployeesOccupation}
                            color="textPrimary"
                          >
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
