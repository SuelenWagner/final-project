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
    listData: {
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
  const [description, setDescription] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
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
              onChange={(e) => setName(e.target.value)}
              label="Nome do Cliente"
              variant="outlined"
              className={classes.textfield}
              color="primary"
              fullWidth
              required
            />

            <TextField
              onChange={(e) => setDescription(e.target.value)}
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

            <Grid container className={classes.buttonSubmit}>
              <Button type="submit" variant="outlined" color="primary">
                Salvar
              </Button>
            </Grid>

            <Typography color="primary">Projetos deste cliente</Typography>

            <List className={classes.listData}>
              <ListItem alignItems="center">
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
        </form>
      </Container>
    </div>
  );
}
