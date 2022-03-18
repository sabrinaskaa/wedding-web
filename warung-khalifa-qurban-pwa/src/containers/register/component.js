import React from "react";
import "firebase/auth";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import RegisterWithEmail from "../../components/register-with-email";
import { withTransaction } from "@elastic/apm-rum-react";

function Register(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Container maxWidth="xs" className={classes.container}>
        <CssBaseline />

        {props.isLoading ? (
          <Grid
            item
            style={{ textAlign: "center", backgroundColor: "#153b50" }}
          >
            <CircularProgress
              style={{
                color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
              }}
            />
          </Grid>
        ) : (
          <>
            <RegisterWithEmail />
          </>
        )}
      </Container>
    </React.Fragment>
  );
}

export default withTransaction("Register", "component")(Register);
