/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import currencyFormatter from "../../utilities/currency-formatter";
import * as Sentry from "@sentry/react";

import {
  Paper,
  Container,
  CssBaseline,
  Typography,
  InputBase,
  AppBar,
  CircularProgress,
  Slide,
  Dialog as BaseDialog
} from "@material-ui/core";
import BackButton from "@material-ui/icons/ArrowBackIos";
import addVoucher from "../../vector/addVoucher.svg";
import Dialog from "../../components/dialog";
import Loading from "../../components/loading";
import { calculateOrder } from "../../services/orders";
import { useLocation, useHistory } from "react-router-dom";
import { withTransaction } from "@elastic/apm-rum-react";
import { CartContext } from "../../context/cart";
import CountryData from "../../utilities/country-code";
import { validatePhone } from "../../utilities/validate-phone";
import moment from "moment";
import vectorErrorClose from "../../vector/errorClose.svg";
import WatchIcon from "../../vector/watchIcon";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Voucher(props) {
  const { classes } = props;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState(" ");
  const query = useQuery();
  const tabs = query.get("tabs");
  const user = JSON.parse(localStorage.getItem("users"));
  const [selectedCountryCode, setSelectedCountryCode] = useState("ID");
  const { cart } = useContext(CartContext);
  const [selectedAddress, setSelectedAddress] = useState(
    tabs === "0"
      ? JSON.parse(localStorage.getItem("savedData"))
      : JSON.parse(localStorage.getItem("selectedAddress"))
  );
  const [selectedShipping, setSelectedShipping] = useState(
    JSON.parse(localStorage.getItem("selectedShipping") || null)
  );
  const [calculateResponse, setCalculateResponse] = useState(null);
  const [voucherError, setVoucherError] = useState(false);
  const [voucherSuccess, setVoucherSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const selectedPasar = JSON.parse(localStorage.getItem("selectedPasar"));
  const thisDay = moment(new Date())
    .format("dddd")
    .toLowerCase();
  const [uniqueError, setUniqueError] = useState("");
  const [excludedProductCategories, setExcludedProductCategories] = useState(
    []
  );
  const [productCategories, setProductCategories] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);

  const countryCodeNumber = CountryData[selectedCountryCode].secondary.slice(
    1,
    CountryData[selectedCountryCode].secondary.length
  );

  const validPhone = validatePhone(selectedAddress?.phone, countryCodeNumber);

  const handleCalculateOrder = async (isShippingNull, isVoucherNull) => {
    setIsLoading(true);

    const body = {
      items:
        cart.map(item => {
          return {
            productId: item.id,
            quantity: item.total,
            note: "",
            addons:
              item.addons.length === 0
                ? []
                : item.selectedAddon.map(option => {
                    return {
                      id: option.addonId,
                      quantity: item.total,
                      optionId: option.id
                    };
                  })
          };
        }) || [],
      contact: {
        phone: validPhone || "",
        email: selectedAddress?.email || ""
      },
      shipping: {
        name: selectedAddress?.name || user?.email || "",
        phone: validPhone || "",
        email: selectedAddress?.email || "",
        address: selectedAddress?.address || "",
        postcode: selectedAddress?.postcode || "",
        country: selectedAddress?.country || "",
        latitude: Number(selectedAddress?.latitude) || "",
        longitude: Number(selectedAddress?.longitude) || "",
        note: selectedAddress?.note || "",
        provinceId: selectedAddress?.provinceId || "",
        cityId: selectedAddress?.cityId || "",
        districtId: selectedAddress?.districtId || "",
        subdistrictId: selectedAddress?.subdistrictId || "",
        shippingChannel: !selectedShipping
          ? null
          : {
              id: selectedShipping?.id,
              service: selectedShipping?.code
            }
      },
      billing: {
        name: selectedAddress?.name || user?.email || "",
        phone: validPhone || "",
        email: selectedAddress?.email || "",
        address: selectedAddress?.address || "",
        postcode: selectedAddress?.postcode || "",
        country: selectedAddress?.country || "",
        latitude: Number(selectedAddress?.latitude) || "",
        longitude: Number(selectedAddress?.longitude) || "",
        note: selectedAddress?.note || "",
        provinceId: selectedAddress?.provinceId || "",
        cityId: selectedAddress?.cityId || "",
        districtId: tabs === "0" ? "" : selectedAddress?.districtId || "",
        subdistrictId: tabs === "0" ? "" : selectedAddress?.subdistrictId || ""
      },
      voucherCode: input,
      customerNote: selectedAddress?.note
    };

    await calculateOrder(body)
      .then(res => {
        localStorage.setItem(
          "isNeedCompleteAddress",
          res.data.data.isNeedCompleteAddress
        );

        if (
          !res?.data?.data?.availableShippings?.find(
            item => item.name === "Pickup"
          ) &&
          res?.data?.data?.isShippingRequired === true
        ) {
          urlParams.set("tabs", "1");
          history.replace(
            `${history.location.pathname}?${urlParams.toString()}`
          );
        }

        if (
          res?.data?.data?.availableShippings?.length === 1 &&
          res?.data?.data?.availableShippings[0].name === "Pickup" &&
          res?.data?.data?.isNeedCompleteAddress === false
        ) {
          urlParams.set("tabs", "0");
          history.replace(
            `${history.location.pathname}?${urlParams.toString()}`
          );
        }

        if (tabs !== "1") {
          setSelectedShipping(
            res?.data?.data?.availableShippings?.find(
              item => item.name === "Pickup"
            )
          );
        }

        setIsLoading(false);
        setCalculateResponse(res?.data?.data);

        if (res?.data?.data?.vouchers.length > 0) {
          setVoucherSuccess(true);
        }
        localStorage.removeItem("isUsed");
      })
      .catch(error => {
        setIsLoading(false);
        localStorage.removeItem("isUsed");

        if (
          error?.response?.data?.meta?.errorCode === "VOUCHER_INVALID_ERROR"
        ) {
          setVoucherError(error?.response?.data?.meta?.errorCode);
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode === "VOUCHER_EXPIRED_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          setVoucherError(error?.response?.data?.meta?.errorCode);
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_USAGE_LIMIT_REACHED_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          setVoucherError(error?.response?.data?.meta?.errorCode);
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_MIN_SPEND_LIMIT_NOT_MET_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          setVoucherError(error?.response?.data?.meta?.errorCode);
          setErrorMessage(error?.response?.data?.meta?.message);

          return;
        }

        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_MAX_SPEND_LIMIT_MET_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          setVoucherError(error?.response?.data?.meta?.errorCode);
          setErrorMessage(error?.response?.data?.meta?.message);
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_RESTRICTED_EMAIL_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          setVoucherError(error?.response?.data?.meta?.errorCode);
          return;
        }
        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_APPLIED_INDIVIDUAL_USE_ONLY_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          setVoucherError(error?.response?.data?.meta?.errorCode);
          return;
        }
        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_NOT_APPLICABLE_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          setVoucherError(error?.response?.data?.meta?.errorCode);
          setUniqueError(
            error?.response?.data?.meta?.fields.voucher.productIds
          );
          setErrorMessage(
            error?.response?.data?.meta?.fields.voucher.excludedProductIds
          );
          setProductCategories(
            error?.response?.data?.meta?.fields.voucher.productCategories
          );
          setExcludedProductCategories(
            error?.response?.data?.meta?.fields.voucher
              .excludedProductCategories
          );
          return;
        }

        if (error?.response?.data?.meta?.statusCode === 409) {
          localStorage.removeItem("usedVoucher");
          setVoucherError(true);
          localStorage.removeItem("myVoucher");
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode === "LOCATION_IS_CLOSED_ERROR"
        ) {
          setError(error?.response?.data?.meta?.errorCode);
          localStorage.setItem("isLocationClose", "true");
          return;
        }
        if (
          error?.response?.data?.meta?.errorCode ===
          "LOCATION_IS_CLOSED_HOUR_ERROR"
        ) {
          setError(error?.response?.data?.meta?.errorCode);
          localStorage.setItem("isLocationCloseHour", "true");
          return;
        }

        if (error?.response?.data?.meta?.statusCode === 400) {
          Sentry.captureException(error, {
            extra: {
              payload: {
                headers: error.response.config.headers,
                data: error.response.config.data
              },
              response: error.response.data
            }
          });
          localStorage.removeItem("selectedShipping");
          localStorage.removeItem("selectedPayment");
          setSelectedShipping(null);
          return;
        }

        if (
          error?.response?.data?.meta?.message ===
          "There's no active shipping channel yet!"
        ) {
          localStorage.removeItem("selectedShipping");
          localStorage.removeItem("selectedPayment");
          setSelectedShipping(null);
          return;
        }

        if (error?.response?.data?.meta?.statusCode === 500) {
          setErrorMessage(error?.response?.data?.meta?.message);
          localStorage.removeItem("selectedShipping");
          localStorage.removeItem("selectedPayment");
          setSelectedShipping(null);
          return;
        }

        setSelectedShipping(null);
        console.log(error);
        setErrorMessage(error?.response?.data?.meta?.message);
        localStorage.removeItem("selectedShipping");
        localStorage.removeItem("selectedPayment");
        localStorage.removeItem("usedVoucher");
      });
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setInput(localStorage.getItem("usedVoucher") || "");
  }, []);
  return (
    <React.Fragment>
      <BaseDialog open={isLoading} TransitionComponent={Transition}>
        <div style={{ padding: 10 }}>
          <CircularProgress />
        </div>
      </BaseDialog>

      <Container
        elevation={0}
        component="main"
        maxWidth="xs"
        className={classes.container}
      >
        <CssBaseline />
        <AppBar
          style={{
            width: "100%",
            maxWidth: 444,
            backgroundColor: "white",
            padding: 16,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)"
          }}
          classes={{ positionFixed: classes.appBar }}
          elevation={1}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <BackButton
              style={{
                color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                cursor: "pointer",
                marginRight: 10
              }}
              onClick={() => {
                if (user && tabs === "1") {
                  history.push("/cart-shipment/vouchers?tabs=1");
                }
                if (user && tabs !== "1") {
                  history.push("/cart-shipment/vouchers?tabs=0");
                }
                if (!user && tabs === "1") {
                  history.push("/cart-shipment?tabs=1");
                }
                if (!user && tabs !== "1") {
                  history.push("/cart-shipment?tabs=0");
                }
              }}
            />

            <strong style={{ color: "black" }}>Kode Promo</strong>
          </div>
        </AppBar>
        <Paper elevation={0} className={classes.body}>
          <img
            src={addVoucher}
            alt="addVoucher"
            className={classes.addVoucher}
          />
          <div className={classes.content}>
            <Typography
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 600
              }}
            >
              Punya Kode Voucher?
            </Typography>
            <Typography
              style={{
                marginTop: 16,
                fontSize: 12,
                fontWeight: 400,
                textAlign: "center"
              }}
            >
              Masukkan kode vouchernya dibawah ini!
            </Typography>
          </div>
          <div className={classes.searchWrapper}>
            <div className={classes.searchDiv}>
              <InputBase
                value={input}
                placeholder="Kode voucher"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={event => setInput(event.target.value.toUpperCase())}
              />
            </div>
          </div>
          <div
            style={{
              padding: "16px 16px 0px",
              position: "fixed",
              width: "100%",
              maxWidth: 444,
              bottom: 16
            }}
          >
            <div
              className={classes.button}
              style={{
                backgroundColor:
                  input?.length > 0
                    ? process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                    : "#A6A6A6"
              }}
              onClick={() => {
                // props.goBack(input);
                handleCalculateOrder();
                localStorage.setItem("usedVoucher", input);
                localStorage.removeItem("myVoucher");
                localStorage.setItem("isUsed", "true");
              }}
            >
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: process.env.REACT_APP_COLOR_FONT || "#000000"
                }}
              >
                Submit
              </Typography>
            </div>
          </div>
        </Paper>
        <Dialog
          button="OK"
          open={voucherError || voucherSuccess}
          onClose={event => {
            if (voucherSuccess) {
              localStorage.setItem("usedVoucher", input);
              localStorage.setItem("isUsed", true);
              if (tabs === "1") {
                history.push("/cart-shipment?tabs=1");
              }
              if (tabs !== "1") {
                history.push("/cart-shipment?tabs=0");
              }
              return;
            }
            setVoucherError(false);
            localStorage.removeItem("isUsed");
            localStorage.removeItem("usedVoucher");
          }}
          content={
            voucherError ? (
              <div className={classes.voucherErrorWrapper}>
                <Typography className={classes.titleVoucherError}>
                  Voucher Gagal Terpasang!
                </Typography>
                {voucherError === "VOUCHER_NOT_APPLICABLE_ERROR" && (
                  <div className={classes.voucherMessageWrapper}>
                    {uniqueError.length > 0 && (
                      <div style={{ fontSize: 10 }}>
                        Hanya berlaku untuk
                        <ul style={{ paddingLeft: 25, margin: 0 }}>
                          {uniqueError.map(item => (
                            <li>{item.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {errorMessage.length > 0 && (
                      <div style={{ fontSize: 10 }}>
                        Tidak berlaku untuk
                        <ul style={{ paddingLeft: 25, margin: 0 }}>
                          {errorMessage.map(item => (
                            <li>{item.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {productCategories.length > 0 && (
                      <div style={{ fontSize: 10 }}>
                        Berlaku untuk kategori
                        <ul style={{ paddingLeft: 25, margin: 0 }}>
                          {productCategories.map(item => (
                            <li>{item.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {excludedProductCategories.length > 0 && (
                      <div style={{ fontSize: 10 }}>
                        Tidak berlaku untuk kategori
                        <ul style={{ paddingLeft: 25, margin: 0 }}>
                          {excludedProductCategories.map(item => (
                            <li>{item.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                {voucherError !== "VOUCHER_NOT_APPLICABLE_ERROR" && (
                  <div className={classes.voucherMessageWrapper}>
                    <ul style={{ fontSize: 12, paddingLeft: 25, margin: 0 }}>
                      <li>
                        {voucherError === "VOUCHER_INVALID_ERROR"
                          ? "Kode voucher yang kamu gunakan tidak valid. Silahkan masukkan kode yang benar dan coba lagi."
                          : voucherError === "VOUCHER_EXPIRED_ERROR"
                          ? "Masa berlaku voucher sudah habis."
                          : voucherError === "VOUCHER_USAGE_LIMIT_REACHED_ERROR"
                          ? "Batas penggunaan voucher telah tercapai."
                          : voucherError ===
                            "VOUCHER_MIN_SPEND_LIMIT_NOT_MET_ERROR"
                          ? `Minimum pembelanjaan untuk voucher ini adalah ${errorMessage?.slice(
                              38,
                              -1
                            )}.`
                          : voucherError === "VOUCHER_MAX_SPEND_LIMIT_MET_ERROR"
                          ? `Maksimum pembelanjaan untuk voucher ini adalah ${errorMessage?.slice(
                              38,
                              -1
                            )}.`
                          : voucherError === "VOUCHER_RESTRICTED_EMAIL_ERROR"
                          ? "Karena pembatasan email."
                          : voucherError ===
                            "VOUCHER_APPLIED_INDIVIDUAL_USE_ONLY_ERROR"
                          ? "Error applied individual use only"
                          : voucherError === "VOUCHER_NOT_ENABLE_ERROR"
                          ? "Voucher not Enable"
                          : ""}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                  marginBottom: 70
                }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    textAlign: "center"
                  }}
                >
                  Voucher Telah Terpasang
                </Typography>
                <Typography
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    textAlign: "center"
                  }}
                >
                  Voucher senilai{" "}
                  {currencyFormatter.format(
                    Number(calculateResponse?.totalDiscount)
                  )}{" "}
                  telah terpasang, selamat menikmati!
                </Typography>
              </div>
            )
          }
        />
        <Dialog
          button="OK"
          onClose={() => {
            if (localStorage.getItem("isLocationClose", "true")) {
              history.push("/cart");
            }
            setError(false);
          }}
          open={error === "LOCATION_IS_CLOSED_ERROR"}
          avatar={vectorErrorClose}
          content={
            <div style={{ textAlign: "center", marginBottom: 70 }}>
              <Typography style={{ fontSize: 18, fontWeight: 600 }}>
                Toko Tutup Sementara
              </Typography>
              <Typography
                style={{ fontSize: 12, color: "#808080", marginBottom: 37 }}
              >
                Cek lagi nanti atau tunggu beberapa saat
              </Typography>
            </div>
          }
        />

        <Dialog
          button="OK"
          onClose={() => {
            if (localStorage.getItem("isLocationCloseHour", "true")) {
              history.push("/cart");
            }
            setError(false);
          }}
          open={error === "LOCATION_IS_CLOSED_HOUR_ERROR"}
          avatar={vectorErrorClose}
          content={
            <div style={{ textAlign: "center", marginBottom: 70 }}>
              <Typography style={{ fontSize: 18, fontWeight: 600 }}>
                Toko Tutup
              </Typography>
              <Typography style={{ fontSize: 12, color: "#808080" }}>
                Cek lagi nanti atau tunggu beberapa saat
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <WatchIcon />
                <Typography
                  style={{ fontSize: 14, fontWeight: "bold", marginLeft: 5 }}
                >
                  Tutup &#9679;{" "}
                  <span style={{ fontWeight: 400 }}>
                    {selectedPasar?.openHours?.[thisDay]?.hours?.length === 0
                      ? "Maaf hari ini toko tutup"
                      : `Buka hari ini ${selectedPasar?.openHours?.[thisDay]?.hours[0]?.open} - ${selectedPasar?.openHours?.[thisDay]?.hours[0]?.close}`}
                  </span>
                </Typography>
              </div>
            </div>
          }
        />
      </Container>
    </React.Fragment>
  );
}
export default withTransaction("Voucher", "component")(Voucher);
