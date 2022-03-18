import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AppBar from "../../components/app-bar";
import OrderSukses from "../../vector/pesanSekarang.js";
import { withTransaction } from "@elastic/apm-rum-react";

function CartSuccess(props) {
  const { classes, history } = props;
  const id = JSON.parse(localStorage.getItem("respon"));
  const handleCheck = () => {
    history.push("/orders");
    localStorage.removeItem("respon");
  };

  const handleBelanja = () => {
    history.push("/");
    localStorage.removeItem("respon");
  };
  return (
    <React.Fragment>
      <Container
        className={classes.container}
        align="center"
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <AppBar title="Pesan" />
        <Paper elevation={0} className={classes.paper}>
          <div style={{ paddingTop: 90, marginBottom: 30 }}>
            <OrderSukses />
          </div>
          <Typography variant="subtitle1" display="block" gutterBottom>
            <b>Sukses!</b>
          </Typography>
          <center>
            <Typography
              className={classes.typography}
              variant="subtitle2"
              display="block"
              gutterBottom
            >
              Belanja kamu telah kami proses ordernya dengan kode <b>{id}</b>
            </Typography>
          </center>
        </Paper>
      </Container>
      <div className={classes.stickToBottom}>
        <Paper elevation={0} className={classes.paperbtn}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                style={{ color: "#9FA3A6" }}
                fullWidth
                onClick={handleCheck}
              >
                <b>Cek Transaksi</b>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.button}
                variant="contained"
                fullWidth
                style={{
                  backgroundColor:
                    process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                  color: process.env.REACT_APP_COLOR_FONT || "#000000"
                }}
                onClick={handleBelanja}
              >
                <b>Belanja Lagi, Yuk!</b>
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
}

export default withTransaction("CartSuccess", "component")(CartSuccess);
