import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Paper,
  Grid,
  Button,
  Divider
} from "@material-ui/core";
import { ArrowBackIos, Search, Store, History } from "@material-ui/icons";
import styles from "./styles";
import close from "../../vector/fullClose.svg";

function Component(props) {
  const [selectedPasar] = useState(
    JSON.parse(localStorage.getItem("selectedPasar"))
  );

  const { classes, history } = props;
  const searchStyle = () => {
    if (window.location.pathname === "/") {
      return { marginLeft: 0, marginTop: 20 };
    }
    return { marginLeft: 0, backgroundColor: "#F2F2F2" };
  };
  const homeStyle = () => {};
  const homeAppbar = () => ({ backgroundColor: "white", color: "black" });
  return (
    <Box
      id="box"
      className={classes.appbar2}
      style={homeStyle()}
      display="flex"
      justifyContent="center"
      bgcolor="white"
    >
      <AppBar
        elevation={0}
        style={homeAppbar()}
        position="static"
        className={classes.appbar}
      >
        <Toolbar variant="dense">
          {props.goBack && (
            <IconButton
              edge="start"
              className={classes.backButton}
              aria-label="Menu"
              onClick={props.close}
            >
              <img src={close} alt="Close Icon" />
            </IconButton>
          )}
          {props.goBackProfile && (
            <IconButton
              edge="start"
              className={classes.backButton}
              aria-label="Menu"
              onClick={() => props.history.push("/")}
            >
              <ArrowBackIos />
            </IconButton>
          )}

          {props.search ? (
            <div
              style={searchStyle()}
              className={classes.search}
              onClick={() => {
                props.history.push("/product-search");
              }}
            >
              <div className={classes.searchIcon}>
                <Search style={{ color: "#707585" }} />
              </div>
              <InputBase
                placeholder="Search…"
                style={{ color: "#707585" }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "Search" }}
              />
            </div>
          ) : (
            <Typography
              align="left"
              variant="subtitle1"
              className={classes.title}
            >
              <strong>{props.title}</strong>
            </Typography>
          )}
          {props.historyOrder && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="Menu"
              onClick={() => {
                props.history.push("/order-history");
              }}
            >
              <History />
            </IconButton>
          )}
          {props.select && (
            <Typography
              onClick={() => {
                props.history.push("/");
              }}
              style={{
                color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
              }}
              variant="caption"
              className={classes.select}
            >
              <strong>Pilih Produk</strong>
            </Typography>
          )}
          {props.edit && (
            <Typography
              onClick={() => {}}
              style={{
                color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
              }}
              variant="subtitle2"
              className={classes.select}
            >
              <strong>Edit</strong>
            </Typography>
          )}
        </Toolbar>
        {props.divider && <Divider variant="fullWidth" />}

        {props.children && <React.Fragment>{props.children}</React.Fragment>}
        {props.market && (
          <Paper
            style={{
              padding: 10,
              margin: 18,
              borderRadius: 5,
              position: "relative",
              bottom: 0
            }}
          >
            <Grid
              container
              spacing={0}
              style={{ paddingRight: 10, paddingLeft: 10 }}
            >
              <Grid item xs={12}>
                <Typography
                  style={{
                    color: "#4E5356"
                  }}
                  variant="body2"
                  gutterBottom
                >
                  Kamu Belanja Di :
                </Typography>
              </Grid>
              <Grid style={{ marginTop: 5 }} item xs={1}>
                <Store style={{ fontSize: 30, color: "#87CAFE" }} />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  style={{
                    marginBottom: -4,
                    paddingRight: 0,
                    paddingLeft: 14
                  }}
                  variant="subtitle2"
                  gutterBottom
                >
                  <b>{selectedPasar.name}</b>
                </Typography>
                <Typography
                  style={{ paddingLeft: 16, color: "#707585", fontSize: 10 }}
                  variant="caption"
                  gutterBottom
                >
                  1,3 kilometer dari lokasi Anda
                </Typography>
              </Grid>
              <Grid style={{ marginTop: 5 }} item xs={2}>
                <Button
                  size="small"
                  variant="contained"
                  style={{
                    backgroundColor:
                      process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                    color: "white"
                  }}
                  onClick={() => history.push("/market")}
                >
                  Ganti
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}
        {props.searchHelp && (
          <Grid container spacing={0}>
            <Grid style={{ padding: 10 }} item xs={12}>
              <div
                style={{ marginLeft: 0, backgroundColor: "#F2F2F2" }}
                className={classes.search}
              >
                <div className={classes.searchIcon}>
                  <Search style={{ color: "#707585" }} />
                </div>
                <InputBase
                  placeholder="Cari solusi jawaban"
                  style={{ color: "#707585", fontSize: 12, height: 40 }}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "Search" }}
                />
              </div>
            </Grid>
          </Grid>
        )}
      </AppBar>
    </Box>
  );
}

Component.propTypes = {
  title: PropTypes.element.isRequired,
  backTo: PropTypes.string
};

Component.defaultProps = {
  title: "Belanja"
};

export default withRouter(withStyles(styles)(Component));
