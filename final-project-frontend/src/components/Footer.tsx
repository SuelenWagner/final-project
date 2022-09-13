import React from "react";
import { makeStyles, Container, Toolbar } from "@material-ui/core";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      width: "100%",
      backgroundColor: "#fff",
      fontSize: 14,
      color: "#666666",
      borderTop: "1px solid lightGray",
      fontFamily: "Roboto",
      bottom: 0,
      position: "fixed",
    },
    footerContent: {
      justifyContent: "center",
    },
    footerIcon: {
      color: "#2FA4FF",
      fontSize: 20,
      marginLeft: 5,
    },
  };
});

export default function Footer() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.footer}>
      <Toolbar className={classes.footerContent}>
        <span>Made with</span>
        <FavoriteBorderOutlinedIcon className={classes.footerIcon} />
      </Toolbar>
    </Container>
  );
}
