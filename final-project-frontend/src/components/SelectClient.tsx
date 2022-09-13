import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
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
      marginRight: 50,
    },
  })
);

export default function SelectClient() {
  const classes = useStyles();
  const [client, setClient] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClient(event.target.value as string);
  };

  return (
    <div>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        required
        fullWidth
      >
        <InputLabel id="demo-simple-select-outlined-label">Cliente</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={client}
          onChange={handleChange}
          label="Client"
        >
          <MenuItem value={10}>Cliente teste 01</MenuItem>
          <MenuItem value={20}>Cliente teste 02</MenuItem>
          <MenuItem value={30}>Cliente teste 03</MenuItem>
          <MenuItem value={40}>Cliente teste 04</MenuItem>
          <MenuItem value={50}>Cliente teste 05</MenuItem>
          <MenuItem value={60}>Cliente teste 06</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
