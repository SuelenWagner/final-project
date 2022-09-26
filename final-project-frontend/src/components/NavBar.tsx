import React from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Grid,
} from "@material-ui/core";
import PoolRoundedIcon from "@material-ui/icons/PoolRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

// FIXME: AJUSTAR A POSITION PARA QUE TEXTO NAO FIQUE ABAIXO DA NAVBAR -> tem a ver com a toolbar!

const useStyles = makeStyles((theme) => {
  return {
    appbar: {
      position: "sticky",
      backgroundColor: "#fff",
      boxShadow: "0 1px 6px 1px lightGray",
    },
    appBarTitleName: {
      color: "#2FA4FF",
      fontFamily: "Playball",
      fontWeightLight: 400,
      fontSize: 25,
      "@media (max-width:900px)": {
        display: "none",
      },
      paddingRight: 8,
    },
    appBarPersonName: {
      color: "#666666",
      fontSize: 18,
      "@media (max-width:730px)": {
        display: "none",
      },
    },
    appBarLogo: {
      color: "#2FA4FF",
      marginRight: 15,
      fontSize: 40,
    },
    appBarUserLogo: {
      color: "#2FA4FF",
      fontSize: 40,
    },
    appBarMenu: {
      transform: "translateX(10px) translateY(50px)",
    },
    menuItem: {
      borderRadius: "5px",
    },
    appBarMenuList: {
      color: "#666666",
    },
  };
});

const pages = ["Dashboard", "Projetos", "Colaboradores"];

const settings = ["Minhas infos", "Logout"];

const NavBar = () => {
  const classes = useStyles();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className={classes.appbar} elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PoolRoundedIcon className={classes.appBarLogo} />
          <Typography
            // noWrap -> comentado, pois acaba por cortar o L do Pool na tela
            noWrap
            variant="h6"
            component="div"
            className={classes.appBarTitleName}
          >
            My Talent Pool
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "flex",
                sm: "flex",
                md: "flex",
                lg: "flex",
                xl: "flex",
              },
            }}
          >
            <Grid container justify="center">
              <MenuItem className={classes.menuItem}>
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="navbar-item"
                >
                  Dashboard
                </NavLink>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <NavLink
                  exact
                  to="/project"
                  activeClassName="active"
                  className="navbar-item"
                >
                  Projetos
                </NavLink>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <NavLink
                  to="/employee"
                  activeClassName="active"
                  className="navbar-item"
                >
                  Colaboradores
                </NavLink>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <NavLink
                  to="/client"
                  activeClassName="active"
                  className="navbar-item"
                >
                  Clientes
                </NavLink>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <NavLink
                  to="/position"
                  activeClassName="active"
                  className="navbar-item"
                >
                  Funções
                </NavLink>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <NavLink
                  to="/tech"
                  activeClassName="active"
                  className="navbar-item"
                >
                  Tecnologias
                </NavLink>
              </MenuItem>
            </Grid>
          </Box>

          <Typography
            noWrap
            component="div"
            className={classes.appBarPersonName}
          >
            Reginaldo Jamirinho Ximira
          </Typography>
          <Box
            sx={{
              flexGrow: 0,
              display: {
                xs: "flex",
                sm: "flex",
                md: "flex",
                lg: "flex",
                xl: "flex",
              },
            }}
          >
            <Tooltip title="Expandir opções">
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircleIcon className={classes.appBarUserLogo} />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              // anchorOrigin={{
              //   vertical: "top",
              //   horizontal: "center",
              // }}
              keepMounted
              // transformOrigin={{
              //   vertical: "bottom",
              //   horizontal: "center",
              // }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              className={classes.appBarMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography className={classes.appBarMenuList}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
