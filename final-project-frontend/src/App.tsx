import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "./App.css";
import Project from "./pages/Project";
import Employee from "./pages/Employee";
import Client from "./pages/Client";
import Position from "./pages/Position";
import Tech from "./pages/Tech";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2FA4FF",
    },
    secondary: {
      main: "#fa91b1",
      light: "#3ada49",
      //main: "#FF8F26",
      //main: "#FD5D90",
      //main: "#F86483",
      //main: "#666",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

//TER UM THEME PARA O GESTOR E OUTRO PRO COLABORADOR SETANDO AS CORES

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/project">
            <Project />
          </Route>
          <Route exact path="/project/:projectId">
            <Project />
          </Route>
          <Route exact path="/employee">
            <Employee />
          </Route>
          <Route path="/employee/:employeeId">
            <Employee />
          </Route>
          <Route exact path="/client">
            <Client />
          </Route>
          <Route path="/client/:clientId">
            <Client />
          </Route>
          <Route exact path="/position">
            <Position />
          </Route>
          <Route exact path="/tech">
            <Tech />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
