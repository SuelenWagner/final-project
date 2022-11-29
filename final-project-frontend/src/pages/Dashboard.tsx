import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  makeStyles,
  Container,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  Divider,
  Tooltip,
} from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditIcon from "@material-ui/icons/Edit";
import StarOutlineOutlinedIcon from "@material-ui/icons/StarOutlineOutlined";
import StarIcon from "@material-ui/icons/Star";
import { IClient } from "../models/Clients";
import { getAllClients } from "../services/clients-api";
import { useHistory } from "react-router-dom";
import { getAllProjects } from "../services/projects-api";
import { IProject } from "../models/Projects";
import Project from "./Project";
import { IEmployee } from "../models/Employee";
import { getAllEmployees } from "../services/employees-api";
import { EProjectStatus } from "../models/Projects";
import useStore from "../stores/useStore";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      //backgroundColor: "lightYellow",
      height: "100%",
      width: "100%",
    },
    pageItems: {
      padding: 20,
      display: "flex",
      justifyContent: "space-evenly",
      //backgroundColor: "pink",
    },
    search: {
      paddingTop: 85,
      marginBottom: 40,
      display: "flex",
      justifyContent: "center",
      //backgroundColor: "pink",
    },
    textfield: {
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
      //MUDAR A COR DA FONTE DO TEXTO DIGITADO NOS TEXTFIELDS
      "& .MuiInputBase-root": {
        color: "#666",
      },
    },
    addButton: {
      justifyContent: "right",
      marginBottom: 10,
    },
    card: {
      //backgroundColor: "#DEE8F3",
      border: "1px solid #2FA4FF",
      marginBottom: 15,
      minHeight: 80,
    },
    cardHeader: {
      overflow: "hidden",
      display: "block",
    },
    divider: {
      marginTop: 5,
      marginBottom: 5,
    },
    listData: {
      color: "pink",
    },
    star: {
      color: "#ffc107",
    },
    gridInline: {
      display: "flex",
      justifyContent: "space-between",
    },
    statusLabel: {
      marginTop: 15,
      fontSize: 13,
    },
  };
});

