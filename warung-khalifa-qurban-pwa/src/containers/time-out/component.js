import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withTransaction } from "@elastic/apm-rum-react";

function TimeOut(props) {
  const tryAgain = () => {
    window.location.href = "/";
  };

  const { classes } = props;
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <Paper align="center" className={classes.body}>
          <div align="center" className={classes.indicator}>
            <img
              src="https://wp.tumbasin.id/wp-content/uploads/2019/07/error-flat-e1563517817835.png"
              alt="Time-out"
            />
          </div>
          <Typography align="center" variant="h6" gutterBottom>
            <strong>Oops! Terjadi kesalahan</strong>
          </Typography>
          <Typography align="center" variant="subtitle1" gutterBottom>
            Cek koneksi internet anda dan coba lagi,
          </Typography>
          <Typography align="center" variant="subtitle1" gutterBottom>
            atau hubungi kami
          </Typography>
          <Button color="secondary" onClick={tryAgain}>
            <strong>Coba lagi</strong>
          </Button>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default withTransaction("TimeOut", "component")(TimeOut);
