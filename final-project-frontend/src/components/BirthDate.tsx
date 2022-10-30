import React from "react";
import { createStyles, makeStyles, Theme, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      marginBottom: 40,
    },
    textField: {
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
  })
);

export default function BirthDate() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        label="Data de nascimento"
        type="date"
        defaultValue="dd/MM/AAAA"
        variant="outlined"
        required
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
