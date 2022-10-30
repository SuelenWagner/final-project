import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
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

export default function SelectProject() {
  const classes = useStyles();
  const [project, setProject] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProject(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Projeto</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={project}
        onChange={handleChange}
        label="Projeto"
      >
        <MenuItem value={10}>Projeto teste 01</MenuItem>
        <MenuItem value={20}>Projeto teste 02</MenuItem>
        <MenuItem value={30}>Projeto teste 03</MenuItem>
        <MenuItem value={40}>Projeto teste 04</MenuItem>
        <MenuItem value={50}>Projeto teste 05</MenuItem>
        <MenuItem value={60}>Projeto teste 06</MenuItem>
      </Select>
    </FormControl>
  );
}
