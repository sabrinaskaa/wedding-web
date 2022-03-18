import React, { useState, useContext } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  Typography,
  Grid,
  Box,
  Button,
  Divider,
  Paper
} from "@material-ui/core";
import currencyFormatter from "../../utilities/currency-formatter";

import vectorInfo from "../../vector/Vectorinfo.svg";
import vectorPasar from "../../vector/Vectorpasar.svg";
import { useIntl } from "react-intl";
import { CartContext } from "../../context/cart";

function Component(props) {
  const { classes } = props;
  const [selectedPasar] = useState(
    JSON.parse(localStorage.getItem("selectedPasar"))
  );
  const { price } = useContext(CartContext);
  const intl = useIntl();

  return (
    <Box
      className={classes.box}
      display="flex"
      justifyContent="center"
      bgcolor="white"
    >
      <div className={classes.stickToBottom}>
        <Paper className={classes.paperbtn}>
          <Grid container>
            <Grid item xs={6} style={{ marginBottom: 8 }}>
              {intl.formatMessage({ id: "cart.totalPayment" })}
            </Grid>
            <Grid align="right" item xs={6} style={{ marginBottom: 8 }}>
              {currencyFormatter.format(price)}
            </Grid>
            {window.location.pathname === "/cart" && (
              <Grid item xs={12}>
                <Grid item xs={12} align="center" style={{ display: "flex" }}>
                  <img src={vectorInfo} alt="Info versi" />
                  <Typography
                    style={{ color: "grey", marginLeft: 8 }}
                    variant="caption"
                    display="block"
                  >
                    {"  "}
                    {intl.formatMessage({ id: "cart.shipping" })}
                  </Typography>
                </Grid>

                <Divider
                  style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
                />
                <Typography
                  variant="caption"
                  display="block"
                  style={{ margin: "8px 0" }}
                >
                  {intl.formatMessage({ id: "cart.shopAt" })}:{" "}
                  <img src={vectorPasar} alt="Vector Pasar" />{" "}
                  <b>{selectedPasar.name}</b>
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                style={{
                  backgroundColor:
                    process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                  color: process.env.REACT_APP_COLOR_FONT || "#000000",
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "none",
                  fontFamily:
                    process.env.REACT_APP_FONT_FAMILY_BUTTON || "Poppins"
                }}
                variant="contained"
                fullWidth
                onClick={props.link}
              >
                <ShoppingCartIcon style={{ fontSize: 16, marginRight: 10 }} />
                {props.name}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Box>
  );
}

export default Component;
