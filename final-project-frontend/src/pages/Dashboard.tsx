import React, { useEffect, useState } from "react";
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
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditIcon from "@material-ui/icons/Edit";
import StarOutlineOutlinedIcon from "@material-ui/icons/StarOutlineOutlined";
import { iClients } from "../models/Clients";
import { getAllClients, getClientById } from "../services/clients-api";
import { useHistory } from "react-router-dom";

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
  };
});

export default function Dashboard() {
  const classes = useStyles();
  const [clients, setClients] = useState([] as iClients[]);
  const history = useHistory();

  async function getClients() {
    try {
      const { data } = await getAllClients();

      setClients(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getClients();
  }, []);

  //função para alterar clientes

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <div className={classes.search}>
          <TextField
            className={classes.textfield}
            label="Pesquisar"
            placeholder="Pesquise por tecnologias, colaboradores, projetos ou clientes"
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
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.addButton}
              startIcon={<AddRoundedIcon />}
              title="Add novo cliente"
            >
              Cliente
            </Button>
            {clients.map((client: iClients) => (
              <Card elevation={1} className={classes.card} key={client.id}>
                {/*<CardHeader
                  //className={classes.cardHeader}
                  action={
                    <Tooltip title="Editar cliente">
                      <IconButton
                        size="medium"
                        onClick={() => {
                          console.log("click no cliente!");
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  }
                  title={<Typography gutterBottom>{client.name}</Typography>}
                  subheader={<Typography>{client.description}</Typography>}
                />*/}
                <CardHeader
                  action={
                    <Tooltip title="Editar cliente">
                      <IconButton
                        size="medium"
                        onClick={() => {
                          history.push(`/client/${client.id}`);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  }
                  title={<Typography>{client.name}</Typography>}
                ></CardHeader>
                <CardContent className={classes.cardHeader}>
                  <Typography noWrap>{client.description}</Typography>
                </CardContent>
                {/*<Tooltip title="Editar cliente">
                  <IconButton
                    size="medium"
                    onClick={() => {
                      console.log("onClick");
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Typography gutterBottom>{client.name}</Typography>
                  <Typography>{client.description}</Typography>*/}
              </Card>
            ))}
          </Grid>
          <Grid item xs={9} md={3} direction="column">
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.addButton}
              startIcon={<AddRoundedIcon />}
              title="Add novo projeto"
            >
              Projeto
            </Button>
            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <Tooltip title="Me interessei pelo projeto">
                    <IconButton
                      onClick={() => {
                        console.log("click no interesse!");
                      }}
                    >
                      <StarOutlineOutlinedIcon className={classes.star} />
                    </IconButton>
                  </Tooltip>
                }
                title={
                  <Typography gutterBottom>
                    Nome do Projeto nome do projeto nome do projeto
                  </Typography>
                }
                subheader="Nome do Projeto"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Colocar aqui as informações que estão na descrição do projeto
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="body2" color="textSecondary">
                  Status: Aguardando início
                </Typography>
              </CardContent>
            </Card>
            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <IconButton>
                    <EditIcon color="secondary" />
                  </IconButton>
                }
                title="Nome do Projeto"
                subheader="Nome do Projeto"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Colocar aqui as informações que estão na descrição do projeto
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="body2" color="textSecondary">
                  Status: Aguardando início
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9} md={3} direction="column">
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.addButton}
              startIcon={<AddRoundedIcon />}
              title="Add novo colaborador"
            >
              Colaborador
            </Button>
            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <Tooltip title="Editar colaborador">
                    <IconButton
                      size="medium"
                      onClick={() => {
                        console.log("click no colaborador!");
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                }
                title={
                  <Typography>Bindulina dos Santos Silveira Machado</Typography>
                }
                subheader="Desenvolvedor(a) Backend"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
