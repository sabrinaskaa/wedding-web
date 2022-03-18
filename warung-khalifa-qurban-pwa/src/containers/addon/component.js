import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Divider,
  Paper,
  InputBase,
  CircularProgress
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withTransaction } from "@elastic/apm-rum-react";
import Appbar from "../../components/app-bar";
import NoteIcon from "../../vector/noteIcon";
import CloseIcon from "@material-ui/icons/Close";
import { getProductDetail } from "../../services/products";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../context/cart";
import { useHistory } from "react-router-dom";
import currencyFormatter from "../../utilities/currency-formatter";
import { useIntl } from "react-intl";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Addon(props) {
  const { classes } = props;
  const query = useQuery();
  const history = useHistory();
  const id = query.get("id");
  const idUpdate = query.get("items");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState([]);
  const [note, setNote] = useState("");
  const { addCartAddon, cart, updateCartAddon } = useContext(CartContext);
  const [isValid, setIsValid] = useState(false);
  const intl = useIntl();

  const handleOption = (option, addonId, addonName, maxOption) => () => {
    const currentIndex = selectedOption.findIndex(
      data => data?.id === option.id
    );
    const filterIndexAddon = selectedOption.findIndex(
      data => data?.addonId === addonId
    );

    const newChecked = [...selectedOption];

    if (currentIndex === -1) {
      if (
        selectedOption.filter(item => item.addonId === addonId).length ===
        maxOption
      ) {
        newChecked[filterIndexAddon] = {
          ...option,
          addonId: addonId,
          addonName: addonName
        };
      } else {
        newChecked.push({ ...option, addonId: addonId, addonName: addonName });
      }
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelectedOption(newChecked);
  };

  const handleNote = e => {
    setNote(e.target.value);
  };

  const getDetailProduct = async () => {
    await getProductDetail(id)
      .then(res => {
        setData(res);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setIsLoading(true);
    getDetailProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (idUpdate) {
      const indexUpdate = cart.findIndex(
        data => data?.addonString === idUpdate
      );
      setSelectedOption(cart[indexUpdate].selectedAddon);
      setNote(cart[indexUpdate].note);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUpdate]);

  useEffect(() => {
    if (data) {
      const minimumOption = data?.addons.map(item => {
        return (
          selectedOption.filter(option => option.addonId === item.id).length >=
          item.minimumOptionToChoose
        );
      });

      const maximumOption = data?.addons.map(item => {
        return (
          selectedOption.filter(option => option.addonId === item.id).length <=
          (item.maximumOptionToChoose || Number.MAX_SAFE_INTEGER)
        );
      });

      if (
        minimumOption.indexOf(false) === -1 &&
        maximumOption.indexOf(false) === -1
      ) {
        setIsValid(true);
        return;
      }
      setIsValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, JSON.stringify(data)]);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <Appbar
          title={`${intl.formatMessage({ id: "addon.appBar" })}`}
          goBack
        />

        <Paper className={classes.paper}>
          {isLoading && (
            <div
              style={{
                minHeight: "90vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <CircularProgress />
            </div>
          )}
          <div className={classes.boxWrapper}>
            <div className={classes.title}>{data?.name}</div>
            <div
              className={classes.subtitle}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
          </div>
          <div style={{ height: 8, backgroundColor: "#FAFAFA" }}></div>
          {data?.addons?.map(addon => {
            return (
              <div className={classes.boxWrapper}>
                <div className={classes.title}>{addon.name}</div>
                {addon.isRequired && (
                  <div
                    style={{
                      color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                      fontSize: 10,
                      fontWeight: 500,
                      marginBottom: 16
                    }}
                  >
                    {intl.formatMessage({ id: "addon.chooseMinimum" })}{" "}
                    {addon.minimumOptionToChoose}
                  </div>
                )}

                <Divider />
                {addon.options.map(option => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 24,
                        cursor: "pointer"
                      }}
                      onClick={
                        option.quantity !== 0 &&
                        handleOption(
                          option,
                          addon.id,
                          addon.name,
                          addon.maximumOptionToChoose
                        )
                      }
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            backgroundColor: "#FAFAFA",
                            borderRadius: "100%",
                            marginRight: 16,
                            height: 24,
                            width: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          {selectedOption.findIndex(
                            data => data?.id === option.id
                          ) !== -1 && (
                            <div
                              style={{
                                backgroundColor:
                                  process.env.REACT_APP_COLOR_PRIMARY ||
                                  "#FFD101",
                                borderRadius: "100%",
                                height: 16,
                                width: 16
                              }}
                            ></div>
                          )}
                        </div>
                        <div
                          style={{
                            color: "#333333",
                            fontSize: 10,
                            fontWeight: 500
                          }}
                        >
                          {option.name}
                        </div>
                      </div>

                      {option.quantity === 0 ? (
                        <div
                          style={{
                            color: "#808080",
                            fontSize: 12,
                            fontWeight: 600
                          }}
                        >
                          {intl.formatMessage({ id: "addon.outOfStock" })}{" "}
                        </div>
                      ) : (
                        <>
                          {option.price === 0 ? (
                            <div
                              style={{
                                color: "#808080",
                                fontSize: 12,
                                fontWeight: 600
                              }}
                            >
                              {intl.formatMessage({ id: "addon.free" })}
                            </div>
                          ) : (
                            <div
                              style={{
                                color:
                                  process.env.REACT_APP_COLOR_PRIMARY ||
                                  "#FFD101",
                                fontSize: 12,
                                fontWeight: 600
                              }}
                            >
                              +
                              {option.price
                                ?.toString()
                                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          <div
            style={{ height: 8, backgroundColor: "#FAFAFA", marginTop: 24 }}
          ></div>
          <div className={classes.boxWrapper}>
            <div className={classes.title}>
              {intl.formatMessage({ id: "addon.postscript" })}
            </div>
            <div
              style={{
                color: "#808080",
                fontSize: 10,
                fontWeight: 500,
                marginBottom: 16
              }}
            >
              {intl.formatMessage({ id: "addon.optional" })}
            </div>
            <Divider />
            <div className={classes.note}>
              <NoteIcon />
              <InputBase
                type="text"
                required
                placeholder={`${intl.formatMessage({
                  id: "addon.placeholder"
                })}`}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                InputProps={{
                  "aria-label": "search"
                }}
                value={note}
                onChange={handleNote}
              />
              {note?.length > 0 && (
                <CloseIcon
                  onClick={() => setNote("")}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>
          <div
            style={{
              padding: "0px 16px 16px",
              position: "fixed",
              width: "100%",
              maxWidth: 444,
              bottom: 0,
              borderTop: "1px solid #F5F5F5",
              backgroundColor: "white"
            }}
          >
            <div
              style={{
                margin: "12px 0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div className={classes.title}>
                {intl.formatMessage({ id: "addon.price" })}
              </div>
              <div style={{ display: "flex" }}>
                <div className={classes.title}>
                  {data?.price
                    ?.toString()
                    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </div>
                <span style={{ fontSize: 14, fontWeight: 400 }}>
                  /{data?.unit}
                </span>
              </div>
            </div>

            {isValid ? (
              <div
                className={classes.button}
                style={{
                  backgroundColor:
                    process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                }}
                onClick={() => {
                  if (idUpdate) {
                    if (selectedOption.length > 0) {
                      updateCartAddon(
                        data,
                        [...selectedOption],
                        note,
                        idUpdate
                      );
                      history.goBack();
                      return;
                    }
                    updateCartAddon(data, [], note, idUpdate);
                    history.goBack();
                    return;
                  } else {
                    if (selectedOption.length > 0) {
                      addCartAddon(data, [...selectedOption], note);
                      history.goBack();
                      return;
                    }
                    addCartAddon(data, [], note);
                    history.goBack();
                    return;
                  }
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: process.env.REACT_APP_COLOR_FONT || "#000000"
                  }}
                >
                  {intl.formatMessage({ id: "addon.add" })}{" "}
                  {selectedOption.length === 0
                    ? currencyFormatter.format(data?.price)
                    : currencyFormatter.format(
                        data?.price +
                          selectedOption
                            ?.map(total => total.price)
                            ?.reduce((x, y) => x + y)
                      )}
                </div>
              </div>
            ) : (
              <div
                className={classes.button}
                style={{
                  backgroundColor: "#AFAFAF"
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: process.env.REACT_APP_COLOR_FONT || "#000000"
                  }}
                >
                  {intl.formatMessage({ id: "addon.add" })}
                </div>
              </div>
            )}
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default withTransaction("Addon", "component")(Addon);
