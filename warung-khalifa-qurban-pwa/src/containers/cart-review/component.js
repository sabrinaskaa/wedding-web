/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import DateRange from "@material-ui/icons/DateRange";
import LocationOn from "@material-ui/icons/LocationOn";
import Axios from "axios";
import firebase from "firebase/app";
import currencyFormatter from "../../utilities/currency-formatter";
import AppBar from "../../components/app-bar";
import "firebase/auth";

function Component(props) {
  useEffect(() => {
    const cartItems = localStorage.getItem("cart_items");
    if (cartItems) {
      props.restoreItems(JSON.parse(cartItems));
    }
  }, []);

  const createOrder = async () => {
    const { cartItems, history } = props;
    const userToken = await firebase.auth().currentUser.getIdToken();
    const user = JSON.parse(localStorage.getItem("users"));
    const { payment_method, name, address, email, phone } = JSON.parse(
      localStorage.getItem("user_form_data")
    );
    const line_items =
      cartItems &&
      cartItems.map(item => {
        if (!item.variation_id) {
          return {
            product_id: item.id,
            quantity: item.qty
          };
        }
        return {
          product_id: item.id,
          quantity: item.qty,
          variation_id: item.variation_id
        };
      });

    Axios.post(
      "https://asia-east2-tumbasin-production.cloudfunctions.net/api/createOrder",
      {
        customer_id: user.id,
        payment_method: "bacs",
        payment_method_title: payment_method,
        set_paid: true,
        billing: {
          first_name: name,
          last_name: name,
          address_1: address,
          address_2: "",
          city: "Semarang",
          state: "Jawa Tengah",
          postcode: "50265",
          country: "Indonesia",
          email,
          phone
        },
        shipping: {
          first_name: name,
          last_name: name,
          address_1: address,
          address_2: "",
          city: "Semarang",
          state: "Jawa Tengah",
          postcode: "50265",
          country: "Indonesia"
        },
        line_items,
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "flat_rate",
            total: "10000"
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Access-Control-Allow-Origin": true
        }
      }
    ).then(() => {
      localStorage.removeItem("cart_items");
      props.cartStateSetDefault();
      history.push("/cart-success");
    });
  };

  const { classes, cartItems } = props;
  const { address } = JSON.parse(localStorage.getItem("user_form_data"));

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <AppBar title="Detail Transaksi" goBack />
        <List className={classes.root}>
          <ListItem>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <b>Detail Pesanan</b>
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <ListItemText>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    <b>Kode Belanja : U88HN</b>
                  </Typography>

                  <Typography variant="caption" display="block" gutterBottom>
                    <DateRange className={classes.icon} />
                    13 Juni 2019
                  </Typography>
                </ListItemText>
              </Grid>
              <Grid align="right" item xs={3}>
                <ListItemText>
                  <Button color="secondary" size="small">
                    Batal
                  </Button>
                </ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        </List>

        <List className={classes.root}>
          {cartItems &&
            cartItems.map(item => (
              <ListItem key={item.id}>
                <Grid container spacing={0}>
                  <Grid item xs={1}>
                    <ListItemText>
                      <Typography
                        variant="subtitle2"
                        display="block"
                        gutterBottom
                      >
                        {`${2}x`}
                      </Typography>
                    </ListItemText>
                  </Grid>
                  <Grid align="left" item xs={7}>
                    <ListItemText>
                      <Typography
                        variant="subtitle2"
                        display="block"
                        gutterBottom
                      >
                        {item.name || "-"}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {item.currentPrice}/{" "}
                        {(item.data && item.meta_data[0].value) || "-"}
                      </Typography>
                    </ListItemText>
                  </Grid>
                  <Grid align="right" item xs={4}>
                    <ListItemText>
                      <Typography
                        variant="subtitle2"
                        display="block"
                        gutterBottom
                      >
                        {currencyFormatter.format(item.totalPrice)}
                      </Typography>
                    </ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          <Divider />
        </List>

        <List className={classes.root}>
          <ListItem>
            <Grid container spacing={0}>
              <Grid align="left" item xs={9}>
                <ListItemText>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    Subtotal
                  </Typography>
                </ListItemText>
              </Grid>
              <Grid align="right" item xs={3}>
                <ListItemText>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    {currencyFormatter.format(props.subTotalPrice)}
                  </Typography>
                </ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container spacing={0}>
              <Grid align="left" item xs={9}>
                <ListItemText>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    Ongkos Kirim
                  </Typography>
                </ListItemText>
              </Grid>
              <Grid align="right" item xs={3}>
                <ListItemText>
                  <ListItemText>
                    <Typography
                      variant="subtitle2"
                      display="block"
                      gutterBottom
                    >
                      {currencyFormatter.format(10000)}
                    </Typography>
                  </ListItemText>
                </ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container spacing={0}>
              <Grid align="left" item xs={9}>
                <ListItemText>
                  {" "}
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    Diskon
                  </Typography>
                </ListItemText>
              </Grid>
              <Grid align="right" item xs={3}>
                <ListItemText>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    {currencyFormatter.format(0)}
                  </Typography>
                </ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </List>

        <List className={classes.total}>
          <ListItem>
            <Grid container spacing={0}>
              <Grid align="left" item xs={9}>
                <ListItemText>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    <b>Transfer Bank</b>
                  </Typography>
                </ListItemText>
              </Grid>
              <Grid align="right" item xs={3}>
                <ListItemText>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    <b>
                      {currencyFormatter.format(props.subTotalPrice + 10000)}
                    </b>
                  </Typography>
                </ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container spacing={0}>
              <Grid align="left" item xs={12}>
                <ListItemText>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    <b>Detail Pengiriman</b>
                  </Typography>
                </ListItemText>
              </Grid>
              <Grid align="left" item xs={1}>
                <LocationOn />
              </Grid>
              <Grid align="left" item xs={11}>
                <ListItemText>
                  <Typography variant="caption" display="block" gutterBottom>
                    Alamat
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {address || "-"}
                  </Typography>
                </ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Container>

      <div className={classes.stickToBottom}>
        <Paper className={classes.paperbtn}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                className={classes.Button}
                onClick={() => {
                  createOrder();
                }}
              >
                Transfer
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
}
export default Component;
