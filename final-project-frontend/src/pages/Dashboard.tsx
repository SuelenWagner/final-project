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

  const handleClient = () => {
    history.push("/client");
  };

  const handleProject = () => {
    history.push("/project");
  };

  const handleEmployee = () => {
    history.push("/employee");
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <div className={classes.search}>
          <TextField
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
            {/* {projects.map((project: IProject) => (
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
                  title={
                    <Typography gutterBottom>
                      Nome do Projeto nome do projeto nome do projeto
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography noWrap variant="body2" color="textSecondary">
                    Descrição do projeto 1 Descrição do projeto 1 Descrição do
                    projeto 1 Descrição do projeto 1 Descrição do projeto 1
                    Descrição do projeto 1.
                  </Typography>
                  <Divider className={classes.divider} />
                  <Grid container className={classes.gridInline}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={classes.statusLabel}
                    >
                      Status: {project.status}
                    </Typography>
                    <Tooltip title="Me interessei pelo projeto!">
                      <IconButton
                        onClick={() => {
                          console.log("click no interesse!");
                        }}
                      >
                        <StarOutlineOutlinedIcon className={classes.star} />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </CardContent>
              </Card>
            ))} */}

            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <Tooltip title="Editar projeto">
                    <IconButton size="medium">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                }
                title={<Typography gutterBottom>Projeto 1</Typography>}
              />
              <CardContent>
                <Typography noWrap variant="body2" color="textSecondary">
                  Descrição do projeto 1 em construção.
                </Typography>
                <Divider className={classes.divider} />
                <Grid container className={classes.gridInline}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.statusLabel}
                  >
                    Status: Aguardando início
                  </Typography>
                  <Tooltip title="Me interessei pelo projeto!">
                    <IconButton
                      onClick={() => {
                        console.log("click no interesse!");
                      }}
                    >
                      <StarOutlineOutlinedIcon className={classes.star} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </CardContent>
            </Card>

            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <Tooltip title="Editar projeto">
                    <IconButton size="medium">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                }
                title={
                  <Typography gutterBottom>
                    Projeto 2 que possui o nome do projeto grande
                  </Typography>
                }
              />
              <CardContent>
                <Typography noWrap variant="body2" color="textSecondary">
                  Descrição do projeto 2 Descrição do projeto 2 Descrição do
                  projeto 2 Descrição do projeto 2 Descrição do projeto 2
                  Descrição do projeto 2 Descrição do projeto 2 Descrição do
                  projeto 2 Descrição do projeto 2 Descrição do projeto 2
                  Descrição do projeto 2 Descrição do projeto 2 Descrição do
                  projeto 2 Descrição do projeto 2 Descrição do projeto 2
                  Descrição do projeto 2 Descrição do projeto 2 Descrição do
                  projeto 2.
                </Typography>
                <Divider className={classes.divider} />
                <Grid container className={classes.gridInline}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.statusLabel}
                  >
                    Status: Em progresso
                  </Typography>
                  <Tooltip title="Me interessei pelo projeto!">
                    <IconButton
                      onClick={() => {
                        console.log("click no interesse!");
                      }}
                    >
                      <StarIcon className={classes.star} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </CardContent>
            </Card>

            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <Tooltip title="Editar projeto">
                    <IconButton size="medium">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                }
                title={<Typography gutterBottom>Projeto 3</Typography>}
              />
              <CardContent>
                <Typography noWrap variant="body2" color="textSecondary">
                  Descrição do projeto 3 Descrição do projeto 3 Descrição do
                  projeto 3 Descrição do projeto 3 Descrição do projeto 3
                  Descrição do projeto 3.
                </Typography>
                <Divider className={classes.divider} />
                <Grid container className={classes.gridInline}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.statusLabel}
                  >
                    Status: Concluído
                  </Typography>
                </Grid>
              </CardContent>
            </Card>

            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <Tooltip title="Editar projeto">
                    <IconButton size="medium">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                }
                title={<Typography gutterBottom>Projeto 4</Typography>}
              />
              <CardContent>
                <Typography noWrap variant="body2" color="textSecondary">
                  Descrição do projeto 4 Descrição do projeto 4 Descrição do
                  projeto 4 Descrição do projeto 4 Descrição do projeto 4
                  Descrição do projeto 4 Descrição do projeto 4 Descrição do
                  projeto 4.
                </Typography>
                <Divider className={classes.divider} />
                <Grid container className={classes.gridInline}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.statusLabel}
                  >
                    Status: Cancelado
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
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
            {/* {employees.map((employee: IEmployee) => (
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
                  title={
                    <Typography>
                      Bindulina dos Santos Silveira Machado
                    </Typography>
                  }
                  subheader={
                    <Typography variant="body2" color="textSecondary">
                      Desenvolvedor(a) Backend
                    </Typography>
                  }
                />
              </Card>
            ))} */}

            <Card elevation={1} className={classes.card}>
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
            </Card>

            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <Tooltip title="Editar colaborador">
                    <IconButton size="medium">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                }
                title={
                  <Typography>Colaborador 2 dos Santos da Silva</Typography>
                }
                subheader={
                  <Typography variant="body2" color="textSecondary">
                    Desenvolvedor(a) Backend
                  </Typography>
                }
              />
            </Card>

            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <Tooltip title="Editar colaborador">
                    <IconButton size="medium">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                }
                title={
                  <Typography>Colaborador 3 dos Santos da Silva</Typography>
                }
                subheader={
                  <Typography variant="body2" color="textSecondary">
                    Desenvolvedor(a) Frontend
                  </Typography>
                }
              />
            </Card>

            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <Tooltip title="Editar colaborador">
                    <IconButton size="medium">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                }
                title={
                  <Typography>Colaborador 4 dos Santos da Silva</Typography>
                }
                subheader={
                  <Typography variant="body2" color="textSecondary">
                    QA
                  </Typography>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