export default function Dashboard() {
  const classes = useStyles();
  const [clients, setClients] = useState([] as IClient[]);
  const [projects, setProjects] = useState([] as IProject[]);
  const [employees, setEmployees] = useState([] as IEmployee[]);
  const history = useHistory();
  const { setUser } = useStore();
  // const projectStatus = EProjectStatus;
  //tentando abaixo fazer o filtro de clientes, projetos e colabs:
  //const [clientName, setClientName] = useState("" as IClient[]);
  //const [projectName, setProjectName] = useState("" as IProject[]);
  //const [employeeName, setEmployeeName] = useState("" as IEmployee[]);
  //const [filteredDash, setFilteredDash] = useState([] as IDash[]);

  function getProjectStatus(status: string) {
    switch (status) {
      case EProjectStatus.CANCELED:
        return "Cancelado";
      case EProjectStatus.DONE:
        return "Concluído";
      case EProjectStatus.IN_PROGRESS:
        return "Em andamento";
      case EProjectStatus.WAITING_START:
        return "Aguardando início";
      default:
        return status;
    }
  }

  async function getClients() {
    try {
      const { data } = await getAllClients();

      setClients(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getProjects() {
    try {
      const { data } = await getAllProjects();

      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getEmployees() {
    try {
      const { data } = await getAllEmployees();

      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getClients();
    getProjects();
    getEmployees();
  }, []);

  // const filterDash = (clientName: string, projectName: string, employeeName: string) => {
  //   if (clientName.length > 0) || (projectName.length > 0) || (employeeName.length > 0){
  //     const filteredDash = dash.filter((p) =>
  //       p.clientName.toLowerCase().trim().includes(clientName.toLowerCase())
  //     );
  //     const dashboard = filteredDash;
  //     setFilteredDash(dashboard);
  //   } else {
  //     setFilteredDasH(dash);
  //   }
  //   setNewName(name);
  //   setName(name);
  // };

  const handleClient = () => {
    history.push("/client");
  };

  const handleProject = () => {
    history.push("/project");
  };

  const handleEmployee = () => {
    history.push("/employee");
  };

  const handleInterestProject = () => {};

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <div className={classes.search}>
          <TextField
            // onChange={(e) => filterDash(e.target.value)}
            className={classes.textfield}
            label="Pesquisar"
            placeholder="Pesquise por clientes, projetos ou colaboradores"
            variant="outlined"
            color="primary"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Grid container spacing={2} className={classes.pageItems}>
          <Grid item xs={9} md={3} direction="column">
            <Tooltip title="Cadastrar um novo cliente">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.addButton}
                startIcon={<AddRoundedIcon />}
                title="Add novo cliente"
                onClick={handleClient}
              >
                Cliente
              </Button>
            </Tooltip>
            {clients.map((client: IClient) => (
              <Card elevation={1} className={classes.card} key={client.id}>
                <CardHeader
                  action={
                    <Tooltip title="Editar cliente">
                      <IconButton
                        size="medium"
                        onClick={() => {
                          history.push(`/client/${client.id}`);
                        }}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  }
                  title={<Typography>{client.name}</Typography>}
                ></CardHeader>
                <CardContent>
                  <Typography noWrap variant="body2" color="textSecondary">
                    {client.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={9} md={3} direction="column">
            <Tooltip title="Cadastrar um novo projeto">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.addButton}
                startIcon={<AddRoundedIcon />}
                title="Add novo projeto"
                onClick={handleProject}
              >
                Projeto
              </Button>
            </Tooltip>
            {projects.map((project: IProject) => (
              <Card elevation={1} className={classes.card} key={project.id}>
                <CardHeader
                  action={
                    <Tooltip title="Editar projeto">
                      <IconButton
                        size="medium"
                        onClick={() => {
                          history.push(`/project/${project.id}`);
                        }}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  }
                  title={<Typography gutterBottom>{project.name}</Typography>}
                />
                <CardContent>
                  <Typography noWrap variant="body2" color="textSecondary">
                    {project.description}
                  </Typography>
                  <Divider className={classes.divider} />
                  <Grid container className={classes.gridInline}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={classes.statusLabel}
                    >
                      Status: {getProjectStatus(project.status)}
                    </Typography>
                    <Tooltip title="Me interessei pelo projeto!">
                      <IconButton
                        // onClick={() => {
                        //   console.log("click no interesse!");
                        // }}
                        onClick={handleInterestProject}
                        disabled={
                          project.status === "CANCELED" ||
                          project.status === "DONE"
                        }
                        className={classes.star}
                      >
                        <StarOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={9} md={3} direction="column">
            <Tooltip title="Cadastrar um novo colaborador">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.addButton}
                startIcon={<AddRoundedIcon />}
                title="Add novo colaborador"
                onClick={handleEmployee}
              >
                Colaborador
              </Button>
            </Tooltip>
            {employees.map((employee: IEmployee) => (
              <Card elevation={1} className={classes.card} key={employee.id}>
                <CardHeader
                  action={
                    <Tooltip title="Editar colaborador">
                      <IconButton
                        size="medium"
                        onClick={() => {
                          history.push(`/employee/${employee.id}`);
                        }}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  }
                  title={<Typography>{employee.fullName}</Typography>}
                  subheader={
                    <Typography variant="body2" color="textSecondary">
                      Desenvolvedor(a) Backend mockado
                    </Typography>
                  }
                />
              </Card>
            ))}

            {/* <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <Tooltip title="Editar colaborador">
                    <IconButton size="medium">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                }
                title={
                  <Typography>Colaborador 1 dos Santos da Silva</Typography>
                }
                subheader={
                  <Typography variant="body2" color="textSecondary">
                    Gestor técnico
                  </Typography>
                }
              />
            </Card> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
