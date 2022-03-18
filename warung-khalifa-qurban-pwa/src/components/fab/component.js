import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import currencyFormatter from "../../utilities/currency-formatter";
import Fab from "../../vector/fab.js";
import { CartContext } from "../../context/cart";

function BottomFab(props) {
  const selectedPasar = JSON.parse(localStorage.getItem("selectedPasar"));
  const { cart, price } = useContext(CartContext);
  const { classes } = props;
  const homeStyle = () => {
    if (window.location.pathname === "/") {
      return { marginBottom: 41 };
    }
  };

  const isLocationClose =
    localStorage.getItem("isLocationClose") ||
    localStorage.getItem("isLocationCloseHour");

  const fabStyle = () => {
    if (window.location.pathname === "/") {
      return {
        width: "100%",
        maxWidth: 442,
        position: "fixed",
        height: 70,
        bottom: 70,
        background: "transparent",
        borderRadius: 0,
        padding: "0 16px 16px",
        boxShadow: "none",
        border: "none",
        color: process.env.REACT_APP_COLOR_FONT || "#000000",
        filter: isLocationClose ? "grayScale(1)" : "unset"
      };
    }
    return {
      width: "100%",
      maxWidth: 442,
      position: "fixed",
      bottom: 12,
      height: 70,
      background: "transparent",
      borderRadius: 0,
      padding: "0 16px 8px",
      boxShadow: "none",
      border: "none",
      color: process.env.REACT_APP_COLOR_FONT || "#000000",
      filter: isLocationClose ? "grayScale(1)" : "unset"
    };
  };
  if (cart.length < 1) {
    return null;
  }
  return (
    <React.Fragment>
      {cart.length > 0 && (
        <Paper style={fabStyle()}>
          <Paper
            className={classes.fab}
            onClick={() => {
              if (!isLocationClose) {
                props.history.push(props.to);
              }
            }}
            cart={cart}
            style={homeStyle()}
            elevation={0}
          >
            <Grid
              container
              spacing={0}
              style={{
                padding: "8px 16px"
              }}
            >
              <Grid
                item
                xs={1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10
                }}
              >
                <Fab style={{ fontSize: 20 }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{
                    marginBottom: -5,
                    fontWeight: "bold",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    color: process.env.REACT_APP_COLOR_FONT || "#000000"
                  }}
                >
                  {cart.length} Item
                </Typography>
                <Typography
                  variant="caption"
                  style={{
                    fontSize: 12,
                    color: process.env.REACT_APP_COLOR_FONT || "#000000"
                  }}
                >
                  {selectedPasar.name}
                </Typography>
              </Grid>

              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: process.env.REACT_APP_COLOR_FONT || "#000000"
                }}
              >
                {currencyFormatter.format(price)}
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      )}
    </React.Fragment>
  );
}

export default withRouter(BottomFab);
