import React from "react";

import {
  Typography,
  Container,
  CssBaseline,
  Grid,
  Button
} from "@material-ui/core";

import AppBar from "../app-bar-full";

import Full from "../../vector/full.svg";
import Instagram from "../../vector/insta.svg";
import facebook from "../../vector/facebook.svg";

function Component(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Container maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <AppBar goBack close={props.close} title="" />
        <div align="center">
          <img
            src={Full}
            style={{ width: 200 }}
            alt="Belanjaan hari ini sudah penuh"
          />
          <div style={{ paddingLeft: 60, paddingRight: 60 }}>
            <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
              Wah, belanjaan hari ini sudah penuh :(
            </Typography>
            <Typography style={{ fontSize: 12, marginTop: 8 }}>
              Kamu bisa kembali besok, untuk penuhi kebutuhan harianmu
            </Typography>
          </div>
        </div>

        <Grid container spacing={0} className={classes.gridText}>
          <Grid item xs={12} style={{ marginTop: "6%" }}>
            <Typography className={classes.text}>
              <b>Ikuti Kami</b>
            </Typography>
          </Grid>

          {process.env.REACT_APP_INSTAGRAM_URL === "" ? (
            <></>
          ) : (
            <Grid item xs={12} style={{ marginTop: "4%" }}>
              <Button
                onClick={() => {
                  window.open(
                    process.env.REACT_APP_INSTAGRAM_URL ||
                      "https://instagram.com/srikopi"
                  );
                }}
                variant="contained"
                fullWidth
                style={{
                  background:
                    "linear-gradient(263.26deg, #DA01C7 0.12%, #E8016C 21.42%, #F70125 41.17%, #FF7201 69.22%, #FFD101 96.76%)",
                  color: "white",
                  textTransform: "none",
                  minHeight: 50,
                  maxHeight: 50
                }}
              >
                <img
                  style={{ position: "absolute", left: 15 }}
                  src={Instagram}
                  alt="Instagram"
                />
                <b style={{ marginLeft: 30 }}>Follow Us On Instagram</b>
              </Button>
            </Grid>
          )}

          {process.env.REACT_APP_FACEBOOK_URL === "" ? (
            <></>
          ) : (
            <Grid item xs={12} style={{ marginTop: "4%" }}>
              <Button
                onClick={() => {
                  window.open(
                    process.env.REACT_APP_FACEBOOK_URL ||
                      "https://web.facebook.com/srikopioke/"
                  );
                }}
                variant="contained"
                fullWidth
                style={{
                  backgroundColor: "#3660B9",
                  color: "white",
                  textTransform: "none",
                  minHeight: 50,
                  maxHeight: 50
                }}
              >
                <img
                  style={{ position: "absolute", left: 21 }}
                  src={facebook}
                  alt="Facebook"
                />
                <b style={{ marginLeft: 30 }}>Follow Us On Facebook</b>
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Component;
