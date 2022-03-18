import * as Sentry from "@sentry/react";
import AppBar from "../../components/app-bar";
import DialogShipmentMethod from "../../components/dialog-shipment-method";
import DialogPaymentMethod from "../../components/dialog-payment-method";
import LoadingOrder from "../../components/loading-order";
import Voucher from "../../components/voucher";
import Dialog from "../../components/dialog";
import ButtonPaymentMethod from "../../components/button-payment-method";
import ButtonShippingMethod from "../../components/button-shipping-method";
import currencyFormatter from "../../utilities/currency-formatter";
import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import {
  Container,
  List,
  ListItem,
  Divider,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  InputAdornment,
  Slide,
  Collapse,
  CircularProgress,
  Tabs,
  Tab,
  Dialog as BaseDialog
} from "@material-ui/core";
import vectorPasar from "../../vector/Vectorpasar.svg";
import vectorInfo from "../../vector/Vectorinfo.svg";
import { ReactComponent as Server } from "../../vector/serverBusy.svg";
import { ExpandMore, ChevronRight } from "@material-ui/icons";
import {
  createOrder,
  calculateOrder,
  createOrderGuest
} from "../../services/orders";
import { getUserAddrres } from "../../services/address";
import { CartContext } from "../../context/cart";
import Address from "../../vector/addresSelected.js";
import AddressEmpty from "../../vector/address.js";
import DialogErrorField from "../../components/dialog-error-field";
import ReactFlagsSelect from "react-flags-select";
import CountryData from "../../utilities/country-code";
import { withTransaction } from "@elastic/apm-rum-react";
import { validatePhone } from "../../utilities/validate-phone";
import vectorErrorClose from "../../vector/errorClose.svg";
import WatchIcon from "../../vector/watchIcon";
import moment from "moment";
import { tenantInfo } from "../../services/vendor";
import { Capitalize } from "../../utilities/capitalize";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const thisDay = moment(new Date())
  .format("dddd")
  .toLowerCase();

