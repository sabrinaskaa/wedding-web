/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import BackButton from "@material-ui/icons/ArrowBackIos";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Store from "@material-ui/icons/Store";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import HistoryIcon from "../../vector/history.svg";
import appbar from "../../vector/appbar.svg";
import styles from "./styles";
import { useIntl } from "react-intl";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Component(props) {
  const initialState = {
    selectedPasar: JSON.parse(localStorage.getItem("selectedPasar"))
  };
  const intl = useIntl();
  const user = JSON.parse(localStorage.getItem("users"));
  const [state, setState] = useState(initialState);
  const query = useQuery();
  const id = query.get("id");
  const ref = query.get("ref");
  const goBack = () => {
    if (ref === "/cart-shipment") {
      props.history.push("/cart");
      return;
    }
    switch (props.match.path) {
      case "/product/:id":
        props.history.goBack();
        break;

      case "/order-history":
        props.history.goBack("/orders");
        break;

      case "/category/:id":
        props.history.push("/");
        break;

      case "/order/:id":
        user ? props.history.push("/orders") : props.history.push("/");
        break;

      case "/cart-shipment":
        props.history.push("/cart?from=/");
        localStorage.removeItem("selectedShipping");
        localStorage.removeItem("usedVoucher");
        break;

      case "/cart-shipment?tabs=1":
        props.history.push("/cart?from=/");
        localStorage.removeItem("selectedShipping");
        localStorage.removeItem("usedVoucher");
        break;

      case "/cart?from=/":
        props.history.push("/");
        break;

      case "/login?ref=/profile":
        props.history.push("/");
        break;

      case "/login?ref=/orders":
        props.history.push("/");
        break;

      case "/cart-shipment/address":
        props.history.push("/cart-shipment?tabs=1");
        break;

      case "/new-address":
        props.history.push("/cart-shipment/address");
        break;

      case "/profile/address":
        props.history.push("/profile");
        break;

      default:
        props.history.goBack();
        break;
    }
  };
  const { classes, history } = props;
  const searchStyle = () => {
    if (window.location.pathname === "/") {
      return { marginLeft: 0, marginTop: 20 };
    }
    return { marginLeft: 0, backgroundColor: "#F2F2F2" };
  };
  const homeStyle = () => {
    if (window.location.pathname === "/") {
      return { height: 152 };
    }
  };
  const homeAppbar = () => {
    if (window.location.pathname === "/") {
      return {
        background: "linear-gradient(to right, #e96443, #904e95)",
        backgroundImage: `url(${appbar})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      };
    }
    return { backgroundColor: "white", color: "black" };
  };
  return (
    <React.Fragment>
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
          <Toolbar variant="dense" style={{ minHeight: 64 }}>
            {props.goBack && ref !== "/" && (
              <IconButton
                edge="start"
                className={classes.backButton}
                aria-label="Menu"
                onClick={goBack}
              >
                <BackButton />
              </IconButton>
            )}
            {props.customBack && (
              <IconButton
                edge="start"
                className={classes.backButton}
                aria-label="Menu"
                onClick={props.customBack}
              >
                <BackButton />
              </IconButton>
            )}
            {props.goBackHome && (
              <IconButton
                edge="start"
                className={classes.backButton}
                aria-label="Menu"
                onClick={() => props.history.push("/")}
              >
                <BackButton />
              </IconButton>
            )}
            {props.goBackProfile && (
              <IconButton
                edge="start"
                className={classes.backButton}
                aria-label="Menu"
                onClick={() => props.history.push("/")}
              >
                <BackButton />
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
                  <SearchIcon style={{ color: "#707585" }} />
                </div>
                <InputBase
                  placeholder={`${intl.formatMessage({
                    id: "category.search"
                  })}`}
                  style={{ color: "#707585", marginTop: -4, width: "100%" }}
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
                {props.title}
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
                <img src={HistoryIcon} alt="history" />
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
                    <b>{state.selectedPasar.name}</b>
                  </Typography>
                  <Typography
                    style={{ paddingLeft: 16, color: "#707585", fontSize: 10 }}
                    variant="caption"
                    gutterBottom
                  >
                    {/* {state.selectedPasar.address} */}
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
                      color: process.env.REACT_APP_COLOR_FONT || "#000000"
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
                    <SearchIcon style={{ color: "#707585" }} />
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
    </React.Fragment>
  );
}

Component.propTypes = {
  title: PropTypes.element.isRequired,
  backTo: PropTypes.string
};

Component.defaultProps = {
  title: ""
};

export default withRouter(withStyles(styles)(Component));
