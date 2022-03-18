import React, { useContext, useEffect, useState } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import currencyFormatter from "../../utilities/currency-formatter";
import { CartContext } from "../../context/cart";
import "./index.css";
import Dialog from "../dialog";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useIntl } from "react-intl";

function ProductItem(props) {
  const { classes, product } = props;
  const history = useHistory();
  const {
    addCart,
    increaseCart,
    decreaseCart,
    cart,
    cartUpdated,
    decreaseCartAddon,
    increaseCartAddon
  } = useContext(CartContext);
  const [qty, setQty] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(false);
  const [isAddon, setIsAddon] = useState(false);
  const xs = useMediaQuery("(max-width:320px)");
  const intl = useIntl();

  const isLocationClose =
    localStorage.getItem("isLocationClose") ||
    localStorage.getItem("isLocationCloseHour");

  useEffect(() => {
    const selectedItem = cart.find(item => item.id === product.id);
    if (selectedItem) {
      setQty(selectedItem.total);
    } else {
      setQty(0);
    }
    // eslint-disable-next-line
  }, [cartUpdated]);

  useEffect(() => {
    if (qty > 0) {
      if (product.addonString) {
        const item = cart
          .filter(item => item.id === product.id)
          .map(data => data.total)
          ?.reduce((x, y) => x + y);

        if (item >= product.quantity) {
          setMaxQuantity(true);
          return;
        }
      } else {
        if (qty >= product.quantity) {
          setMaxQuantity(true);
          return;
        }
      }
    }
    setMaxQuantity(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, decreaseCartAddon, decreaseCart]);

  const discountPercent =
    product.promoPriceType === "PERCENTAGE"
      ? product.promoPrice
      : (100 - (product.promoPrice / product.regularPrice) * 100) % 1 === 0
      ? 100 - (product.promoPrice / product.regularPrice) * 100
      : (100 - (product.promoPrice / product.regularPrice) * 100).toFixed(2);

  const cardMedia = () => {
    if (product.isPromo && product.size === null) {
      return "space-between";
    }
    if (product.isPromo) {
      return "flex-start";
    }
    if (product.size === null) {
      return "flex-end";
    }
  };

  const handleAddon = () => {
    setIsAddon(!isAddon);
  };

  useEffect(() => {
    if (
      decreaseCartAddon &&
      cart.filter(data => data.id === product.id).length === 0
    ) {
      setIsAddon(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decreaseCartAddon]);

  return (
    <Box className={classes.card}>
      <Grid container spacing={0} className={classes.wrapper}>
        <Grid
          item
          xs={4}
          onClick={() => {
            props.productSeller
              ? props.history.push(
                  `/product/${product.id}?from=/product-seller`
                )
              : props.history.push(
                  `/product/${product.id}?from=/category/${product.category_id}`
                );
          }}
        >
          <CardMedia
            className={classes.media}
            image={
              product.image.url
                ? product.image.url
                : "https://via.placeholder.com/150"
            }
            style={{
              filter: isLocationClose ? "grayscale(100%)" : "unset"
            }}
          >
            <div
              className={classes.cardMedia}
              style={{ justifyContent: cardMedia() }}
            >
              {product.isPromo && (
                <p className={classes.cardMediaDisc}>
                  Disc.
                  {discountPercent}%
                </p>
              )}
              {product.size === null && (
                <div className={classes.cardMediaDigital}>Produk Digital</div>
              )}
            </div>
          </CardMedia>
        </Grid>
        <Grid item xs={8} style={{ paddingLeft: 10 }}>
          <p
            className="title"
            onClick={() => {
              props.productSeller
                ? props.history.push(
                    `/product/${product.id}?from=/product-seller`
                  )
                : props.history.push(
                    `/product/${product.id}?from=/category/${product.category_id}`
                  );
            }}
          >
            {product.name}
          </p>
          <div style={{ fontSize: 10, color: "#cccccc" }}>
            Min. order {product.minimumOrderQuantity} x {product.unit}
          </div>
          <div
            onClick={() => {
              props.productSeller
                ? props.history.push(
                    `/product/${product.id}?from=/product-seller`
                  )
                : props.history.push(
                    `/product/${product.id}?from=/category/${product.category_id}`
                  );
            }}
            className={classes.priceWrapper}
          >
            {product.isPromo && (
              <Typography variant="caption" className={classes.old}>
                {currencyFormatter.format(product.regularPrice)}
              </Typography>
            )}
            {product.isPromo && (
              <>
                {product.price === 0 ? (
                  <>
                    <Typography
                      style={{ marginBottom: 15 }}
                      className={classes.price}
                    >
                      Gratis
                    </Typography>
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography className={classes.price}>
                        {currencyFormatter.format(product.price)}
                      </Typography>
                      <Typography className={classes.unit}>
                        {product.unit ? `/${product.unit}` : ""}
                      </Typography>
                    </div>
                  </>
                )}
              </>
            )}
            {!product.isPromo && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography className={classes.price}>
                  {currencyFormatter.format(product.price)}
                </Typography>
                <Typography className={classes.unit}>
                  {product.unit ? `/${product.unit}` : ""}
                </Typography>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end"
            }}
          >
            {qty > 0 ? (
              <div>
                {product.addons.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer"
                    }}
                    onClick={handleAddon}
                  >
                    <div className={classes.buttonAddon}>
                      {cart.filter(data => data.id === product.id).length} Item
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
                    className={classes.buttonGroup}
                  >
                    <Button
                      onClick={event => {
                        decreaseCart(product);
                      }}
                      style={{
                        color: process.env.REACT_APP_COLOR_FONT || "#000000",

                        border: "1px solid #C4C4C4",
                        borderRadius: 5
                      }}
                      className={classes.buttonMinus}
                      disabled={isLocationClose}
                    >
                      -
                    </Button>
                    <Button className={classes.buttonQty}>{qty || 0}</Button>
                    <Button
                      onClick={event => {
                        increaseCart(product);
                      }}
                      style={{
                        color: process.env.REACT_APP_COLOR_FONT || "#000000",
                        backgroundColor: isLocationClose
                          ? "#adadad"
                          : maxQuantity
                          ? "#adadad"
                          : process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                        border: `1px solid ${process.env
                          .REACT_APP_COLOR_SECONDARY || "#FFE570"}`,
                        borderRadius: 5
                      }}
                      disabled={maxQuantity || isLocationClose}
                      className={classes.buttonPlus}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                )}
              </div>
            ) : (
              <div>
                {product.onStock &&
                product.quantity >= product.minimumOrderQuantity ? (
                  <>
                    {product.addons.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          cart.findIndex(data => data.id === product.id) !== -1
                            ? handleAddon()
                            : history.push(`/addons?id=${product.id}`);
                        }}
                      >
                        <div className={classes.buttonAddon}>Tambah</div>
                        <div className={classes.addonInfo}>
                          {intl.formatMessage({
                            id: "cardProduct.canCustomized"
                          })}
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={event => {
                          addCart(product);
                        }}
                        style={{
                          color: process.env.REACT_APP_COLOR_FONT || "#000000",
                          backgroundColor: isLocationClose
                            ? "#adadad"
                            : process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                          fontFamily:
                            process.env.REACT_APP_FONT_URL_BUTTON ||
                            "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
                        }}
                        className={classes.buttonAdd}
                        disabled={isLocationClose}
                      >
                        {intl.formatMessage({ id: "cardProduct.buy" })}
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    variant="contained"
                    disabled
                    style={{
                      fontFamily:
                        process.env.REACT_APP_FONT_URL_BUTTON ||
                        "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
                    }}
                    className={classes.buttonEmpty}
                  >
                    Stok Habis
                  </Button>
                )}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={isAddon}
        onClose={() => setIsAddon(false)}
        content={
          <div style={{ maxHeight: 400 }}>
            <div style={{ paddingBottom: 70 }}>
              {cart
                ?.filter(data => data.id === product.id)
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
                      if (typeof acc[findIndex].name === "string") {
                        acc[findIndex] = Object.assign({}, acc[findIndex], {
                          ...curr,
                          name: [acc[findIndex].name, curr.name]
                        });
                      } else {
                        acc[findIndex] = Object.assign({}, acc[findIndex], {
                          ...curr,
                          name: [...acc[findIndex].name, curr.name]
                        });
                      }
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
                          style={{ display: "flex", flexDirection: "column" }}
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

                        <b>{currencyFormatter.format(item.totalPrice)}</b>
                      </div>
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: xs ? 10 : 12
                        }}
                      >
                        Catatan : <b>{item.note === "" ? "-" : item.note}</b>
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
                              process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                            borderColor:
                              process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
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
        push={() => history.push(`/addons?id=${product.id}`)}
        addons={maxQuantity}
      />
    </Box>
  );
}

export default withRouter(ProductItem);