function CartShipment(props) {
  const intl = useIntl();
  const { classes } = props;
  const history = useHistory();
  const query = useQuery();
  const tabs = query.get("tabs");
  const { cart, price, restoreDefault } = useContext(CartContext);
  const selectedPasar = JSON.parse(localStorage.getItem("selectedPasar"));
  const user = JSON.parse(localStorage.getItem("users"));
  const payment = JSON.parse(localStorage.getItem("selectedPayment"));
  const shipping = JSON.parse(localStorage.getItem("selectedShipping"));
  const address = JSON.parse(localStorage.getItem("selectedAddress"));
  const savedData = JSON.parse(localStorage.getItem("savedData"));
  const voucherCode = localStorage.getItem("myVoucher");
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCreateOrder, setIsLoadingCreateOrder] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");
  const [openShipmentMethod, setOpenShipmentMethod] = useState(false);
  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [calculateResponse, setCalculateResponse] = useState(null);
  const [usedVoucher, setUsedVoucher] = useState("");
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isError, setIsError] = useState(false);
  const [dialogErrorField, setDialogErrorField] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("ID");
  const [voucherError, setVoucherError] = useState(false);
  /* eslint-disable no-unused-vars */
  const [voucherSuccess, setVoucherSuccess] = useState(false);
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  /* eslint-disable no-unused-vars */
  const [used, setUsed] = useState(null);
  const [hiddenTab, setHiddenTab] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [alertShipping, setAlertShipping] = useState(false);
  const [alertPayment, setAlertPayment] = useState(false);
  const [shippingNull, setShippingNull] = useState(false);
  const [isNullShippingChannel, setIsNullShippingChannel] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [dialogError, setDialogError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [internalServer, setInternalServer] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [isCloseHour, setIsCloseHour] = useState(false);
  const [recalculate, setRecalculate] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorValidation, setErrorValidation] = useState("");
  const [configurePoint, setConfigurePoint] = useState(false);
  const [uniqueError, setUniqueError] = useState("");
  const [excludedProductCategories, setExcludedProductCategories] = useState(
    []
  );
  const [productCategories, setProductCategories] = useState([]);

  const label = process.env.REACT_APP_SHIPPING_COST_LABEL || "Ongkir";
  const urlParams = new URLSearchParams(window.location.search);
  const countryCodeNumber = CountryData[selectedCountryCode].secondary.slice(
    1,
    CountryData[selectedCountryCode].secondary.length
  );

  const validPhone = validatePhone(selectedAddress?.phone, countryCodeNumber);

  const tenantDetail = async () => {
    await tenantInfo()
      .then(res => setConfigurePoint(res.data.pointConfiguration.isEnabled))
      .catch(err => console.log(err));
  };

  const handleCalculateOrder = async (isShippingNull, isVoucherNull) => {
    if (!firstLoad && tab === 0 && !isVoucherNull) {
      return;
    }
    setUsed(localStorage.getItem("isUsed"));
    setIsLoading(true);

    const body = {
      items:
        cart?.map(item => {
          return {
            productId: item.id,
            quantity: item.total,
            note: item.note || "",
            addons:
              item.addons.length === 0
                ? []
                : item.selectedAddon.length > 0
                ? item?.selectedAddon?.map(option => {
                    return {
                      id: option.addonId,
                      quantity: item.total,
                      optionId: option.id
                    };
                  })
                : []
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
        address: tabs === "0" ? "" : selectedAddress?.address || "",
        postcode: tabs === "0" ? "" : selectedAddress?.postcode || "",
        country: tabs === "0" ? "" : selectedAddress?.country || "",
        latitude: tabs === "0" ? "" : Number(selectedAddress?.latitude) || "",
        longitude: tabs === "0" ? "" : Number(selectedAddress?.longitude) || "",
        note: selectedAddress?.note || "",
        provinceId: tabs === "0" ? "" : selectedAddress?.provinceId || "",
        cityId: tabs === "0" ? "" : selectedAddress?.cityId || "",
        districtId: tabs === "0" ? "" : selectedAddress?.districtId || "",
        subdistrictId: tabs === "0" ? "" : selectedAddress?.subdistrictId || "",
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
        address: tabs === "0" ? "" : selectedAddress?.address || "",
        postcode: tabs === "0" ? "" : selectedAddress?.postcode || "",
        country: tabs === "0" ? "" : selectedAddress?.country || "",
        latitude: tabs === "0" ? null : Number(selectedAddress?.latitude) || "",
        longitude:
          tabs === "0" ? null : Number(selectedAddress?.longitude) || "",
        note: selectedAddress?.note || "",
        provinceId: tabs === "0" ? "" : selectedAddress?.provinceId || "",
        cityId: tabs === "0" ? "" : selectedAddress?.cityId || "",
        districtId: tabs === "0" ? "" : selectedAddress?.districtId || "",
        subdistrictId: tabs === "0" ? "" : selectedAddress?.subdistrictId || ""
      },
      voucherCode: isVoucherNull
        ? ""
        : selectedAddress
        ? Object.values(selectedAddress)?.filter(item => item === "")?.length <=
          11
          ? usedVoucher
          : ""
        : "",
      customerNote: selectedAddress?.note
    };

    await calculateOrder(body)
      .then(res => {
        localStorage.setItem(
          "isNeedCompleteAddress",
          res.data.data.isNeedCompleteAddress
        );
        // if (
        //   res?.data?.data?.availableShippings?.length < 1 &&
        //   res?.data?.data?.isShippingRequired === true &&
        //   res?.data?.data?.isNeedCompleteAddress === false
        // ) {
        //   setShippingNull(true);
        // }

        if (
          !res?.data?.data?.availableShippings?.find(
            item => item.name === "Pickup"
          ) &&
          res?.data?.data?.isShippingRequired === true
        ) {
          setHiddenTab(true);
          setTab(1);
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
          setTab(0);
          setHiddenTab(true);
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

        if (res?.data?.data?.availablePayments?.length === 1) {
          setSelectedPayment(res?.data?.data?.availablePayments[0]);
          localStorage.setItem(
            "selectedPayment",
            JSON.stringify(res?.data?.data?.availablePayments[0])
          );
        }

        if (
          loopShipping(res?.data?.data?.availableShippings)?.filter(
            ship => ship.name !== "Pickup"
          )?.length === 1 &&
          tabs === "1"
        ) {
          setSelectedShipping(
            loopShipping(res?.data?.data?.availableShippings)[0]
          );
          // localStorage.setItem()
        }
        setIsLoading(false);
        setIsAlert(false);
        setCalculateResponse(res?.data?.data);

        if (res?.data?.data?.vouchers.length > 0) {
          setVoucherSuccess(true);
        }

        localStorage.removeItem("isUsed");
        setFirstLoad(false);
      })
      .catch(error => {
        setFirstLoad(false);
        setIsLoading(false);
        localStorage.removeItem("isUsed");

        if (
          error?.response?.data?.meta?.errorCode === "VOUCHER_INVALID_ERROR"
        ) {
          setVoucherError(error?.response?.data?.meta?.errorCode);
          setUsedVoucher("");
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode === "VOUCHER_EXPIRED_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          localStorage.removeItem("myVoucher");
          setVoucherError(error?.response?.data?.meta?.errorCode);
          setUsedVoucher("");
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_USAGE_LIMIT_REACHED_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          localStorage.removeItem("myVoucher");
          setVoucherError(error?.response?.data?.meta?.errorCode);
          setUsedVoucher("");
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_MIN_SPEND_LIMIT_NOT_MET_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          localStorage.removeItem("myVoucher");
          setUniqueError(
            error?.response?.data?.meta?.fields.voucher.minimumAmount
          );
          setVoucherError(error?.response?.data?.meta?.errorCode);
          setErrorMessage(error?.response?.data?.meta?.message);
          setUsedVoucher("");
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_MAX_SPEND_LIMIT_MET_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          localStorage.removeItem("myVoucher");
          setUniqueError(
            error?.response?.data?.meta?.fields.voucher.maximumAmount
          );
          setVoucherError(error?.response?.data?.meta?.errorCode);
          setErrorMessage(error?.response?.data?.meta?.message);
          setUsedVoucher("");
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_RESTRICTED_EMAIL_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          localStorage.removeItem("myVoucher");
          setVoucherError(error?.response?.data?.meta?.errorCode);
          setUsedVoucher("");
          return;
        }
        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_APPLIED_INDIVIDUAL_USE_ONLY_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          localStorage.removeItem("myVoucher");
          setVoucherError(error?.response?.data?.meta?.errorCode);
          setUsedVoucher("");
          return;
        }
        if (
          error?.response?.data?.meta?.errorCode ===
          "VOUCHER_NOT_APPLICABLE_ERROR"
        ) {
          localStorage.removeItem("usedVoucher");
          localStorage.removeItem("myVoucher");
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
          setVoucherError(error?.response?.data?.meta?.errorCode);
          setUsedVoucher("");
          return;
        }

        if (error?.response?.data?.meta?.statusCode === 409) {
          setFirstLoad(true);
          setUsedVoucher("");
          localStorage.removeItem("usedVoucher");
          setVoucherError(true);
          localStorage.removeItem("myVoucher");
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode === "LOCATION_IS_CLOSED_ERROR"
        ) {
          setIsClose(true);
          setError(error?.response?.data?.meta?.errorCode);
          localStorage.setItem("isLocationClose", "true");
          return;
        }
        if (
          error?.response?.data?.meta?.errorCode ===
          "LOCATION_IS_CLOSED_HOUR_ERROR"
        ) {
          setIsCloseHour(true);
          setError(error?.response?.data?.meta?.errorCode);
          localStorage.setItem("isLocationCloseHour", "true");
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode ===
          "LOCATION_IS_CLOSED_HOUR_ERROR"
        ) {
          setIsCloseHour(true);
          setError(error?.response?.data?.meta?.errorCode);
          localStorage.setItem("isLocationCloseHour", "true");
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode === "INSUFFICIENT_STOCK_ERROR"
        ) {
          setError("INSUFFICIENT_STOCK_ERROR");
          setErrorMessage(error?.response?.data?.meta?.message);
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode ===
          "INSUFFICIENT_ADDON_STOCK_ERROR"
        ) {
          setError("INSUFFICIENT_ADDON_STOCK_ERROR");
          setErrorMessage(error?.response?.data?.meta?.message);
          return;
        }

        if (error?.response?.data?.meta?.errorCode === "ADDON_REQUIRED_ERROR") {
          setError("ADDON_REQUIRED_ERROR");
          setErrorMessage(error?.response?.data?.meta?.message);
          return;
        }

        if (
          error?.response?.data?.meta?.errorCode ===
          "DESTINATION_OUT_OF_RANGE_ERROR"
        ) {
          setIsOutOfRange(true);
          setErrorMessage(error?.response?.data?.meta?.message);
          setIsAlert(true);
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
          setSelectedPayment(null);
          setSelectedShipping(null);
          setIsOutOfRange(true);
          setIsAlert(true);
          setErrorMessage(error?.response?.data?.meta?.message);
          return;
        }

        if (
          error?.response?.data?.meta?.message ===
          "There's no active shipping channel yet!"
        ) {
          localStorage.removeItem("selectedShipping");
          localStorage.removeItem("selectedPayment");
          setSelectedPayment(null);
          setSelectedShipping(null);
          setIsNullShippingChannel(true);
          return;
        }

        if (error?.response?.data?.meta?.statusCode === 500) {
          setInternalServer(true);
          setErrorMessage(error?.response?.data?.meta?.message);
          localStorage.removeItem("selectedShipping");
          localStorage.removeItem("selectedPayment");
          setSelectedPayment(null);
          setSelectedShipping(null);
          return;
        }

        setSelectedPayment(null);
        setSelectedShipping(null);
        setUsedVoucher("");
        console.log(error);
        setDialogError(true);
        setErrorMessage(error?.response?.data?.meta?.message);
        localStorage.removeItem("selectedShipping");
        localStorage.removeItem("selectedPayment");
        localStorage.removeItem("usedVoucher");
      });
  };

  const initializeApp = async () => {
    try {
      const voucherCode = localStorage.getItem("myVoucher");
      if (voucherCode) {
        setUsedVoucher(voucherCode);
        localStorage.setItem("usedVoucher", voucherCode);
      } else {
        const savedVoucher = localStorage.getItem("usedVoucher") || "";
        setUsedVoucher(savedVoucher);
      }
      // setSelectedAddress(null);
      // setCalculateResponse(null);
      urlParams.set("tabs", tabs);
      history.replace(`${history.location.pathname}?${urlParams.toString()}`);

      if (tabs === "1") {
        setTab(1);
        const listAddress = user ? await getUserAddrres() : { data: [] };
        setAddresses(listAddress?.data || []);

        if (address) {
          setSelectedAddress(address);
        } else {
          if (user) {
            if (listAddress?.data?.length > 0) {
              const defaultAddress = listAddress.data[0];
              localStorage.setItem(
                "selectedAddress",
                JSON.stringify(defaultAddress)
              );
              const selectedlocal = JSON.parse(
                localStorage.getItem("selectedAddress")
              );
              const validSelectedAddress = listAddress.data.find(
                item => item.id === selectedlocal?.id
              );
              setSelectedAddress(
                validSelectedAddress || defaultAddress || null
              );
            }

            if (listAddress?.data?.length < 1) {
              setSelectedAddress({
                name: "",
                email: "",
                phone: "",
                note: "",
                address: "",
                city: "",
                cityId: "",
                latitude: "",
                longitude: "",
                postcode: "",
                province: "",
                provinceId: ""
              });
            }
          } else {
            setSelectedAddress({
              name: "",
              email: "",
              phone: "",
              note: "",
              address: "",
              city: "",
              cityId: "",
              latitude: "",
              longitude: "",
              postcode: "",
              province: "",
              provinceId: ""
            });
          }
        }

        if (shipping) {
          setSelectedShipping(shipping);
        } else {
          setSelectedShipping(null);
        }
      } else {
        setTab(0);
        localStorage.removeItem("selectedShipping");
        setSelectedAddress({
          name: savedData?.name || "",
          email: savedData?.email || user?.email || "",
          phone: savedData?.phone || "",
          note: savedData?.note || "",
          address: "",
          city: "",
          cityId: "",
          latitude: "",
          longitude: "",
          postcode: "",
          province: "",
          provinceId: ""
        });
      }

      if (payment) {
        setSelectedPayment(payment);
      } else {
        setSelectedPayment(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRecalculate(true);
    }
  };

  useEffect(() => {
    setRecalculate(false);
    initializeApp();
    tenantDetail();

    const isLocationClose = localStorage.getItem("isLocationClose");
    const isLocationCloseHour = localStorage.getItem("isLocationCloseHour");
    localStorage.removeItem("temporaryData");

    if (isLocationClose === "true") {
      setIsClose(true);
      return;
    }

    if (isLocationCloseHour === "true") {
      setIsCloseHour(true);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  useEffect(() => {
    if (selectedAddress && recalculate) {
      handleCalculateOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(selectedShipping),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(selectedAddress),
    recalculate
  ]);

  useEffect(() => {
    if (cart.length < 1 && !isLoadingCreateOrder) {
      props.history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length, props.history]);

  const resetPayment = () => {
    if (
      calculateResponse?.availablePayments?.findIndex(
        item => item?.id === payment?.id
      ) === -1
    ) {
      localStorage.removeItem("selectedPayment");
      setSelectedPayment(null);
      return;
    }
  };

  useEffect(() => {
    if (calculateResponse?.availablePayments?.length > 0) {
      resetPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(calculateResponse?.availablePayments)]);

  useEffect(() => {
    localStorage.removeItem("emptyAddress");
  }, []);

  const notAvailableShipping = () => {
    if (
      tabs === "1" &&
      loopShipping(calculateResponse?.availableShippings)?.length === 0 &&
      selectedAddress !== null
    ) {
      setIsNullShippingChannel(true);
    }
  };

  const handleEx = () => {
    setExpanded(!expanded);
  };

  const handleCloseShipmentMethod = () => {
    setOpenShipmentMethod(false);
    window.document.body.style.overflow = "auto";
  };

  const handleCloseShippingMethod = () => {
    setOpenPaymentMethod(false);
    window.document.body.style.overflow = "auto";
  };

  const validateEmail = email => {
    const filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return filter.test(String(email).toLowerCase());
  };

  const handleChange = e => {
    if (e.target.name === "email") {
      if (validateEmail(e.target.value)) {
        setIsValidEmail(false);
      } else {
        setIsValidEmail(true);
      }
    }
    setSelectedAddress({ ...selectedAddress, [e.target.name]: e.target.value });
    localStorage.setItem(
      "savedData",
      JSON.stringify({ ...selectedAddress, [e.target.name]: e.target.value })
    );
  };

  const loopShipping = data => {
    let result = [];

    if (data?.length > 0) {
      data
        .filter(shipping => shipping.name !== "Pickup")
        .map(item =>
          item?.services?.map(data => {
            return result.push({
              id: item.id,
              name: item.name,
              cost: data.cost,
              estimatedTimeMinimum: data.estimatedTime.minimum,
              estimatedTimeMaximum: data.estimatedTime.maximum,
              code: data.code,
              gateway: item.gateway,
              serviceName: data.name,
              label: item.label
            });
          })
        );
    }

    return result;
  };

  const orderNow = async () => {
    if (isAlert) {
      setIsOutOfRange(true);
    }

    if (
      selectedAddress?.name === "" ||
      selectedAddress?.email === "" ||
      selectedAddress?.phone === "" ||
      isValidEmail
    ) {
      setIsError(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }

    if (!selectedAddress) {
      setIsError(true);
      setErrorValidation("payment");
      let elmt = document.getElementById("alamat");
      elmt.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });

      return;
    }

    if (calculateResponse?.isShippingRequired === true) {
      if (!selectedShipping) {
        setIsError(true);
        let elmt = document.getElementById("shipping");
        elmt.scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
        return;
      }
    }

    if (!selectedPayment) {
      setIsError(true);
      let elmnt = document.getElementById("payment");
      elmnt.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });

      return;
    }

    await setIsLoadingCreateOrder(true);
    const order = {
      items:
        cart.map(item => {
          return {
            productId: item.id,
            quantity: item.total,
            note: item.note || "",
            addons:
              item.addons.length === 0
                ? []
                : item.selectedAddon.length > 0
                ? item.selectedAddon.map(option => {
                    return {
                      id: option.addonId,
                      quantity: item.total,
                      optionId: option.id
                    };
                  })
                : []
          };
        }) || [],
      contact: {
        phone: validPhone || "",
        email: selectedAddress?.email || address?.email || ""
      },
      shipping: {
        name: selectedAddress?.name || address?.name || "",
        phone: validPhone || "",
        email: selectedAddress?.email || address?.email || "",
        address:
          tabs === "0"
            ? ""
            : selectedAddress?.address || address?.address || "",
        postcode:
          tabs === "0"
            ? ""
            : selectedAddress?.postcode || address?.postcode || "",
        country:
          tabs === "0"
            ? ""
            : selectedAddress?.country || address?.country || "",
        latitude:
          tabs === "0"
            ? ""
            : selectedAddress?.latitude || Number(address?.latitude) || "",
        longitude:
          tabs === "0"
            ? ""
            : selectedAddress?.longitude || Number(address?.longitude) || "",
        note: selectedAddress?.note || address?.note || "",
        provinceId:
          tabs === "0"
            ? ""
            : selectedAddress?.provinceId || address?.provinceId || "",
        cityId:
          tabs === "0" ? "" : selectedAddress?.cityId || address?.cityId || "",
        districtId:
          tabs === "0"
            ? ""
            : selectedAddress?.districtId || address?.districtId || "",
        subdistrictId:
          tabs === "0"
            ? ""
            : selectedAddress?.subdistrictId || address?.subdistrictId || "",
        shippingChannel: selectedShipping
          ? {
              id: selectedShipping?.id || shipping.id,
              service: selectedShipping.code || shipping.code
            }
          : null
      },
      billing: {
        name: selectedAddress?.name || address?.name || "",
        phone: validPhone || "",
        email: selectedAddress?.email || address?.email || "",
        address:
          tabs === "0"
            ? ""
            : selectedAddress?.address || address?.address || "",
        postcode:
          tabs === "0"
            ? ""
            : selectedAddress?.postcode || address?.postcode || "",
        country:
          tabs === "0"
            ? ""
            : selectedAddress?.country || address?.country || "",
        latitude:
          tabs === "0"
            ? ""
            : selectedAddress?.latitude || Number(address?.latitude) || "",
        longitude:
          tabs === "0"
            ? ""
            : selectedAddress?.longitude || Number(address?.longitude) || "",
        note: selectedAddress?.note || address?.note || "",
        provinceId:
          tabs === "0"
            ? ""
            : selectedAddress?.provinceId || address?.provinceId || "",
        cityId:
          tabs === "0" ? "" : selectedAddress?.cityId || address?.cityId || "",
        districtId:
          tabs === "0"
            ? ""
            : selectedAddress?.districtId || address?.districtId || "",
        subdistrictId:
          tabs === "0"
            ? ""
            : selectedAddress?.subdistrictId || address?.subdistrictId || ""
      },
      voucherCode: usedVoucher,
      customerNote: selectedAddress?.note,
      paymentChannelId: selectedPayment.id || payment.id
    };

    try {
      const result = user
        ? await createOrder(order)
        : await createOrderGuest(order);

      if (result.data.data.id) {
        localStorage.setItem("respon", JSON.stringify(result.data.data.id));
        localStorage.removeItem("usedVoucher");
        localStorage.removeItem("selectedShipping");
        localStorage.removeItem("selectedPayment");
        localStorage.removeItem("myVoucher");
        window.location.replace(result.data.data.payments[0].url);
        restoreDefault();
      } else {
        setIsLoadingCreateOrder(false);
        setError("INTERNAL_SERVER_ERROR");
      }
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line
      const tes = alert("Gagal create order");
      window.location.reload();
    }
  };

  const handleChangeAddress = () => {
    const address = JSON.parse(localStorage.getItem("selectedAddress"));

    if (user) {
      if (addresses?.length < 1) {
        localStorage.setItem("emptyAddress", "true");
        props.history.push("/new-address");
      } else {
        props.history.push("/cart-shipment/address");
      }
    } else {
      if (address) {
        props.history.push("/cart-shipment/update-address");
      } else {
        props.history.push("/new-address");
      }
    }
  };

  const handleButtonPaymentMethod = () => {
    if (selectedAddress && selectedShipping) {
      setOpenPaymentMethod(true);
      return;
    }

    if (calculateResponse?.isShippingRequired === false) {
      setOpenPaymentMethod(true);
      return;
    }

    if (selectedAddress && !selectedShipping) {
      setAlertPayment(true);
      window.scrollTo({
        top: 40,
        behavior: "smooth"
      });
      return false;
    }

    setAlertPayment(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    return false;
  };

  const distanceLabel = data => {
    if (
      calculateResponse &&
      data?.shippings[0]?.shippingChannel?.code === "delivery"
    ) {
      return (
        <div>
          {label}{" "}
          <span style={{ textTransform: "uppercase" }}>
            ({data.distance.value} {data.distance.unit})
          </span>
        </div>
      );
    }
    return label;
  };

  return (
    <>
      <Container className={classes.container} component="main" maxWidth="xs">
        {isLoadingCreateOrder && <LoadingOrder />}
        <AppBar
          title={`${intl.formatMessage({
            id: "cartShipment.requirements.1.0"
          })}`}
          goBack={true}
        />
        {calculateResponse?.isShippingRequired && (
          <Tabs
            value={tab}
            onChange={(event, newValue) => {
              setTab(newValue);
              setFirstLoad(true);
              localStorage.removeItem("selectedPayment");
              localStorage.removeItem("usedVoucher");
              setUsedVoucher("");
              setSelectedPayment(null);
              setSelectedShipping(null);
              setSelectedAddress(null);
              urlParams.set("tabs", newValue.toString());
              history.replace(
                `${history.location.pathname}?${urlParams.toString()}`
              );
            }}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{ display: hiddenTab ? "none" : "" }}
          >
            <Tab
              label={
                <b>
                  {""}
                  {intl.formatMessage({
                    id: "cartShipment.requirements.2.0"
                  })}
                </b>
              }
            />
            <Tab
              label={
                <b>
                  {""}
                  {intl.formatMessage({
                    id: "cartShipment.requirements.3.0"
                  })}
                </b>
              }
            />
          </Tabs>
        )}

        <Paper elevation={0} className={classes.body}>
          <List className={classes.root} disablePadding>
            {tab === 1 ? (
              <>
                <Typography style={{ fontSize: 16 }}>
                  <b>
                    {""}
                    {intl.formatMessage({
                      id: "cartShipment.requirements.4.0"
                    })}
                  </b>
                </Typography>
                {address ? (
                  <div
                    onClick={handleChangeAddress}
                    style={{
                      border: "1px solid #F5F5F5",
                      borderRadius: 8,
                      marginTop: 10,
                      padding: 10,
                      cursor: "pointer"
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid
                        style={{ alignSelf: "center", justifySelf: "center" }}
                        item
                        xs={2}
                      >
                        <Address />
                      </Grid>
                      <Grid style={{ alignSelf: "center" }} item xs={7}>
                        <Typography
                          variant="caption"
                          style={{
                            fontWeight: 500
                          }}
                          display="block"
                        >
                          {""}
                          {intl.formatMessage({
                            id: "cartShipment.requirements.5.0"
                          })}
                        </Typography>

                        <Typography
                          style={{
                            marginTop: 5,
                            fontWeight: 600
                          }}
                          variant="subtitle2"
                          display="block"
                          noWrap={true}
                        >
                          {Capitalize(selectedAddress?.address)}
                        </Typography>

                        <Typography
                          style={{
                            marginTop: 5,
                            fontWeight: 300
                          }}
                          variant="caption"
                          display="block"
                        >
                          {selectedAddress?.note}
                        </Typography>
                      </Grid>
                      <Grid
                        style={{
                          alignSelf: "center",
                          justifyContent: "flex-end"
                        }}
                        item
                        xs={3}
                      >
                        <Typography
                          style={{
                            color:
                              process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                            marginTop: 5,
                            fontWeight: 600,
                            marginRight: 8,
                            textAlign: "end"
                          }}
                          variant="caption"
                          display="block"
                        >
                          {""}
                          {intl.formatMessage({
                            id: "cartShipment.requirements.6.0"
                          })}
                        </Typography>
                      </Grid>
                    </Grid>
                    {isAlert && (
                      <>
                        <div
                          style={{
                            borderBottom: "1px solid red",
                            margin: "5px 0px"
                          }}
                        ></div>
                        <Typography style={{ color: "red", fontSize: 12 }}>
                          {errorMessage}
                        </Typography>
                      </>
                    )}
                  </div>
                ) : (
                  <div
                    id="alamat"
                    onClick={handleChangeAddress}
                    style={{
                      border: "1px solid #F5F5F5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 8,
                      marginTop: 10,
                      padding: 10,
                      cursor: "pointer"
                    }}
                  >
                    <AddressEmpty />
                    <div style={{ marginLeft: 16 }}>
                      <Typography
                        style={{
                          fontSize: 14,
                          fontWeight: 600
                        }}
                        display="block"
                      >
                        {""}
                        {intl.formatMessage({
                          id: "cartShipment.requirements.7.0"
                        })}
                      </Typography>
                      <Typography
                        style={{
                          color: "#808080",
                          fontSize: 11,
                          marginTop: 5
                        }}
                        variant="caption"
                        display="block"
                      >
                        {""}
                        {intl.formatMessage({
                          id: "cartShipment.requirements.8.0"
                        })}
                      </Typography>
                    </div>
                    <ChevronRight
                      style={{
                        color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                      }}
                    />
                  </div>
                )}
                {isError && !selectedAddress && (
                  <p style={{ color: "red", marginLeft: 16 }}>
                    {""}
                    {intl.formatMessage({
                      id: "cartShipment.requirements.9.0"
                    })}
                  </p>
                )}
              </>
            ) : (
              <>
                <TextField
                  error={isError && selectedAddress?.name === ""}
                  id="standard-full-width"
                  label={`${intl.formatMessage({
                    id: "takeByYourSelf.requirements.1.0"
                  })}`}
                  fullWidth
                  name="name"
                  value={selectedAddress?.name}
                  onChange={handleChange}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  error={
                    (isError && selectedAddress?.email === "") || isValidEmail
                  }
                  id="standard-full-width"
                  label={`${intl.formatMessage({
                    id: "takeByYourSelf.requirements.2.0"
                  })}`}
                  fullWidth
                  name="email"
                  value={selectedAddress?.email}
                  onChange={e => handleChange(e)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />

                {isValidEmail && (
                  <p style={{ margin: 0, color: "red", fontSize: 10 }}>
                    {""}
                    {intl.formatMessage({
                      id: "cartShipment.requirements.10.0"
                    })}
                  </p>
                )}

                <TextField
                  error={isError && selectedAddress?.phone === ""}
                  id="standard-full-width"
                  label={`${intl.formatMessage({
                    id: "takeByYourSelf.requirements.3.0"
                  })}`}
                  fullWidth
                  name="phone"
                  value={selectedAddress?.phone}
                  onChange={handleChange}
                  type="number"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ReactFlagsSelect
                          selected={selectedCountryCode}
                          showSelectedLabel={false}
                          fullWidth={false}
                          selectButtonClassName={classes.flagButton}
                          customLabels={CountryData}
                          onSelect={code => setSelectedCountryCode(code)}
                        />
                      </InputAdornment>
                    )
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  id="standard-multiline-static"
                  label={`${intl.formatMessage({
                    id: "takeByYourSelf.requirements.4.0"
                  })}`}
                  fullWidth
                  multiline
                  rows="3"
                  name="note"
                  value={selectedAddress?.note}
                  onChange={handleChange}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </>
            )}
          </List>
        </Paper>

        {tab === 1 && (
          <div id="buttonShipping">
            <Paper elevation={0} className={classes.body}>
              <ButtonShippingMethod
                selectedShipping={selectedShipping || shipping}
                openShipmentMethod={() => {
                  if (address) {
                    if (
                      loopShipping(calculateResponse?.availableShippings)
                        .length === 0
                    ) {
                      notAvailableShipping();
                    } else {
                      setOpenShipmentMethod(true);
                    }
                  } else {
                    setAlertShipping(true);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    });
                    return false;
                  }
                }}
              />

              {isError && !selectedShipping && errorValidation === "shipping" && (
                <p style={{ color: "red", fontSize: 12 }}>
                  {""}
                  {intl.formatMessage({
                    id: "cartShipment.requirements.11.0"
                  })}
                </p>
              )}
            </Paper>
          </div>
        )}

        <Paper elevation={0} className={classes.body}>
          <ButtonPaymentMethod
            selectedPayment={selectedPayment || payment}
            onClick={() => {
              handleButtonPaymentMethod();
            }}
          />
          {isError && !selectedPayment && errorValidation === "payment" && (
            <p style={{ color: "red", fontSize: 12 }}>
              {""}
              {intl.formatMessage({
                id: "cartShipment.requirements.12.0"
              })}
            </p>
          )}
        </Paper>

        {selectedShipping?.code !== "pickup" && (
          <div id="shipping">
            <DialogShipmentMethod
              open={openShipmentMethod}
              onClose={() => handleCloseShipmentMethod()}
              onSelect={ship => {
                setSelectedShipping(ship);
                handleCloseShipmentMethod();
              }}
              selectedShipping={selectedShipping || shipping}
              data={loopShipping(calculateResponse?.availableShippings)}
            />
          </div>
        )}
        <div id="payment">
          <DialogPaymentMethod
            open={openPaymentMethod}
            onClose={() => handleCloseShippingMethod()}
            onSelect={pay => {
              setSelectedPayment(pay);
              handleCloseShippingMethod();
            }}
            selectedPayment={selectedPayment || payment}
            data={calculateResponse?.availablePayments}
          />
        </div>
        <DialogErrorField
          open={dialogErrorField}
          onClose={() => setDialogErrorField(false)}
        />

        <Paper
          elevation={0}
          className={classes.body}
          style={cart.length >= 3 ? { paddingBottom: 0 } : {}}
        >
          <List className={classes.grid}>
            <ListItem style={{ padding: 0 }}>
              <Typography style={{ fontSize: 16 }}>
                <b>
                  {""}
                  {intl.formatMessage({
                    id: "cartShipment.requirements.13.0"
                  })}
                </b>
              </Typography>
            </ListItem>
          </List>

          <List className={classes.grid}>
            {cart.length >= 1 && (
              <div>
                {cart.slice(0, 2)?.map(item => {
                  const unitOfMeansure =
                    item.meta_data &&
                    item.meta_data.filter(
                      meta_data => meta_data.key === "_woo_uom_input"
                    );

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
                  return (
                    <div>
                      <Grid style={{ marginTop: 16 }} container spacing={0}>
                        <Grid
                          item
                          xs={2}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Typography variant="caption" display="block">
                            <b>{item.total + "x"}</b>
                          </Typography>
                        </Grid>
                        <Grid align="left" item xs={7}>
                          <Typography
                            style={{
                              color: "#4E5356",
                              fontSize: 12,
                              fontWeight: "bold"
                            }}
                          >
                            {item.name}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              margin: "5px 0px"
                            }}
                          >
                            {newData?.map(option => {
                              return (
                                <div style={{ fontSize: 10 }}>
                                  {option.addonName} :{" "}
                                  <b>
                                    {typeof option.name === "string" ? (
                                      <>{option.name}</>
                                    ) : (
                                      <>
                                        {option?.name?.map((name, index) => (
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
                          <Typography
                            style={{ color: "#4E5356" }}
                            variant="caption"
                            display="block"
                          >
                            {item?.addons?.length === 0
                              ? currencyFormatter.format(item.price)
                              : item.selectedAddon.length > 0
                              ? currencyFormatter.format(
                                  item.price +
                                    item.selectedAddon
                                      ?.map(total => total.price)
                                      ?.reduce((x, y) => x + y)
                                )
                              : currencyFormatter.format(item.price)}
                          </Typography>
                          {item.on_sale && (
                            <Typography variant="caption" display="block">
                              <b
                                style={{
                                  textDecoration: "line-through",
                                  color: "grey"
                                }}
                              >
                                {currencyFormatter.format(item.price)}
                              </b>
                              {currencyFormatter.format(item.sale_price)}/{" "}
                              {unitOfMeansure
                                ? unitOfMeansure[0].value
                                : item.unit_of_measure
                                ? item.unit_of_measure
                                : "-"}
                            </Typography>
                          )}
                          {item.on_sale === "undefined" && (
                            <Typography variant="caption" display="block">
                              {currencyFormatter.format(item.price)}/{" "}
                              {unitOfMeansure
                                ? unitOfMeansure[0].value
                                : item.unit_of_measure
                                ? item.unit_of_measure
                                : "-"}
                            </Typography>
                          )}
                        </Grid>
                        <Grid align="right" item xs={3}>
                          <Typography variant="caption" display="block">
                            {currencyFormatter.format(item.totalPrice)}
                          </Typography>
                        </Grid>
                      </Grid>
                      {cart.length === 1 ? (
                        <></>
                      ) : (
                        <Divider style={{ marginTop: 16 }} fullWidth />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {cart.length >= 3 && (
              <div>
                <Collapse in={expanded}>
                  {cart.slice(2, cart.length).map(item => {
                    const unitOfMeansure =
                      item.meta_data &&
                      item.meta_data.filter(
                        meta_data => meta_data.key === "_woo_uom_input"
                      );

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
                    return (
                      <div>
                        <Grid
                          style={{ marginTop: 16, marginBottom: 16 }}
                          container
                          spacing={0}
                        >
                          <Grid
                            item
                            xs={2}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Typography variant="caption" display="block">
                              <b>{item.total + "x"}</b>
                            </Typography>
                          </Grid>
                          <Grid align="left" item xs={7}>
                            <Typography
                              style={{
                                color: "#4E5356",
                                fontSize: 12,
                                fontWeight: "bold"
                              }}
                            >
                              {item.name}
                            </Typography>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                margin: "5px 0px"
                              }}
                            >
                              {newData?.map(option => {
                                return (
                                  <div style={{ fontSize: 10 }}>
                                    {option.addonName} :{" "}
                                    <b>
                                      {typeof option.name === "string" ? (
                                        <>{option.name}</>
                                      ) : (
                                        <>
                                          {option?.name?.map((name, index) => (
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
                            <Typography
                              style={{ color: "#4E5356" }}
                              variant="caption"
                              display="block"
                            >
                              {item?.addons?.length === 0
                                ? currencyFormatter.format(item.price)
                                : currencyFormatter.format(
                                    item.price +
                                      item.selectedAddon
                                        ?.map(total => total.price)
                                        ?.reduce((x, y) => x + y)
                                  )}
                            </Typography>
                            {item.on_sale && (
                              <Typography variant="caption" display="block">
                                <b
                                  style={{
                                    textDecoration: "line-through",
                                    color: "grey"
                                  }}
                                >
                                  {currencyFormatter.format(item.price)}
                                </b>
                                {currencyFormatter.format(item.sale_price)}/{" "}
                                {unitOfMeansure
                                  ? unitOfMeansure[0].value
                                  : item.unit_of_measure
                                  ? item.unit_of_measure
                                  : "-"}
                              </Typography>
                            )}
                            {item.on_sale === "undefined" && (
                              <Typography variant="caption" display="block">
                                {currencyFormatter.format(item.price)}/{" "}
                                {unitOfMeansure
                                  ? unitOfMeansure[0].value
                                  : item.unit_of_measure
                                  ? item.unit_of_measure
                                  : "-"}
                              </Typography>
                            )}
                          </Grid>
                          <Grid align="right" item xs={3}>
                            <Typography variant="caption" display="block">
                              {currencyFormatter.format(item.totalPrice)}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider style={{ marginTop: 16 }} fullWidth />
                      </div>
                    );
                  })}
                </Collapse>
                <ExpansionPanel
                  style={{
                    backgroundColor: "white",
                    background: "white",
                    border: 0,
                    marginTop: 0
                  }}
                  elevation={0}
                  onClick={handleEx}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={handleEx}
                    classes={{ expanded: "classes.expandRoot" }}
                    style={{ padding: 0 }}
                  >
                    {expanded === false ? (
                      <Typography
                        style={{
                          width: "100%",
                          color: process.env.REACT_APP_COLOR_FONT || "#000000",
                          fontSize: 12,
                          margin: "8px 0"
                        }}
                        align="right"
                      >
                        {""}
                        {intl.formatMessage({
                          id: "cartShipment.requirements.14.0"
                        })}
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          width: "100%",
                          color: process.env.REACT_APP_COLOR_FONT || "#000000",
                          fontSize: 12
                        }}
                        align="right"
                      >
                        {""}
                        {intl.formatMessage({
                          id: "cartShipment.requirements.15.0"
                        })}
                      </Typography>
                    )}
                  </ExpansionPanelSummary>
                </ExpansionPanel>
              </div>
            )}
          </List>
        </Paper>

        <Paper elevation={0} className={classes.voucher}>
          <>
            {usedVoucher !== "" ? (
              <Voucher
                remove={() => {
                  setUsedVoucher("");
                  localStorage.removeItem("myVoucher");
                  setSelectedPayment(null);
                  handleCalculateOrder(false, true);
                }}
                click={event => {
                  if (isAlert) {
                    setIsError(true);
                    setDialogErrorField(true);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    });
                    return false;
                  }
                  if (
                    calculateResponse?.billing?.name !== "" ||
                    (calculateResponse?.billing?.email !== "" &&
                      voucherCode !== null)
                  ) {
                    return true;
                  }
                  if (
                    tab === 0
                      ? selectedAddress?.name === "" ||
                        selectedAddress?.email === "" ||
                        selectedAddress?.phone === ""
                      : address === null
                  ) {
                    setIsError(true);
                    setDialogErrorField(true);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    });
                    return false;
                  } else {
                    return true;
                  }

                  // setDisplayVoucher(true);
                }}
                cardColor={`linear-gradient(to right, ${process.env
                  .REACT_APP_COLOR_PRIMARY || "#FFD101"}, #ffe675)`}
                buttonColor={process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"}
                content="Voucher Terpasang"
                buttonContent="Ubah"
              />
            ) : (
              <Voucher
                click={() => {
                  if (isAlert) {
                    setIsError(true);
                    setDialogErrorField(true);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    });
                    return false;
                  }
                  if (
                    tab === 0
                      ? selectedAddress?.name === "" ||
                        selectedAddress?.email === "" ||
                        selectedAddress?.phone === ""
                      : address === null
                  ) {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    });
                    setIsError(true);
                    setDialogErrorField(true);
                    return false;
                  }

                  if (calculateResponse?.isShippingRequired === true) {
                    if (!selectedShipping && tabs === "1") {
                      setIsError(true);
                      setErrorValidation("shipping");
                      let elmt = document.getElementById("shipping");
                      elmt.scrollIntoView({
                        block: "center",
                        behavior: "smooth"
                      });
                      return false;
                    }
                  }

                  return true;
                }}
                buttonColor={process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"}
                content={`${intl.formatMessage({
                  id: "cartShipment.requirements.53.0"
                })}`}
                buttonContent={`${intl.formatMessage({
                  id: "cartShipment.requirements.54.0"
                })}`}
              />
            )}
          </>
        </Paper>

        <Paper elevation={0} className={classes.body}>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                {""}
                {intl.formatMessage({
                  id: "cartShipment.requirements.50.0"
                })}
              </Typography>
            </Grid>
            <Grid align="right" item xs={6}>
              <Typography variant="caption" display="block">
                {currencyFormatter.format(
                  calculateResponse ? calculateResponse.subTotalPrice : price
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 10 }}>
              <Grid item xs={12} align="center" style={{ display: "flex" }}>
                <img src={vectorInfo} alt="Info versi" />
                <Typography
                  style={{ color: "grey", marginLeft: 8 }}
                  variant="caption"
                  display="block"
                >
                  {"  "}
                  {intl.formatMessage({
                    id: "cartShipment.requirements.16.0"
                  })}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                {distanceLabel(calculateResponse)}
              </Typography>
            </Grid>
            <Grid align="right" item xs={6}>
              <Typography variant="caption" display="block">
                {currencyFormatter.format(
                  calculateResponse ? calculateResponse.totalShipping : 0
                )}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                {" "}
                {intl.formatMessage({
                  id: "cartShipment.requirements.17.0"
                })}
              </Typography>
            </Grid>
            <Grid align="right" item xs={6}>
              <Typography variant="caption" display="block">
                {currencyFormatter.format(
                  calculateResponse ? calculateResponse.totalDiscount : 0
                )}
              </Typography>
            </Grid>
            {configurePoint && (
              <>
                <Grid item xs={6}>
                  <Typography variant="caption" display="block">
                    {" "}
                    {intl.formatMessage({
                      id: "cartShipment.requirements.18.0"
                    })}
                  </Typography>
                </Grid>
                <Grid align="right" item xs={6}>
                  <Typography variant="caption" display="block">
                    {calculateResponse
                      ? calculateResponse.totalPoints
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      : 0}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
        <div className={classes.stickToBottom}>
          <Divider />
          <Grid
            className={classes.grid}
            container
            item
            xs={12}
            spacing={0}
            style={{ padding: "16px 16px 0px" }}
          >
            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                <b>
                  {" "}
                  {intl.formatMessage({
                    id: "cartShipment.requirements.19.0"
                  })}
                </b>
              </Typography>
            </Grid>
            <Grid align="right" item xs={6}>
              <Typography variant="caption" display="block">
                {currencyFormatter.format(
                  Number(
                    calculateResponse ? calculateResponse.totalPrice : price
                  )
                )}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider
                style={{ marginBottom: 5, marginTop: 5, width: "100%" }}
              />
              <Typography
                variant="caption"
                display="block"
                style={{ padding: "8px 0 0" }}
              >
                {" "}
                {intl.formatMessage({
                  id: "cartShipment.requirements.20.0"
                })}{" "}
                <img src={vectorPasar} alt="Market" />{" "}
                <b>{selectedPasar.name}</b>
              </Typography>
            </Grid>
          </Grid>

          <Paper className={classes.paperbtn}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <div>
                  <Button
                    className={classes.button}
                    style={{
                      backgroundColor:
                        process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                      color: process.env.REACT_APP_COLOR_FONT || "#000000",
                      height: "100%",
                      fontWeight: 700,
                      fontFamily:
                        process.env.REACT_APP_FONT_URL_BUTTON ||
                        "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
                    }}
                    variant="contained"
                    fullWidth={true}
                    onClick={orderNow}
                  >
                    {" "}
                    {intl.formatMessage({
                      id: "cartShipment.requirements.21.0"
                    })}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>

        <BaseDialog open={isLoading} TransitionComponent={Transition}>
          <div style={{ padding: 10 }}>
            <CircularProgress />
          </div>
        </BaseDialog>
      </Container>

      <Dialog
        button={isClose || isCloseHour ? "Ok" : error ? "Coba Lagi" : "Ok"}
        open={
          isClose ||
          isCloseHour ||
          error ||
          voucherError ||
          isOutOfRange ||
          alertShipping ||
          shippingNull ||
          isNullShippingChannel ||
          dialogError ||
          internalServer
        }
        onClose={() => {
          if (isClose) {
            setIsClose(false);
            history.push("/cart");
          }
          if (isCloseHour || error === "LOCATION_IS_CLOSED_HOUR_ERROR") {
            setIsCloseHour(false);
            history.push("/cart");
          }
          if (isOutOfRange) {
            setIsOutOfRange(false);
          }
          if (error === "INSUFFICIENT_STOCK_ERROR") {
            setError("");
            history.push("/");
          } else {
            setError("");
          }
          if (error === "INSUFFICIENT_ADDON_STOCK_ERROR") {
            setError("");
            history.push("/");
          } else {
            setError("");
          }

          if (error === "ADDON_REQUIRED_ERROR") {
            setError("");
            history.push("/cart");
          } else {
            setError("");
          }

          if (alertShipping) {
            setAlertShipping(false);
          }
          if (alertPayment) {
            setAlertPayment(false);
          }
          if (shippingNull) {
            setShippingNull(false);
            // history.push("/cart");
          }
          if (isNullShippingChannel) {
            setIsNullShippingChannel(false);
            history.push("/cart-shipment?tabs=1");
          }
          if (dialogError || internalServer) {
            setDialogError(false);
            localStorage.removeItem("isUsed");
          }
          if (internalServer) {
            setInternalServer(false);
          }
          if (!voucherError) {
            setVoucherSuccess(false);
            localStorage.removeItem("isUsed");
          } else {
            setVoucherError(false);
            localStorage.removeItem("isUsed");
            handleCalculateOrder();
          }
        }}
        avatar={
          isClose || isCloseHour || error === "LOCATION_IS_CLOSED_HOUR_ERROR"
            ? vectorErrorClose
            : error === "500" && <Server />
        }
        content={
          <>
            <div style={{ marginBottom: 70 }}>
              <div style={{ padding: 16 }}>
                <Typography
                  variant="caption"
                  display="block"
                  style={{ fontSize: 14, fontWeight: 600, textAlign: "center" }}
                >
                  {voucherError === "VOUCHER_INVALID_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.31.0"
                      })}`
                    : voucherError === "VOUCHER_EXPIRED_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.32.0"
                      })}`
                    : voucherError === "VOUCHER_USAGE_LIMIT_REACHED_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.33.0"
                      })}`
                    : voucherError === "VOUCHER_MIN_SPEND_LIMIT_NOT_MET_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.34.0"
                      })}${currencyFormatter.format(uniqueError)}.`
                    : voucherError === "VOUCHER_MAX_SPEND_LIMIT_MET_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.52.0"
                      })}${currencyFormatter.format(uniqueError)}.`
                    : voucherError === "VOUCHER_RESTRICTED_EMAIL_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.35.0"
                      })}`
                    : voucherError ===
                      "VOUCHER_APPLIED_INDIVIDUAL_USE_ONLY_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.36.0"
                      })}`
                    : voucherError === "VOUCHER_NOT_APPLICABLE_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.37.0"
                      })}`
                    : voucherError === "VOUCHER_NOT_ENABLE_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.38.0"
                      })}`
                    : error === "INSUFFICIENT_STOCK_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.39.0"
                      })}`
                    : error === "INSUFFICIENT_ADDON_STOCK_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.51.0"
                      })}`
                    : error === "ADDON_REQUIRED_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.41.0"
                      })}`
                    : isClose
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.42.0"
                      })}`
                    : error === "500"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.43.0"
                      })}`
                    : isOutOfRange
                    ? errorMessage
                    : alertShipping
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.44.0"
                      })}`
                    : alertPayment
                    ? address && !selectedShipping
                      ? `${intl.formatMessage({
                          id: "cartShipment.requirements.45.0"
                        })}`
                      : `${intl.formatMessage({
                          id: "cartShipment.requirements.46.0"
                        })}`
                    : shippingNull
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.47.0"
                      })}`
                    : isNullShippingChannel
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.47.0"
                      })}`
                    : dialogError || internalServer
                    ? errorMessage
                    : error === "LOCATION_IS_CLOSED_HOUR_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.48.0"
                      })}`
                    : `${intl.formatMessage({
                        id: "cartShipment.requirements.49.0"
                      })}`}
                </Typography>
                {voucherError === "VOUCHER_NOT_APPLICABLE_ERROR" && (
                  <div className={classes.voucherInfo}>
                    {uniqueError.length > 0 && (
                      <div style={{ fontSize: 10 }}>
                        {" "}
                        {intl.formatMessage({
                          id: "cartShipment.requirements.22.0"
                        })}
                        <ul style={{ paddingLeft: 25, margin: 0 }}>
                          {uniqueError.map(item => (
                            <li>{item.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {errorMessage.length > 0 && (
                      <div style={{ fontSize: 10 }}>
                        {" "}
                        {intl.formatMessage({
                          id: "cartShipment.requirements.23.0"
                        })}
                        <ul style={{ paddingLeft: 25, margin: 0 }}>
                          {errorMessage.map(item => (
                            <li>{item.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {productCategories.length > 0 && (
                      <div style={{ fontSize: 10 }}>
                        {" "}
                        {intl.formatMessage({
                          id: "cartShipment.requirements.24.0"
                        })}
                        <ul style={{ paddingLeft: 25, margin: 0 }}>
                          {productCategories.map(item => (
                            <li>{item.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {excludedProductCategories.length > 0 && (
                      <div style={{ fontSize: 10 }}>
                        {" "}
                        {intl.formatMessage({
                          id: "cartShipment.requirements.25.0"
                        })}
                        <ul style={{ paddingLeft: 25, margin: 0 }}>
                          {excludedProductCategories.map(item => (
                            <li>{item.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <Typography
                  variant="caption"
                  display="block"
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    textAlign: "center",
                    padding:
                      isCloseHour || error === "LOCATION_IS_CLOSED_HOUR_ERROR"
                        ? "0px"
                        : "10px 15px 30px"
                  }}
                >
                  {error === "INSUFFICIENT_STOCK_ERROR"
                    ? null
                    : isClose ||
                      isCloseHour ||
                      error === "LOCATION_IS_CLOSED_HOUR_ERROR"
                    ? `${intl.formatMessage({
                        id: "cartShipment.requirements.26.0"
                      })}`
                    : error === "500"
                    ? `'${intl.formatMessage({
                        id: "cartShipment.requirements.27.1"
                      })}'
                  ${process.env.REACT_APP_BRAND_NAME ||
                    "Srikopi"} '${intl.formatMessage({
                        id: "cartShipment.requirements.27.2"
                      })}'`
                    : null}
                </Typography>
              </div>
              {(isCloseHour || error === "LOCATION_IS_CLOSED_HOUR_ERROR") && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <WatchIcon />
                  <Typography
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      marginLeft: 5,
                      textAlign: "center"
                    }}
                  >
                    {" "}
                    {intl.formatMessage({
                      id: "cartShipment.requirements.28.0"
                    })}{" "}
                    &#9679;{" "}
                    <span style={{ fontWeight: 400 }}>
                      {selectedPasar?.openHours?.[thisDay]?.hours?.length === 0
                        ? `${intl.formatMessage({
                            id: "cartShipment.requirements.29.0"
                          })}`
                        : `'${intl.formatMessage({
                            id: "cartShipment.requirements.30.0"
                          })}'${
                            selectedPasar?.openHours?.[thisDay]?.hours[0]?.open
                          } - ${
                            selectedPasar?.openHours?.[thisDay]?.hours[0]?.close
                          }`}
                    </span>
                  </Typography>
                </div>
              )}
            </div>
          </>
        }
      />
    </>
  );
}

export default withTransaction("CartShipment", "component")(CartShipment);
