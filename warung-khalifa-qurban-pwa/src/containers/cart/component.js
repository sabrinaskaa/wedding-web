/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Paper,
  Grid,
  Button,
  Container,
  CssBaseline,
  Divider,
  Box
} from "@material-ui/core";
import usePopState from "react-usepopstate";

import AppBar from "../../components/app-bar";
import BottomSheet from "../../components/bottom-sheet";
import Loading from "../../components/loading";
import CartItem from "../../components/product-cart";

import KosongVector from "../../vector/kosongVector.svg";
import { useIntl } from "react-intl";
import { CartContext } from "../../context/cart";
import { withTransaction } from "@elastic/apm-rum-react";

function CartPage(props) {
  const { classes, history, subTotalPrice } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { cart, cartUpdated } = useContext(CartContext);
  const [qty, setQty] = useState(0);
  const intl = useIntl();

  const { isBackButtonClick } = usePopState({
    isPrompt: false,
    callback: () => {
      history.push("/");
    }
  });

  useEffect(() => {
    const selectedItem = cart.find(item => item.id);
    if (selectedItem) {
      setQty(selectedItem.total);
    } else {
      setQty(0);
    }
    setIsLoading(false);
  }, [cartUpdated]);

  useEffect(() => {
    localStorage.removeItem("selectedPayment");
    localStorage.removeItem("usedVoucher");
  }, []);

  if (cart.length < 1) {
    props.history.push("/");
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <Container
          elevation={0}
          component="main"
          maxWidth="xs"
          className={classes.container}
        >
          <CssBaseline />
          <AppBar title={intl.formatMessage({ id: "cart.title" })} goBack />
          <Paper elevation={0} className={classes.body}>
            {cart < 1 && (
              <div>
                <div align="center" className={classes.empty}>
                  <img src={KosongVector} alt="Cart kosong" />
                </div>

                <Box
                  display="flex"
                  justifyContent="center"
                  m={1}
                  p={1}
                  bgcolor="background.paper"
                >
                  <Typography align="center" variant="subtitle1">
                    <strong>
                      {""}
                      {intl.formatMessage({
                        id: "cartOrder.requirements.1.0"
                      })}{" "}
                      :(
                    </strong>
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  justifyContent="center"
                  m={1}
                  p={1}
                  bgcolor="background.paper"
                >
                  <Typography
                    align="center"
                    className={classes.caption}
                    variant="caption"
                  >
                    <p>
                      {""}
                      {intl.formatMessage({ id: "cartOrder.requirements.2.0" })}
                    </p>
                    <p>
                      {""}
                      {intl.formatMessage({ id: "cartOrder.requirements.3.0" })}
                    </p>
                  </Typography>
                  <div className={classes.stickToBottom}>
                    <Paper className={classes.paperbtn}>
                      <Button
                        style={{
                          backgroundColor:
                            process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                          color: process.env.REACT_APP_COLOR_FONT || "#000000",
                          fontWeight: "bold",
                          textTransform: "none"
                        }}
                        variant="contained"
                        fullWidth
                        onClick={() => props.history.push("/")}
                      >
                        {""}
                        {intl.formatMessage({
                          id: "cartOrder.requirements.4.0"
                        })}
                      </Button>
                    </Paper>
                  </div>
                </Box>
              </div>
            )}
            {cart.length > 0 && (
              <div>
                <Grid container spacing={0} style={{ padding: 16 }}>
                  <Grid item xs={6}>
                    <Typography
                      variant="caption"
                      display="block"
                      style={{ fontWeight: 700 }}
                    >
                      {intl.formatMessage({ id: "cart.totalProduct" })}:{" "}
                      {cart.length}
                    </Typography>
                  </Grid>
                  <Grid align="right" item xs={6}>
                    <Button
                      onClick={() => history.push("/")}
                      disableRipple
                      style={{
                        color: process.env.REACT_APP_COLOR_FONT || "#000000",
                        textTransform: "none",
                        fontSize: 12,
                        padding: 0,
                        fontWeight: 700
                      }}
                    >
                      {intl.formatMessage({ id: "cart.addMore" })}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}

            {cart &&
              cart.map((item, index) => (
                <div>
                  <CartItem item={item} key={index} />
                </div>
              ))}
          </Paper>
        </Container>
      )}
      {cart.length > 0 && (
        <BottomSheet
          name={`${intl.formatMessage({ id: "cartOrder.requirements.5.0" })}`}
          link={() => history.push("/cart-shipment?tabs=0")}
          price={subTotalPrice}
        />
      )}
    </React.Fragment>
  );
}
export default withTransaction("CartPage", "component")(CartPage);
