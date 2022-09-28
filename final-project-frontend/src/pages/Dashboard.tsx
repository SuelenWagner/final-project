import React from "react";
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
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditIcon from "@material-ui/icons/Edit";
import StarOutlineOutlinedIcon from "@material-ui/icons/StarOutlineOutlined";

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
      minHeight: 100,
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
            {/* <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.addButton}
              startIcon={<AddRoundedIcon />}
              title="Add novo cliente"
            >
              Cliente
            </Button> */}
            <List className={classes.listData}>
              <ListItem alignItems="center">
                <ListItemText primary="Cliente 01" />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem alignItems="center">
                <ListItemText primary="Cliente 02" />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem alignItems="center">
                <ListItemText primary="Cliente 03" />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem alignItems="center">
                <ListItemText primary="Cliente 04" />
              </ListItem>
            </List>
            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                }
                title="Nome do Cliente"
                subheader="Nome do Cliente"
              />
            </Card>
            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                }
                title="Nome do Cliente"
                subheader="Nome do Cliente"
              />
            </Card>
            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                }
                title="Nome do Cliente"
                subheader="Nome do Cliente"
              />
            </Card>
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
                  <IconButton>
                    <StarOutlineOutlinedIcon className={classes.star} />
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
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                }
                title="Nome do Colaborador"
              />
            </Card>
            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                }
                title="Nome do Colaborador"
              />
            </Card>
            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                }
                title="Nome do Colaborador"
              />
            </Card>
            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                }
                title="Nome do Colaborador"
              />
            </Card>
            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                }
                title="Nome do Colaborador"
              />
            </Card>
            <Card elevation={1} className={classes.card}>
              <CardHeader
                action={
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                }
                title="Nome do Colaborador"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
