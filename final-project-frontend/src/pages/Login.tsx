import React from "react";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { PoolRounded, AccountCircle, LockRounded } from "@material-ui/icons";

const useStyles = makeStyles({
  loginGrid: {
    minHeight: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  loginFormItems: {
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 530,
    width: 415,
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

export default function Login() {
  const classes = useStyles();

  return (
    <div>
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
              label="Senha"
              type="password"
              margin="normal"
              variant="outlined"
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
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button color="primary" className={classes.btnRegister}>
                Cadastre-se
              </Button>
            </Grid>
          </Grid>
          <div />
        </Grid>
      </Grid>
    </div>
  );
}
