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
  Avatar,
  Badge,
  ListItem,
} from "@material-ui/core";
import PoolRoundedIcon from "@material-ui/icons/PoolRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { List } from "@material-ui/icons";

const useStyles = makeStyles((theme) => {
  return {
    appbar: {
      position: "fixed",
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
      color: "#fff",
      backgroundColor: "#2FA4FF",
    },
    appBarNotifications: {
      "& .MuiBadge-badge": {
        color: "#fff",
        backgroundColor: "#FD5D90",
      },
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
const notificationRender = [
  "Sinbarilio se interessou pelo projeto TorneiraFeet",
  "Maique Taison se interessou pelo projeto TorneiraFeet",
];

const NavBar = () => {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUserNotification, setAnchorElUserNotification] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotification = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUserNotification(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNotification = () => {
    setAnchorElUserNotification(null);
  };

  return (
    <AppBar className={classes.appbar} elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PoolRoundedIcon className={classes.appBarLogo}></PoolRoundedIcon>
          <Typography
            // noWrap -> comentado, pois acaba por cortar o L do Pool na tela
            noWrap
            variant="h6"
            component="div"
            className={classes.appBarTitleName}
          >
            My Talent Pool
          </Typography>

          {/* Tentando fazer a notificação */}
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
            <Tooltip title="Notificações de interesses nos projetos">
              <IconButton
                // onClick={() => {
                //   console.log("click no interesse!");
                // }}
                onClick={handleOpenNotification}
              >
                <Badge
                  badgeContent={5}
                  max={99}
                  className={classes.appBarNotifications}
                >
                  <NotificationsIcon color="primary" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              id="notification-appbar"
              anchorEl={anchorElUserNotification}
              // anchorOrigin={{
              //   vertical: "top",
              //   horizontal: "center",
              // }}
              keepMounted
              // transformOrigin={{
              //   vertical: "bottom",
              //   horizontal: "center",
              // }}
              open={Boolean(anchorElUserNotification)}
              onClose={handleCloseNotification}
              className={classes.appBarMenu}
            >
              {notificationRender.map((notificationRender) => (
                <MenuItem
                  key={notificationRender}
                  onClick={handleCloseNotification}
                >
                  <Typography className={classes.appBarMenuList}>
                    {notificationRender}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            {/* <div>
              <List>
                <ListItem>
                  <Typography>
                    Sinbaril dos Santos da Silva se interessou pelo Projeto 1
                  </Typography>
                </ListItem>
              </List>
            </div> */}
          </Box>

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
                  to="/dashboard"
                  activeClassName="active"
                  className="navbar-item"
                >
                  Dashboard
                </NavLink>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <NavLink
                  to="/client"
                  activeClassName="active"
                  className="navbar-item"
                >
                  Cliente
                </NavLink>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <NavLink
                  exact
                  to="/project"
                  activeClassName="active"
                  className="navbar-item"
                >
                  Projeto
                </NavLink>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <NavLink
                  to="/employee"
                  activeClassName="active"
                  className="navbar-item"
                >
                  Colaborador
                </NavLink>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <NavLink
                  to="/position"
                  activeClassName="active"
                  className="navbar-item"
                >
                  Cargos
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
            Colaborador 2 dos Santos da Silva
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
                <Avatar className={classes.appBarUserLogo}>
                  C{/* {employee.fullName[0].toUpperCase()} */}
                </Avatar>
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
