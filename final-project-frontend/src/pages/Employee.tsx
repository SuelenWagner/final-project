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
  Select,
  InputLabel,
  MenuItem,
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
    "& label": {
      color: "#666",
    },
    "& label.Mui-focused": {
      color: "#666",
    },
    "& .MuiRadio-colorSecondary.Mui-checked": {
      color: "#2FA4FF",
    },
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
  usernameForm: {
    width: 450,
    marginRight: 75,
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
  grid1Inline: {
    display: "flex",
    justifyContent: "start",
  },

  grid2Inline: {
    display: "flex",
    justifyContent: "space-between",
  },
  grid3Inline: {
    display: "flex",
    justifyContent: "start",
  },
  formControl: {
    width: 450,
    marginRight: 75,
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
});

export default function Employee() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [status, setStatus] = useState("active");
  const history = useHistory();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setNameError(false);
    setEmailError(false);
    setUsernameError(false);

    if (name == "" && email == "" && username == "") {
      setNameError(true);
      setEmailError(true);
      setUsernameError(true);
    }
  };

  const goBackToDashboardPage = () => {
    history.push("/dashboard");
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className={classes.page}>
        <Typography className={classes.pageTitle} color="primary">
          Colaborador
        </Typography>
        <Grid>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container xs={12} md={12} direction="column">
              <TextField
                onChange={(e) => setName(e.target.value)}
                className={classes.textfield}
                label="Nome completo do colaborador"
                variant="outlined"
                color="primary"
                fullWidth
                required
                error={nameError}
                disabled
              />

              <TextField
                onChange={(e) => setEmail(e.target.value)}
                className={classes.textfield}
                label="Email"
                variant="outlined"
                color="primary"
                type="email"
                required
                error={emailError}
                disabled
              />
              <Grid container className={classes.grid1Inline}>
                <TextField
                  onChange={(e) => setUsername(e.target.value)}
                  className={classes.usernameForm}
                  label="Usuário"
                  variant="outlined"
                  color="primary"
                  required
                  error={usernameError}
                  disabled
                />

                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  className={classes.usernameForm}
                  label="Senha"
                  variant="outlined"
                  color="primary"
                  required
                  type="password"
                />
              </Grid>

              <Grid container className={classes.grid2Inline}>
                <BirthDate />
                <StartDate />
                <FormControl className={classes.radioStatus}>
                  <FormLabel>Status</FormLabel>
                  <RadioGroup
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <Grid container>
                      <FormControlLabel
                        value="active"
                        control={<Radio />}
                        label="Ativo"
                        disabled
                      />
                      <FormControlLabel
                        value="inactive"
                        control={<Radio />}
                        label="Inativo"
                        disabled
                      />
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid container className={classes.grid3Inline}>
                <SelectProject />
                <SelectOccupation />
              </Grid>
              <SkillsTags />

              <TextField
                className={classes.textfield}
                label="Interesses"
                placeholder="Insira aqui interesses de aprender ou ensinar"
                variant="outlined"
                color="primary"
                multiline
                rows={4}
                fullWidth
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
                  Salvar alterações
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </div>
  );
}
