import React, { useState } from "react";
import NavBar from "../components/NavBar";
import BirthDate from "../components/BirthDate";
import SelectOccupation from "../components/SelectOccupation";
import SelectProject from "../components/SelectProject";
import SelectClient from "../components/SelectClient";
import SkillsTags from "../components/SkillsTags";
import StartDate from "../components/StartDate";
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
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  page: {
    //backgroundColor: "#FFB6C1",
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
    //MUDAR A COR DA FONTE DO TEXTO DIGITADO NOS TEXTFIELDS
    "& .MuiInputBase-root": {
      color: "#666",
    },
  },
  inputStyle: {
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
  radioStatus: {
    marginBottom: 40,
    marginLeft: 50,
    "& label": {
      color: "#666",
    },
    "& label.Mui-focused": {
      color: "#666",
    },
  },
  buttonSubmit: {
    fontSize: 14,
    justifyContent: "right",
  },
});

export default function Employee() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [status, setStatus] = useState("active");

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
        <Typography className={classes.pageTitle} color="secondary">
          Colaboradores
        </Typography>
        <Grid>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6} direction="column">
                <TextField
                  onChange={(e) => setTitle(e.target.value)}
                  className={classes.textfield}
                  label="Nome completo do colaborador"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  required
                  error={titleError}
                />

                <Grid container spacing={2}>
                  <BirthDate />
                  <FormControl className={classes.radioStatus}>
                    <FormLabel>Status</FormLabel>
                    <RadioGroup
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <Grid container spacing={1}>
                        <FormControlLabel
                          value="active"
                          control={<Radio />}
                          label="Ativo"
                        />
                        <FormControlLabel
                          value="inactive"
                          control={<Radio />}
                          label="Inativo"
                        />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <StartDate />

                <TextField
                  onChange={(e) => setTitle(e.target.value)}
                  className={classes.textfield}
                  label="Email"
                  variant="outlined"
                  color="primary"
                  type="email"
                  fullWidth
                  required
                />

                <SelectOccupation />
              </Grid>
              <Grid item xs={12} md={6} direction="column">
                <SelectClient />
                <SelectProject />
                <SkillsTags />

                <TextField
                  onChange={(e) => setDetails(e.target.value)}
                  className={classes.textfield}
                  label="Interesses"
                  placeholder="Insira aqui interesses de aprender ou ensinar"
                  variant="outlined"
                  color="primary"
                  multiline
                  rows={4}
                  fullWidth
                />

                <Grid container className={classes.buttonSubmit}>
                  <Button type="submit" variant="outlined" color="secondary">
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </div>
  );
}
