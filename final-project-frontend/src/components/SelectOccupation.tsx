import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export default function SelectOccupation() {
  const classes = useStyles();
  const [occupation, setOccupation] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOccupation(event.target.value as string);
  };

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      required
      fullWidth
    >
      <InputLabel id="demo-simple-select-outlined-label">Cargo</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={occupation}
        onChange={handleChange}
        label="Cargo"
      >
        <MenuItem value={10}>Desenvolvedor Frontend</MenuItem>
        <MenuItem value={20}>Desenvolvedor Backend</MenuItem>
        <MenuItem value={30}>QA</MenuItem>
        <MenuItem value={40}>DevOps</MenuItem>
        <MenuItem value={50}>Scrum Master</MenuItem>
        <MenuItem value={60}>Product Owner</MenuItem>
      </Select>
    </FormControl>
  );
}
