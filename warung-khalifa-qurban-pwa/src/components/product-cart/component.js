import React, { useState, useEffect, useContext } from "react";
import currencyFormatter from "../../utilities/currency-formatter";
import {
  Typography,
  Grid,
  Button,
  Box,
  ButtonGroup,
  CardMedia
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../context/cart";
import "./index.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const CartItem = props => {
  const { item, classes } = props;
  const {
    cart,
    cartUpdated,
    increaseCart,
    decreaseCart,
    increaseCartAddon,
    decreaseCartAddon
  } = useContext(CartContext);
  const [qty, setQty] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const history = useHistory();

  const handleMore = () => {
    setIsMore(!isMore);
  };

  const isLocationClose =
    localStorage.getItem("isLocationClose") ||
    localStorage.getItem("isLocationCloseHour");

  useEffect(() => {
    const selectedItem = cart.find(product => item.id === product.id);
    if (selectedItem) {
      setQty(selectedItem.total);
    } else {
      setQty(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartUpdated]);

  useEffect(() => {
    if (qty > 0) {
      if (item.addonString) {
        const product = cart
          .filter(i => i.id === item.id)
          .map(data => data.total)
          ?.reduce((x, y) => x + y);

        if (product >= item.quantity) {
          setMaxQuantity(true);
          return;
        }
      } else {
        if (qty >= item.quantity) {
          setMaxQuantity(true);
          return;
        }
      }
    }
    setMaxQuantity(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, decreaseCartAddon, decreaseCart]);

  let newData = item?.selectedAddon?.reduce(function(acc, curr) {
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
  }, []);

  return (
    <Box className={classes.paper}>
      <Grid container spacing={0} className={classes.wrapper}>
        <Grid item xs={4}>
          <CardMedia
            className={classes.img}
            image={
              item.image.url
                ? item.image.url
                : "https://via.placeholder.com/150"
            }
            style={{
              filter: isLocationClose ? "grayscale(1)" : "unset"
            }}
          >
            <div className={classes.cardMedia}>
              {item.size === null && (
                <div className={classes.cardMediaDigital}>Produk Digital</div>
              )}
            </div>
          </CardMedia>
        </Grid>

        <Grid
          item
          xs={8}
          className={classes.descWrapper}
          style={{ minHeight: 100 }}
        >
          <p className="title">{item.name || "-"}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: -16,
              minHeight: "min-content",
              marginBottom: 15
            }}
          >
            {item.addons.length > 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "space-between"
                  }}
                >
                  {newData?.length > 1 ? (
                    <>
                      <div>
                        {newData?.slice(0, 1)?.map(option => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: -7
                              }}
                              onClick={handleMore}
                            >
                              <div style={{ fontSize: 10 }}>
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
                              <div>
                                {isMore ? (
                                  <KeyboardArrowUpIcon fontSize="small" />
                                ) : (
                                  <KeyboardArrowDownIcon fontSize="small" />
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {isMore &&
                          newData?.slice(1, newData.length)?.map(option => {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center"
                                }}
                                onClick={handleMore}
                              >
                                <div style={{ fontSize: 10 }}>
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
                              </div>
                            );
                          })}
                      </div>
                    </>
                  ) : (
                    <>
                      {newData?.map(option => {
                        return (
                          <div style={{ fontSize: 10 }}>
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
                    </>
                  )}

                  {item.price === 0 ? (
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
                      <Typography
                        variant="caption"
                        display="block"
                        className={classes.price}
                      >
                        {currencyFormatter.format(item.totalPrice)}
                      </Typography>
                      <Typography className={classes.unit}>
                        {item.unit_of_measure ? `/${item.unit_of_measure}` : ""}
                      </Typography>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div>
                {item.price === 0 ? (
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
                    <Typography
                      variant="caption"
                      display="block"
                      className={classes.price}
                    >
                      {currencyFormatter.format(item.totalPrice)}
                    </Typography>
                    <Typography className={classes.unit}>
                      {item.unit_of_measure ? `/${item.unit_of_measure}` : ""}
                    </Typography>
                  </>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <ButtonGroup
              size="small"
              aria-label="Small outlined button group"
              className={classes.buttonGroup}
            >
              {item.addons.length > 0 ? (
                <>
                  <Button
                    style={{
                      color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                      borderColor:
                        process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                      border: "1px solid",
                      borderRadius: 5,
                      textTransform: "capitalize",
                      marginRight: 12,
                      padding: 0
                    }}
                    disabled={isLocationClose}
                    onClick={() =>
                      history.push(
                        `/addons?id=${item.id}&items=${item.addonString}`
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      decreaseCartAddon(item);
                      setMaxQuantity(false);
                    }}
                    style={{
                      color: process.env.REACT_APP_COLOR_FONT || "#000000",
                      borderRadius: 5,
                      border: "1px solid #C4C4C4"
                    }}
                    disabled={isLocationClose}
                    className={classes.buttonMinus}
                  >
                    -
                  </Button>
                  <Button className={classes.buttonQty}>{item.total}</Button>
                  <Button
                    onClick={() => {
                      increaseCartAddon(item);
                    }}
                    style={{
                      color: process.env.REACT_APP_COLOR_FONT || "#000000",
                      backgroundColor: isLocationClose
                        ? "#adadad"
                        : maxQuantity
                        ? "#adadad"
                        : process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                      borderRadius: 5,
                      border: `1px solid ${process.env
                        .REACT_APP_COLOR_SECONDARY || "#FFE570"}`
                    }}
                    disabled={maxQuantity || isLocationClose}
                    className={classes.buttonPlus}
                  >
                    +
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      decreaseCart(item);
                      setMaxQuantity(false);
                    }}
                    style={{
                      color: process.env.REACT_APP_COLOR_FONT || "#000000",
                      borderRadius: 5,
                      border: "1px solid #C4C4C4"
                    }}
                    disabled={isLocationClose}
                    className={classes.buttonMinus}
                  >
                    -
                  </Button>
                  <Button className={classes.buttonQty}>{item.total}</Button>
                  <Button
                    onClick={() => {
                      increaseCart(item);
                    }}
                    style={{
                      color: process.env.REACT_APP_COLOR_FONT || "#000000",
                      backgroundColor: isLocationClose
                        ? "#adadad"
                        : maxQuantity
                        ? "#adadad"
                        : process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                      borderRadius: 5,
                      border: `1px solid ${process.env
                        .REACT_APP_COLOR_SECONDARY || "#FFE570"}`
                    }}
                    disabled={maxQuantity || isLocationClose}
                    className={classes.buttonPlus}
                  >
                    +
                  </Button>
                </>
              )}
            </ButtonGroup>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
