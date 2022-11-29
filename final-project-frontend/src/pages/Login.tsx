import { ChangeEvent, useRef, useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { PoolRounded, AccountCircle, LockRounded } from "@material-ui/icons";
import Toast from "../components/shared/Toast/Toast";
import { IEmployee } from "../models/Employee";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { EToastSeverity } from "../models/ToastSeverity";

const useStyles = makeStyles({
  loginGrid: {
    minHeight: "80vh",
    justifyContent: "center",
    alignItems: "center",
  },
  loginFormItems: {
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 530,
    width: 415,
    "& .MuiInputBase-input": {
      color: "#666",
    },
  },
  loginItems: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    minWidth: 300,
  },
  btn1: {
    variant: "contained",
    color: "#fff",
    backgroundColor: "#2FA4FF",
    "&:hover": {
      backgroundColor: "#61dafb",
      //background: "#fa91b1",
    },
  },
  logo: {
    color: "#2FA4FF",
    fontSize: 100,
    marginBottom: 10,
  },
  title: {
    color: "#2FA4FF",
    fontFamily: "Playball",
    fontWeightLight: 400,
    marginBottom: 20,
  },
  field: {
    //color: "#2BD6EA",
    "& label": {
      color: "#2FA4FF",
    },
    "& label.Mui-focused": {
      color: "#2FA4FF",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#2FA4FF",
      },
      "&:hover fieldset": {
        borderColor: "#2FA4FF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2FA4FF",
      },
    },
  },
  fieldAdornment: {
    color: "#666666",
  },
  btnRegister: {
    color: "#2FA4FF",
    "&:hover": {
      color: "#61dafb",
      //background: "#fa91b1",
    },
  },
});

const LOGIN_URL = "http://localhost:8080/api/v1/login";

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [employee, setEmployee] = useState({} as IEmployee);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(
    EToastSeverity.ERROR
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenSnackBar = () => {
    setIsSnackbarOpen(!isSnackbarOpen);
  };

  const handleSnackbar = (severity: EToastSeverity, message: string) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    handleOpenSnackBar();
  };

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: any
  ) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(loginDetail);

    //validation
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      handleSnackbar(EToastSeverity.ERROR, "Usuário e senha são obrigatórios!");
    }

    //submit the data to server to generate token
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ loginDetail }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response.data));
    } catch (err) {
      console.log();
    }
  };

  // const [cookies, setCookie, removeCookie, get] = useCookies([
  //   "JSESSIONID",
  // ]);

  // const [cookies, setCookie] = useCookies(["JSESSIONID"]);

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   //e.stopPropagation();

  //   setUsername("");
  //   setPassword("");
  //   setSuccess(true);
  //   // console.log(username, password);

  //   //   try {
  //   //     // const response = await axios.post(
  //   //     //   LOGIN_URL,
  //   //     //   JSON.stringify({ username, password }),
  //   //     //   {
  //   //     //     headers: { "Content-Type": "application/json" },
  //   //     //     withCredentials: true,
  //   //     //   }
  //   //     // );
  //   //     //
  //   //     // console.log(JSON.stringify(response?.data));
  //   //     // console.log(JSON.stringify(response));
  //   //     // const accessToken = response?.data.accessToken;
  //   //     // const roles = response?.data.roles;
  //   //     // setAuth({ username, password, roles, accessToken }); //salva nas variárveis globais o contexto do login

  //   //     setUsername("");
  //   //     setPassword("");
  //   //     setSuccess(true);
  //   //     console.log(username, password);
  //   //   } catch (err: any) {
  //   //     if (!err?.response) {
  //   //       setErrMsg("No server response");
  //   //     } else if (err.response?.status === 400) {
  //   //       setErrMsg("Missing username or password");
  //   //     } else if (err.response?.status === 401) {
  //   //       setErrMsg("Unauthorized");
  //   //     } else {
  //   //       setErrMsg("Login failed");
  //   //     }
  //   //     errRef.current.focus();
  //   //   }

  //   try {
  //     const response = await axios.post(
  //       LOGIN_URL,
  //       JSON.stringify({ username, password }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );

  //     //console.log(JSON.stringify(response?.data));
  //     console.log(JSON.stringify(response.data));
  //     // const cockier = get();
  //     //console.log(response);
  //     //const accessToken = response?.data.accessToken;
  //     //const roles = response?.data.roles;
  //     history.push("/dashboard");
  //   } catch (err) {
  //     console.log();
  //   }

  //setAuth({ username, password, roles, accessToken }); //salva nas variárveis globais o contexto do login

  // //     setUsername("");
  // //     setPassword("");
  // //     setSuccess(true);
  // //     console.log(username, password);
  // //   } catch (err: any) {
  // //     if (!err?.response) {
  // //       setErrMsg("No server response");
  // //     } else if (err.response?.status === 400) {
  // //       setErrMsg("Missing username or password");
  // //     } else if (err.response?.status === 401) {
  // //       setErrMsg("Unauthorized");
  // //     } else {
  // //       setErrMsg("Login failed");
  // //     }
  // //     errRef.current.focus();
  // //   }
  // };

  const handleEmployeeUsername = (value: string) => {
    setUsername(value);
  };

  const handleEmployeePassword = (value: string) => {
    setPassword(value);
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container className={classes.loginGrid} xs={12}>
          <Grid
            container
            item
            alignItems="center"
            direction="column"
            justify="center"
            style={{ padding: 10 }}
            className={classes.loginFormItems}
          >
            <div className={classes.loginItems}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <PoolRounded className={classes.logo} />
                </Grid>
                <Grid item className={classes.title}>
                  <h1>My Talent Pool</h1>
                </Grid>
              </Grid>
              <TextField
                className={classes.field}
                label="Usuário"
                margin="normal"
                variant="outlined"
                type="text"
                id="username"
                autoComplete="off"
                // onChange={(e) => handleEmployeeUsername(e.target.value)}
                // value={username}
                onChange={(e) => handleChange(e, "username")}
                value={loginDetail.username}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      className={classes.fieldAdornment}
                    >
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.field}
                margin="normal"
                variant="outlined"
                label="Senha"
                type="password"
                id="password"
                // onChange={(e) => handleEmployeePassword(e.target.value)}
                onChange={(e) => handleChange(e, "password")}
                // value={password}
                value={loginDetail.password}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      className={classes.fieldAdornment}
                    >
                      <LockRounded />
                    </InputAdornment>
                  ),
                }}
              />
              <div style={{ height: 20 }} />
              <Button type="submit" className={classes.btn1}>
                Login
              </Button>
              <div style={{ height: 20 }} />
            </div>
          </Grid>
        </Grid>
      </form>
      <Toast
        severity={snackbarSeverity}
        message={snackbarMessage}
        isOpen={isSnackbarOpen}
        handleSnackbar={handleOpenSnackBar}
      />
    </div>
  );
}
