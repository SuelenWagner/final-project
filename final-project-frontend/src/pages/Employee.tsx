import { useEffect, useState } from "react";
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
import Toast from "../components/shared/Toast/Toast";
import { useHistory, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/employees-api";
import { ITech } from "../models/Techs";
import { IPosition } from "../models/Positions";
import { IEmployee } from "../models/Employee";
import { EToastSeverity } from "../models/ToastSeverity";

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
  dateField: {
    width: 220,
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
  textfieldForm: {
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
  selectRole: {
    width: 450,
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

type EmployeeId = {
  employeeId: string;
};

const STATUS = [
  { key: "ACTIVE", value: "Ativo" },
  { key: "INACTIVE", value: "Inativo" },
];

const ROLES = [
  { key: "ROLE_ADMIN", value: "Gestor" },
  { key: "ROLE_USER", value: "Colaborador" },
];

export default function Employee() {
  const classes = useStyles();
  const [employee, setEmployee] = useState({} as IEmployee);
  const [employees, setEmployees] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [interesting, setInteresting] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [role, setRole] = useState("");
  //const [project, setProject] = useState({} as IProject);
  //const [position, setPosition] = useState({} as IPosition);
  //const [tech, setTechs] = useState([] as ITech);
  //const [role, setRole] = useState({} as Role);

  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(
    EToastSeverity.SUCCESS
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const params: EmployeeId = useParams();
  const history = useHistory();

  async function getEmployee(id: string) {
    try {
      const { data }: any = await getEmployeeById(id);
      console.log(data);
      setData(data);
    } catch {
      handleSnackbar(EToastSeverity.ERROR, "Colaborador não encontrado");
    }
  }

  const setData = (data: any) => {
    setEmployee(data);
    setUsername(data.username);
    setPassword(data.password);
    setFullName(data.fullName);
    setBirthDate(data.birthDate);
    setEmail(data.email);
    setStartDate(data.startDate);
    setInteresting(data.interesting);
    setStatus(data.status);
    setRole(data.authorities[0].role); //aqui acho que precisa do authorities e então pegar o dado
    //setProject(data.project);
    //setPosition(data.position);
    //setTechs(data.techs);
    //setRole(data.role);
  };

  useEffect(() => {
    if (params?.employeeId) {
      getEmployee(params.employeeId);
    }
  }, [params]);

  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   setFullNameError(false);
  //   setEmailError(false);
  //   setUsernameError(false);

  //   if (fullName === "" && email === "" && username === "") {
  //     setFullNameError(true);
  //     setEmailError(true);
  //     setUsernameError(true);
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const employeeName = fullName.trim();
    if (params?.employeeId) {
      editEmployee(
        username,
        password,
        employeeName,
        birthDate,
        email,
        startDate,
        interesting,
        status,
        role
      );
    } else {
      createNewEmployee(
        username,
        password,
        employeeName,
        birthDate,
        email,
        startDate,
        interesting,
        status,
        role
      );
    }
  };

  const editEmployee = async (
    username: string,
    password: string,
    fullName: string,
    birthDate: string,
    email: string,
    startDate: string,
    interesting: string,
    status: any,
    role: any
  ) => {
    try {
      await updateEmployee(
        params.employeeId,
        username,
        password,
        fullName,
        birthDate,
        email,
        startDate,
        interesting,
        status,
        role
      );
      handleSnackbar(
        EToastSeverity.SUCCESS,
        "Colaborador editado com sucesso!"
      );
      goToDashboardPage();
    } catch (err) {
      handleSnackbar(EToastSeverity.ERROR, "Erro ao editar colaborador");
    }
  };

  const createNewEmployee = async (
    username: string,
    password: string,
    fullName: string,
    birthDate: string,
    email: string,
    startDate: string,
    interesting: string,
    status: any,
    role: any
  ) => {
    try {
      await createEmployee(
        username,
        password,
        fullName,
        birthDate,
        email,
        startDate,
        interesting,
        status,
        role
      );
      clearForm();
      handleSnackbar(
        EToastSeverity.SUCCESS,
        "Novo colaborador cadastrado com sucesso!"
      );
      goToDashboardPage();
    } catch (err) {
      handleSnackbar(EToastSeverity.ERROR, "Erro ao cadastrar colaborador");
    }
  };

  const handleSnackbar = (severity: EToastSeverity, message: string) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    handleOpenSnackBar();
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
    setUsername("");
    setPassword("");
    setFullName("");
    setBirthDate("");
    setEmail("");
    setStartDate("");
    setInteresting("");
    //setStatus("");
    //setRole("");
  };

  const handleOpenSnackBar = () => {
    setIsSnackbarOpen(!isSnackbarOpen);
  };

  const handleEmployeeUsername = (value: string) => {
    setUsername(value);
  };

  const handleEmployeePassword = (value: string) => {
    setPassword(value);
  };

  const handleEmployeeFullName = (value: string) => {
    setFullName(value);
  };

  const handleEmployeeBirthDate = (value: string) => {
    setBirthDate(value);
  };

  const handleEmployeeEmail = (value: string) => {
    setEmail(value);
  };

  const handleEmployeeStartDate = (value: string) => {
    setStartDate(value);
  };

  const handleEmployeeInteresting = (value: string) => {
    setInteresting(value);
  };

  const handleEmployeeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleEmployeeRole = (value: string) => {
    setRole(value);
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
                onChange={(e) => handleEmployeeFullName(e.target.value)}
                value={fullName}
                className={classes.textfield}
                label="Nome completo do colaborador"
                variant="outlined"
                color="primary"
                fullWidth
                required
                error={fullNameError}
              />
              <Grid container className={classes.grid1Inline}>
                <TextField
                  onChange={(e) => handleEmployeeEmail(e.target.value)}
                  value={email}
                  className={classes.textfieldForm}
                  label="Email"
                  variant="outlined"
                  color="primary"
                  type="email"
                  required
                  error={emailError}
                />

                <FormControl
                  variant="outlined"
                  required
                  fullWidth
                  className={classes.selectRole}
                >
                  <InputLabel>Papel</InputLabel>
                  <Select
                    value={role}
                    label="Papel"
                    required
                    onChange={(e) =>
                      handleEmployeeRole(e.target.value as string)
                    }
                  >
                    {employees &&
                      ROLES.map((role: any) => (
                        <MenuItem key={role.key} value={role.key}>
                          {role.value}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid container className={classes.grid1Inline}>
                <TextField
                  onChange={(e) => handleEmployeeUsername(e.target.value)}
                  value={username}
                  className={classes.textfieldForm}
                  label="Usuário"
                  variant="outlined"
                  color="primary"
                  required
                  error={usernameError}
                />

                <TextField
                  onChange={(e) => handleEmployeePassword(e.target.value)}
                  value={password}
                  className={classes.textfieldForm}
                  label="Senha"
                  variant="outlined"
                  color="primary"
                  required
                  type="password"
                />
              </Grid>

              <Grid container className={classes.grid2Inline}>
                {/* <BirthDate /> */}
                <TextField
                  onChange={(e) => handleEmployeeBirthDate(e.target.value)}
                  defaultValue={birthDate}
                  value={birthDate}
                  label="Data de nascimento"
                  type="date"
                  variant="outlined"
                  required
                  className={classes.dateField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {/* <StartDate /> */}

                <TextField
                  onChange={(e) => handleEmployeeStartDate(e.target.value)}
                  defaultValue="dd/MM/AAAA"
                  value={startDate}
                  label="Data de início"
                  type="date"
                  variant="outlined"
                  required
                  className={classes.dateField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl className={classes.radioStatus}>
                  <FormLabel>Status</FormLabel>
                  <RadioGroup value={status} onChange={handleEmployeeStatus}>
                    <Grid container>
                      <FormControlLabel
                        control={<Radio />}
                        label="Ativo"
                        value="ACTIVE"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="Inativo"
                        value="INACTIVE"
                      />
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid container className={classes.grid1Inline}>
                <SelectProject />
                <SelectOccupation />
              </Grid>
              <SkillsTags />

              <TextField
                onChange={(e) => handleEmployeeInteresting(e.target.value)}
                value={interesting}
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
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
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
