import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import loadingOrder from "../../vector/wait.svg";
import AppBar from "../../components/app-bar";

const styles = theme => ({
  container: {
    backgroundColor: "white",
    height: "-webkit-fill-available",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  progress: {
    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
  },
  image: {
    marginBottom: 32
  }
});
function SplashScreen(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Container maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <AppBar title="Pesan" />
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <img alt={process.env.REACT_APP_BRAND_NAME} src={loadingOrder} />
          </Grid>
          <Grid style={{ marginBottom: 80 }} align="center" item xs={12}>
            <Typography variant="subtitle2" display="block" gutterBottom>
              <b>Tunggu Sebentar..</b>
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Order kamu lagi diproses nih.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CircularProgress className={classes.progress} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default withStyles(styles)(SplashScreen);
