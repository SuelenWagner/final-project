import React, { useState } from "react";
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
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [status, setStatus] = React.useState("");
  const [client, setClient] = React.useState("");
  const [manager, setManager] = React.useState("");

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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title == "") {
      setTitleError(true);
    }

    if (details == "") {
      setDetailsError(true);
    }
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <Typography color="secondary" className={classes.pageTitle}>
          Cliente parceiro
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container item xs={12} md={9}>
            {/*             <Grid item xs={12} md={6} direction="column"> */}
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              label="Nome do Cliente"
              variant="outlined"
              className={classes.textfield}
              color="primary"
              fullWidth
              required
            />

            <TextField
              onChange={(e) => setDetails(e.target.value)}
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

            <Typography color="secondary">Projetos deste cliente</Typography>

            <List className={classes.listEmployees}>
              <ListItem alignItems="flex-start">
                <ListItemText primary="Projeto 01" />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText primary="Projeto 02" />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText primary="Projeto 03" />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText primary="Projeto 04" />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText primary="Projeto 05" />
              </ListItem>
            </List>
          </Grid>

          {/*             <Grid item xs={12} md={6} direction="column">
              <Typography color="secondary">
                Colaboradores que trabalham neste cliente
              </Typography> */}

          {/*               <List className={classes.listEmployees}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/avatar-example.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Nome completo do Colaborador 1 "
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.listEmployeesName}
                        color="textPrimary"
                      >
                        Desenvolvedor Backend
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Nome completo do Colaborador"
                      src="/avatar-example.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Nome completo do Colaborador 2"
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.listEmployeesName}
                        color="textPrimary"
                      >
                        Desenvolvedor Frontend
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/avatar-example.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Nome completo do Colaborador 3"
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.listEmployeesName}
                        color="textPrimary"
                      >
                        Analista de qualidade
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/avatar-example.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Nome completo do Colaborador 4"
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.listEmployeesName}
                        color="textPrimary"
                      >
                        DevOps
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/avatar-example.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Nome completo do Colaborador 5"
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.listEmployeesName}
                        color="textPrimary"
                      >
                        Scrum Master
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/avatar-example.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Nome completo do Colaborador 6"
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.listEmployeesName}
                        color="textPrimary"
                      >
                        Product Owner
                      </Typography>
                    }
                  />
                </ListItem>
              </List> */}

          <Grid container className={classes.buttonSubmit}>
            <Button type="submit" variant="outlined" color="secondary">
              Salvar
            </Button>
          </Grid>
          {/*           </Grid> */}
          {/*           /</Grid> */}
        </form>
      </Container>
    </div>
  );
}

const employeeList = [
  {
    name: "Nome completo do colaborador 1",
    occupation: "Desenvolvedor Backend",
  },
  {
    name: "Nome completo do colaborador 2",
    occupation: "Desenvolvedor Frontend",
  },
  {
    name: "Nome completo do colaborador 3",
    occupation: "Analista de Qualidade",
  },
  { name: "Nome completo do colaborador 4", occupation: "Scrum Master" },
  { name: "Nome completo do colaborador 5", occupation: "Product Owner" },
  { name: "Nome completo do colaborador 6", occupation: "DevOps" },
];
