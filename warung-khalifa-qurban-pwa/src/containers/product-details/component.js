/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import ContentLoader from "react-content-loader";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withTransaction } from "@elastic/apm-rum-react";
import { getProductDetail } from "../../services/products";
import Fab from "../../components/fab";
import currencyFormatter from "../../utilities/currency-formatter";
import AppBar from "../../components/app-bar";
import Dialog from "../../components/dialog";
import { useHistory } from "react-router-dom";
import ProductSlider from "../../components/product-slider";
import { useIntl } from "react-intl";
import { CartContext } from "../../context/cart";

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

function ProductDetails(props) {
  const {
    addCart,
    increaseCart,
    decreaseCart,
    cart,
    cartUpdated,
    increaseCartAddon,
    decreaseCartAddon
  } = useContext(CartContext);
  const history = useHistory();
  const intl = useIntl();

  const [productDetails, setProductDetails] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isAddon, setIsAddon] = useState(false);

  const xs = useMediaQuery("(max-width:320px)");

  const discountPercent =
    productDetails.promoPriceType === "PERCENTAGE"
      ? productDetails.promoPrice
      : (100 -
          (productDetails.promoPrice / productDetails.regularPrice) * 100) %
          1 ===
        0
      ? 100 - (productDetails.promoPrice / productDetails.regularPrice) * 100
      : (
          100 -
          (productDetails.promoPrice / productDetails.regularPrice) * 100
        ).toFixed(2);

  const fabStyle = () => {
    if (cart.length > 0) {
      return { paddingBottom: 100 };
    }
  };

  const productId = props.match.params.id;

  const [qty, setQty] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(false);

  const isLocationClose =
    localStorage.getItem("isLocationClose") ||
    localStorage.getItem("isLocationCloseHour");

  const handleAddon = () => {
    setIsAddon(!isAddon);
  };

  useEffect(() => {
    const initializeApp = async () => {
      const response = await getProductDetail(productId);
      const selectedItem = cart.find(item => item.id === response.id);
      if (selectedItem) {
        setQty(selectedItem.total);
      } else {
        setQty(0);
      }
      setProductDetails(response);
      setIsLoading(false);
    };

    initializeApp();
  }, [cart, productId]);

  useEffect(() => {
    if (qty) {
      if (productDetails.addonString) {
        const product = cart
          .filter(item => item.id === productDetails.id)
          .map(data => data.total)
          ?.reduce((x, y) => x + y);

        if (product >= productDetails.quantity) {
          setMaxQuantity(true);
          return;
        }
      } else {
        if (qty >= productDetails.quantity) {
          setMaxQuantity(true);
          return;
        }
      }
    }
    setMaxQuantity(false);
  }, [qty, decreaseCartAddon, decreaseCart, cart]);

  useEffect(() => {
    const selectedItem = cart.find(item => item.id === productDetails.id);
    if (selectedItem) {
      setQty(selectedItem.total);
    } else {
      setQty(0);
    }
  }, [cart, cartUpdated, productDetails.id]);

  useEffect(() => {
    if (
      decreaseCartAddon &&
      cart.filter(data => data.id === productDetails.id).length === 0
    ) {
      setIsAddon(false);
    }
  }, [decreaseCartAddon]);

  const { classes } = props;

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <AppBar
          title={`${intl.formatMessage({ id: "productDetail.title" })}`}
          goBack={true}
        />
        {isLoading ? (
          <MyLoader />
        ) : (
          <Paper elevation={0} className={classes.paper} style={fabStyle()}>
            <div>
              <ProductSlider data={productDetails} />
            </div>
            <CardContent style={{ paddingBottom: 100 }}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography
                    display="block"
                    variant="caption"
                    className={classes.title}
                  >
                    {productDetails.name}
                  </Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {productDetails.isPromo && (
                      <>
                        <Typography
                          variant="caption"
                          style={{
                            color:
                              process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                          }}
                        >
                          Diskon <b>{discountPercent}%</b>
                        </Typography>
                        <div style={{ color: "grey", margin: "0px 10px" }}>
                          |
                        </div>
                      </>
                    )}
                    {productDetails.isPromo && (
                      <Typography
                        display="block"
                        gutterBottom
                        variant="caption"
                      >
                        <b className={classes.old}>
                          {currencyFormatter.format(
                            productDetails.regularPrice
                          )}
                        </b>
                      </Typography>
                    )}
                    {!productDetails.isPromo && (
                      <div style={{ display: "flex" }}>
                        <Typography variant="caption" className={classes.price}>
                          {currencyFormatter.format(productDetails.price)}
                        </Typography>
                        <Typography variant="caption" className={classes.unit}>
                          {productDetails.unit ? `/${productDetails.unit}` : ""}
                        </Typography>
                      </div>
                    )}
                    {productDetails.isPromo && (
                      <>
                        <Typography
                          display="block"
                          gutterBottom
                          variant="caption"
                          className={classes.price}
                        >
                          <b>
                            {currencyFormatter.format(productDetails.price)}
                          </b>
                        </Typography>
                        <div
                          style={{ color: "grey", fontSize: 10, marginLeft: 2 }}
                        >
                          {productDetails.unit ? `/${productDetails.unit}` : ""}
                        </div>
                      </>
                    )}
                  </div>
                </Grid>

                <Grid style={{ marginTop: 8 }} item xs={12}>
                  <Divider fullWidth style={{ marginBottom: 8 }} />
                  <Typography
                    variant="caption"
                    style={{ fontSize: 12, fontWeight: 700 }}
                  >
                    {intl.formatMessage({ id: "productDetail.description" })}:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productDetails.description || "-"
                      }}
                      style={{
                        fontSize: 10,
                        marginBottom: -2,
                        wordBreak: "break-word"
                      }}
                    />
                  </Typography>
                  <Divider style={{ marginBottom: 16 }} fullWidth />
                </Grid>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Grid item xs={4}>
                    {cart && qty > 0 ? (
                      <div>
                        {productDetails.addons.length > 0 ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              cursor: "pointer"
                            }}
                            onClick={handleAddon}
                          >
                            <div className={classes.buttonAddon}>
                              {
                                cart.filter(
                                  data => data.id === productDetails.id
                                ).length
                              }{" "}
                              Item
                            </div>
                            <div className={classes.addonInfo}>
                              {intl.formatMessage({
                                id: "cardProduct.canCustomized"
                              })}
                            </div>
                          </div>
                        ) : (
                          <ButtonGroup
                            size="small"
                            aria-label="Small outlined button group"
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "space-between",
                              width: "-webkit-fill-available"
                            }}
                          >
                            <Button
                              onClick={() => {
                                decreaseCart(productDetails);
                              }}
                              style={{
                                color:
                                  process.env.REACT_APP_COLOR_FONT || "#000000",
                                borderRadius: 5,
                                maxWidth: 28,
                                minWidth: 28,
                                maxHeight: 28,
                                minHeight: 28,
                                borderRight: "1px solid rgba(0, 0, 0, 0.23)"
                              }}
                              disabled={isLocationClose}
                            >
                              -
                            </Button>
                            <Button
                              style={{
                                border: "0",
                                fontWeight: 700,
                                fontSize: 13,
                                maxWidth: 28,
                                minWidth: 28,
                                maxHeight: 28,
                                minHeight: 28
                              }}
                            >
                              {qty || 0}
                            </Button>
                            <Button
                              onClick={() => {
                                increaseCart(productDetails);
                              }}
                              style={{
                                color:
                                  process.env.REACT_APP_COLOR_FONT || "#000000",
                                backgroundColor: isLocationClose
                                  ? "#adadad"
                                  : maxQuantity
                                  ? "#adadad"
                                  : process.env.REACT_APP_COLOR_PRIMARY ||
                                    "#FFD101",
                                border: `1px solid ${process.env
                                  .REACT_APP_COLOR_PRIMARY || "#FFD101"}`,
                                borderRadius: 5,
                                maxWidth: 28,
                                minWidth: 28,
                                maxHeight: 28,
                                minHeight: 28
                              }}
                              disabled={maxQuantity || isLocationClose}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        )}
                      </div>
                    ) : (
                      <>
                        {productDetails.onStock ? (
                          <>
                            {productDetails.addons.length > 0 ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  cursor: "pointer"
                                }}
                                onClick={() => {
                                  cart.findIndex(
                                    data => data.id === productDetails.id
                                  ) !== -1
                                    ? handleAddon()
                                    : history.push(
                                        `/addons?id=${productDetails.id}`
                                      );
                                }}
                              >
                                <div className={classes.buttonAddon}>
                                  Tambah
                                </div>
                                <div className={classes.addonInfo}>
                                  {intl.formatMessage({
                                    id: "cardProduct.canCustomized"
                                  })}{" "}
                                </div>
                              </div>
                            ) : (
                              <Button
                                onClick={() => {
                                  addCart(productDetails);
                                }}
                                style={{
                                  color:
                                    process.env.REACT_APP_COLOR_FONT ||
                                    "#000000",
                                  backgroundColor: isLocationClose
                                    ? "#adadad"
                                    : process.env.REACT_APP_COLOR_PRIMARY ||
                                      "#FFD101",
                                  borderRadius: 5,
                                  width: "100%",
                                  height: 28,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  textTransform: "none",
                                  fontFamily:
                                    process.env.REACT_APP_FONT_URL_BUTTON ||
                                    "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
                                }}
                                disabled={isLocationClose}
                              >
                                Beli
                              </Button>
                            )}
                          </>
                        ) : (
                          <Button
                            variant="contained"
                            disabled
                            style={{
                              borderRadius: 5,
                              width: "100%",
                              padding: 0,
                              height: 28,
                              fontSize: 13,
                              fontWeight: 700,
                              textTransform: "none",
                              fontFamily:
                                process.env.REACT_APP_FONT_URL_BUTTON ||
                                "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
                            }}
                          >
                            Stok Habis
                          </Button>
                        )}
                      </>
                    )}
                  </Grid>
                </div>
              </Grid>
            </CardContent>
            <Dialog
              open={isAddon}
              onClose={() => setIsAddon(false)}
              content={
                <div style={{ maxHeight: 400 }}>
                  <div style={{ paddingBottom: 70 }}>
                    {cart
                      ?.filter(data => data.id === productDetails.id)
                      ?.map(item => {
                        let newData = item?.selectedAddon?.reduce(function(
                          acc,
                          curr
                        ) {
                          let findIndex = acc.findIndex(function(item) {
                            return item.addonId === curr.addonId;
                          });

                          if (findIndex === -1) {
                            acc.push(curr);
                          } else {
                            acc[findIndex] = Object.assign({}, acc[findIndex], {
                              ...curr,
                              name: [acc[findIndex].name, curr.name]
                            });
                          }

                          return acc;
                        },
                        []);

                        console.log(newData);
                        return (
                          <div style={{ marginBottom: 16 }}>
                            <div
                              style={{
                                color: "#333333",
                                fontWeight: 500,
                                fontSize: xs ? 11 : 14
                              }}
                            >
                              {item.name}
                            </div>
                            <Divider style={{ margin: "16px 0px" }} />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: xs ? 10 : 12
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column"
                                }}
                              >
                                {newData?.map(option => {
                                  return (
                                    <div>
                                      {option.addonName} :{" "}
                                      <b>
                                        {typeof option.name === "string" ? (
                                          <>{option.name}</>
                                        ) : (
                                          <>
                                            {option.name.map((name, index) => (
                                              <>
                                                {index > 0 && ", "}
                                                {name}
                                              </>
                                            ))}
                                          </>
                                        )}
                                      </b>
                                    </div>
                                  );
                                })}
                              </div>

                              <b>{item.totalPrice}</b>
                            </div>
                            <div
                              style={{
                                marginTop: 8,
                                fontSize: xs ? 10 : 12
                              }}
                            >
                              Catatan :{" "}
                              <b>{item.note === "" ? "-" : item.note}</b>
                            </div>
                            <ButtonGroup
                              size="small"
                              aria-label="Small outlined button group"
                              style={{
                                justifyContent: "flex-end",
                                width: "-webkit-fill-available",
                                marginRight: 1
                              }}
                            >
                              <Button
                                style={{
                                  color:
                                    process.env.REACT_APP_COLOR_PRIMARY ||
                                    "#FFD101",
                                  borderColor:
                                    process.env.REACT_APP_COLOR_PRIMARY ||
                                    "#FFD101",
                                  border: "1px solid",
                                  borderRadius: 5,
                                  textTransform: "capitalize",
                                  marginRight: 12
                                }}
                                onClick={() =>
                                  history.push(
                                    `/addons?id=${item.id}&items=${item.addonString}`
                                  )
                                }
                                disabled={isLocationClose}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                style={{
                                  color:
                                    process.env.REACT_APP_COLOR_FONT_BUTTON ||
                                    "#000000",
                                  borderRadius: 5,
                                  maxWidth: 28,
                                  minWidth: 28,
                                  maxHeight: 28,
                                  minHeight: 28,
                                  border: "1px solid silver",
                                  fontWeight: 700
                                }}
                                disabled={isLocationClose}
                                onClick={() => decreaseCartAddon(item)}
                              >
                                -
                              </Button>

                              <Button
                                size="small"
                                style={{
                                  border: "0",
                                  fontWeight: 800,
                                  fontSize: 13,
                                  maxWidth: 58,
                                  minWidth: 58,
                                  maxHeight: 28,
                                  minHeight: 28
                                }}
                              >
                                {item.total || 0}
                              </Button>
                              <Button
                                size="small"
                                onClick={e => increaseCartAddon(item)}
                                style={{
                                  color:
                                    process.env.REACT_APP_COLOR_FONT ||
                                    "#000000",
                                  backgroundColor: isLocationClose
                                    ? "#adadad"
                                    : maxQuantity
                                    ? "#adadad"
                                    : process.env.REACT_APP_COLOR_PRIMARY ||
                                      "#FFD101",
                                  border: `1px solid ${process.env
                                    .REACT_APP_COLOR_PRIMARY || "#FFD101"}`,
                                  borderRadius: 5,
                                  maxWidth: 28,
                                  minWidth: 28,
                                  maxHeight: 28,
                                  minHeight: 28,
                                  fontWeight: 700
                                }}
                                disabled={maxQuantity || isLocationClose}
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </div>
                        );
                      })}
                    <Divider />
                  </div>
                </div>
              }
              button="Tambah"
              push={() => history.push(`/addons?id=${productDetails.id}`)}
              addons={maxQuantity}
            />
          </Paper>
        )}

        {cart.length > 0 && <Fab to="/cart?from=/" />}
      </Container>
    </React.Fragment>
  );
}

export default withTransaction("ProductDetails", "component")(ProductDetails);
