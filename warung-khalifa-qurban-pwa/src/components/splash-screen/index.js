import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Logo from "../../vector/goat.png";
import CircularProgress from "../../vector/circularProgress.png";

const styles = theme => ({
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    background: "white",
    position: "fixed",
    zIndex: 2000
  },
  logoImage: {
    width: 113,
    marginBottom: 200
  },
  loadingIcon: {
    animation: "$rotating linear 1s infinite"
  },
  "@keyframes rotating": {
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)"
    }
  }
});
function SplashScreen(props) {
  const { classes, withLoading } = props;
  return (
    <Container maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <img src={Logo} alt="logo" className={classes.logoImage} />
      {withLoading && (
        <img
          src={CircularProgress}
          alt="circular-progress"
          className={classes.loadingIcon}
        />
      )}
    </Container>
  );
}

export default withStyles(styles)(SplashScreen);
