import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  createStyles,
  makeStyles,
  Theme,
  Chip,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 40,
      "& > * + *": {
        marginTop: theme.spacing(3),
      },
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

export default function SkillsTags() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        fullWidth
        options={techList.map((option) => option.title)}
        defaultValue={[techList[13].title]}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              color="primary"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Selecione suas skills"
            placeholder="React, Node, Java, Kanban, Scrum, Inglês, Japonês, Infraestrutura..."
          />
        )}
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const techList = [
  { title: "React" },
  { title: "Angular" },
  { title: "Vue" },
  { title: "JavaScrip" },
  { title: "TypeScript" },
  { title: "Node" },
  { title: "Java" },
  { title: "PHP" },
  { title: "Python" },
  { title: "C#" },
  { title: ".Net" },
  { title: "Oracle" },
  { title: "MySQL" },
  { title: "PostgreSQL" },
  { title: "Spring Boot" },
  { title: "Postman" },
  { title: "Heroku" },
  { title: "CI/CD" },
  { title: "IntelliJ" },
  { title: "Kanban" },
  { title: "Scrum" },
  { title: "Idioma - Inglês" },
  { title: "Organização de equipes" },
  { title: "Treinamentos - kanban" },
];
