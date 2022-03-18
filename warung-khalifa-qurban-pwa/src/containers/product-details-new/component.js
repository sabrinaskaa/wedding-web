import React, { useState, useEffect, useContext } from "react";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import ContentLoader from "react-content-loader";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { withRouter } from "react-router-dom";
import { getProductDetail } from "../../services/products";
import Fab from "../../components/fab";
import NotesIcon from "../../vector/notes.svg";
import CloseIcon from "../../vector/close.svg";
import currencyFormatter from "../../utilities/currency-formatter";
import AppBar from "../../components/app-bar";
import { CartContext } from "../../context/cart";

function ProductDetail(props) {
  const { classes } = props;
  const {
    addCart,
    increaseCart,
    decreaseCart,
    cart,
    cartUpdated,
    addNote
  } = useContext(CartContext);
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [qty, setQty] = useState(0);
  const [note, setNote] = useState("");

  const productId = props.match.params.id;

  const handleWrite = e => {
    setNote(e.target.value);
    addNote(props.match.params.id, e.target.value);
  };

  const getMeasurement = arrayOfMetaData => {
    const measurement = arrayOfMetaData.filter(
      meta => meta.key === "_woo_uom_input"
    );
    if (measurement.length > 0) {
      return measurement[0].value;
    }
    return "";
  };

  const MyLoader = () => (
    <ContentLoader
      height={600}
      width={400}
      speed={1}
      primaryColor="#ededed"
      secondaryColor="#d1d1d1"
    >
      <rect x="14" y="30" rx="5" ry="5" width="376" height="267" />
      <rect x="18" y="320" rx="0" ry="0" width="182" height="29" />
      <rect x="287" y="319" rx="0" ry="0" width="98" height="32" />
      <rect x="16" y="380" rx="5" ry="5" width="368" height="58" />
      <rect x="18" y="461" rx="5" ry="5" width="271" height="42" />
      <rect x="20" y="524" rx="5" ry="5" width="237" height="28" />
    </ContentLoader>
  );

  useEffect(() => {
    const initializeApp = async () => {
      const response = await getProductDetail(productId);
      const selectedItem = cart.find(item => item.id === response.id);
      if (selectedItem) {
        setQty(selectedItem.total);
      } else {
        setQty(0);
      }
      setProductDetail(response);
      setIsLoading(false);
    };
    initializeApp();
  }, [cart, productId]);

  useEffect(() => {
    const selectedItem = cart.find(item => item.id === productDetail.id);

    if (selectedItem) {
      setQty(selectedItem.total);
    } else {
      setQty(0);
    }
  }, [cart, cartUpdated, productDetail.id]);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <AppBar title="Detail Produk" goBack />
        {isLoading ? (
          <MyLoader />
        ) : (
          <Paper elevation={0} className={classes.paper}>
            <div>
              <CardMedia
                className={classes.media}
                image={
                  productDetail.images.length > 0
                    ? productDetail.images[0].src
                    : "https://via.placeholder.com/150"
                }
              >
                <div className={classes.cardMedia} />
              </CardMedia>
            </div>
            <CardContent>
              <Grid item xs={9}>
                <Typography
                  display="block"
                  variant="caption"
                  className={classes.title}
                >
                  {productDetail.name}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 8
                  }}
                >
                  {productDetail.sale_price !== "" && (
                    <p
                      className={classes.cardMediaTitle}
                      style={{ margin: "0px 8px 0px 0px" }}
                    >
                      Diskon.
                      {(
                        ((productDetail.regular_price -
                          productDetail.sale_price) /
                          productDetail.regular_price) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                  )}
                  {productDetail.sale_price !== "" && (
                    <Typography display="block" variant="caption">
                      <b
                        className={classes.old}
                        style={{ margin: "0px 8px 0px 0px" }}
                      >
                        {currencyFormatter.format(productDetail.regular_price)}
                      </b>
                    </Typography>
                  )}
                  {productDetail.sale_price !== "" && (
                    <Typography
                      display="block"
                      variant="caption"
                      className={classes.price}
                    >
                      {" "}
                      {currencyFormatter.format(productDetail.sale_price)}
                      <b
                        style={{
                          color: "#A0A4A8",
                          fontSize: 11
                        }}
                      >
                        {" "}
                        /{getMeasurement(productDetail.meta_data)}
                      </b>
                    </Typography>
                  )}
                  {productDetail.sale_price === "" && (
                    <Typography
                      display="block"
                      variant="caption"
                      className={classes.price}
                    >
                      {currencyFormatter.format(productDetail.regular_price)}
                      <b style={{ color: "#A0A4A8", fontSize: 11 }}>
                        {" "}
                        /{getMeasurement(productDetail.meta_data)}
                      </b>
                    </Typography>
                  )}
                </div>
              </Grid>
              <Grid style={{ marginTop: 10 }} item xs={12}>
                <Divider fullWidth style={{ margin: "16px 0px" }} />

                <Typography variant="caption">
                  <b>Deskripsi produk:</b>
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="caption">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: productDetail.description || "-"
                    }}
                  />
                </Typography>
              </Grid>
              <Divider fullWidth style={{ margin: "16px 0px" }} />

              <Grid>
                <div>
                  <List style={{ padding: 0 }}>
                    <span style={{ fontSize: 12 }}>Catatan</span>
                    <InputBase
                      style={{
                        marginTop: 8,
                        width: "100%",
                        padding: 16,
                        background: " #FBFBFB",
                        border: "1.5px solid rgba(37, 37, 37, 0.05)",
                        borderRadius: 3
                      }}
                      value={note}
                      onChange={handleWrite}
                      multiline="true"
                      placeholder="Masukkan catatan disini"
                      startAdornment={
                        <InputAdornment
                          position="start"
                          style={{ padding: "0 8px 0 0" }}
                        >
                          <img src={NotesIcon} alt="Notes" />
                        </InputAdornment>
                      }
                      endAdornment={
                        <>
                          {note === "" ? (
                            <div />
                          ) : (
                            <IconButton
                              onClick={() => setNote("")}
                              style={{ padding: 0 }}
                            >
                              <img
                                src={CloseIcon}
                                alt="Close icon"
                                style={{ paddingLeft: 8 }}
                              />
                            </IconButton>
                          )}
                        </>
                      }
                    />
                  </List>
                </div>
              </Grid>

              <Divider fullWidth style={{ margin: "16px 0px" }} />

              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                item
                xs={12}
              >
                {qty > 0 ? (
                  <ButtonGroup
                    size="small"
                    aria-label="Small outlined button group"
                    style={{
                      width: 90,
                      display: "flex",
                      justifyContent: "center",
                      marginRight: 10
                    }}
                  >
                    <Button
                      onClick={() => {
                        decreaseCart(productDetail);
                      }}
                      style={{
                        color: "#153b50",
                        borderRadius: 4,
                        maxWidth: 30,
                        minWidth: 30,
                        maxHeight: 30,
                        minHeight: 30,
                        padding: 1
                      }}
                    >
                      -
                    </Button>
                    <Button
                      style={{
                        border: "0",
                        fontWeight: "bold",
                        fontSize: 12,
                        maxWidth: 30,
                        minWidth: 30,
                        maxHeight: 30,
                        minHeight: 30,
                        padding: 1
                      }}
                    >
                      {qty || 0}
                    </Button>
                    <Button
                      onClick={() => {
                        increaseCart(productDetail);
                      }}
                      style={{
                        color: process.env.REACT_APP_COLOR_FONT || "#000000",
                        backgroundColor:
                          process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                        borderRadius: 4,
                        maxWidth: 30,
                        minWidth: 30,
                        maxHeight: 30,
                        minHeight: 30,
                        padding: 1
                      }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                ) : (
                  <div>
                    {productDetail.stock_status === "instock" ? (
                      <Button
                        onClick={() => {
                          addCart(productDetail);
                        }}
                        style={{
                          color: process.env.REACT_APP_COLOR_FONT || "#000000",
                          backgroundColor:
                            process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                          borderRadius: 4,
                          width: 90,
                          height: 30,
                          fontSize: 10,
                          textTransform: "capitalize",
                          fontFamily:
                            process.env.REACT_APP_FONT_URL_BUTTON ||
                            "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
                        }}
                      >
                        Beli
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        disabled
                        style={{
                          borderRadius: 4,
                          width: 90,
                          padding: 0,
                          height: 30,
                          fontSize: 8,
                          fontFamily:
                            process.env.REACT_APP_FONT_URL_BUTTON ||
                            "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
                        }}
                      >
                        <b>Stok Habis</b>
                      </Button>
                    )}
                  </div>
                )}
              </Grid>
            </CardContent>
          </Paper>
        )}

        <Fab to="/cart?from=/" />
      </Container>
    </React.Fragment>
  );
}

export default withRouter(ProductDetail);
