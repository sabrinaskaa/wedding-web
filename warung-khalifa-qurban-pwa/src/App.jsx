/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import "firebase/remote-config";
import "firebase/auth";
import { Switch, withRouter } from "react-router-dom";
import BottomNavigationApp from "./components/bottom-navigation";
import PrivateRoute from "./components/private-route";
import Home from "./containers/home";
import Alamat from "./containers/daftar-alamat";
// import TambahAlamat from "./containers/tambah-alamat";
import AddAddress from "./containers/address-add";
import DetailAddress from "./containers/address-detail";
import UpdateAddress from "./containers/address-update";
import Profile from "./containers/profile";
import TermOfUse from "./containers/term-of-use";
import AboutUs from "./containers/about-us";
import PrivacyPolicy from "./containers/privacy-policy";
import Login from "./containers/login";
import Register from "./containers/register";
import Orders from "./containers/orders";
import Help from "./containers/help";
import Addons from "./containers/addon";
import ProductDetails from "./containers/product-details";
import ArticleDetail from "./containers/article-detail";
import ProductList from "./containers/product-list";
import Cart from "./containers/cart";
import CartReview from "./containers/cart-review";
import CartShipment from "./containers/cart-shipment";
import CartSuccess from "./containers/cart-success";
import ProfileEdit from "./containers/profile-edit";
import OrderHitory from "./containers/order-history";
import OrderDetails from "./containers/order-details";
import NotFound from "./containers/not-found";
import HelpDetails from "./containers/help-details";
import ProductSearch from "./containers/product-search";
import TimeOut from "./containers/time-out";
import Market from "./containers/market";
import TopSeller from "./containers/top-seller-list";
import Voucher from "./containers/voucher";
import { CartContext } from "./context/cart";
import AddressList from "./containers/address-list";
import Maps from "./containers/maps/index";
import BannerDetail from "./containers/banner-detail";
import Loading from "./components/loading";
import { useHistory } from "react-router-dom";
import { getListPasar } from "./services/vendor";
import { tenantInfo } from "./services/vendor";
import { ApmRoute } from "@elastic/apm-rum-react";
import withClearCache from "./clearCache";
import posthog from "posthog-js";
import * as Sentry from "@sentry/react";
import Point from "./containers/point";
import CustomerVoucher from "./containers/customerVoucher";
import CartVoucher from "./containers/cart-voucher";
import ProfileAddress from "./containers/address-profile";
import RedeemCode from "./containers/redeem-code";
import CustomDialog from "./components/dialog";
import OnBoarding from "./components/onboarding";
import { Typography } from "@material-ui/core";
import vectorErrorClose from "./vector/errorClose.svg";
import WatchIcon from "./vector/watchIcon";
import moment from "moment";
import ChangeLanguage from "./containers/change-language";
import AppLocale from "./lang";
import { IntlProvider } from "react-intl";
import { LanguageContext } from "./context/language";

const ClearCacheComponent = withClearCache(MainApp);

function App(props) {
  return <ClearCacheComponent {...props} />;
}

function MainApp(props) {
  const user = JSON.parse(localStorage.getItem("users"));
  const [isLoading, setIsLoading] = useState(true);
  const homeRoute = ["/", "/orders", "/profile", "/help"];
  const { restoreCart, restoreDefault } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  const tes = useContext(LanguageContext);
  const history = useHistory();
  const [isClose, setIsClose] = useState(false);
  const [isCloseHour, setIsCloseHour] = useState(false);
  const selectedPasar = JSON.parse(localStorage.getItem("selectedPasar"));
  const [isShowOnboarding, setIsShowOnboarding] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const urlParams = new URLSearchParams(window.location.search);
  const currentAppLocale = AppLocale[language];
  console.log(tes);

  const authRoute = [
    "/login",
    "/sign-in",
    "/sign-up",
    "/verify-method",
    "/verify-otp"
  ];

  const thisDay = moment(new Date())
    .format("dddd")
    .toLowerCase();

  props.history.listen((location, action) => {
    window.scrollTo(0, 0);
  });

  const setDefaultLocation = res => {
    restoreDefault();
    sessionStorage.clear();
    localStorage.setItem("listLocation", JSON.stringify(res));
    localStorage.setItem("selectedPasar", JSON.stringify(res[0]));
    localStorage.removeItem("cart");
    console.log(res);
    if (res[0].isOpen) {
      localStorage.removeItem("isLocationClose");
    } else {
      localStorage.setItem("isLocationClose", "true");
      setIsClose(true);
    }
    if (res[0].isOpenHour) {
      localStorage.removeItem("isLocationCloseHour");
    } else {
      localStorage.setItem("isLocationCloseHour", "true");
      setIsCloseHour(true);
    }
    setIsLoading(false);

    history.push("/");
  };

  const createDynamicWebmanifest = () => {
    var dynamicManifest = {
      name: process.env.REACT_APP_BRAND_NAME || "Srikopi",
      short_name: process.env.REACT_APP_BRAND_NAME || "Srikopi",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone"
    };
    const stringManifest = JSON.stringify(dynamicManifest);
    const blob = new Blob([stringManifest], { type: "application/json" });
    const manifestURL = URL.createObjectURL(blob);
    document
      .querySelector("#manifest-placeholder")
      .setAttribute("href", manifestURL);
  };

  const setEnvOnIndexHtml = () => {
    document.title = process.env.REACT_APP_BRAND_NAME || "Srikopi";
    const logoElements = document.getElementsByClassName("logo-url");
    for (let logoElement of logoElements) {
      logoElement.href =
        process.env.REACT_APP_LOGO_URL ||
        "https://i.ibb.co/CV4xj5D/srikopi.png";
    }
    document.getElementById("meta-theme-color").content =
      process.env.REACT_APP_COLOR_PRIMARY || "#FFD101";
    document.getElementById("font-url").href =
      process.env.REACT_APP_FONT_URL ||
      "https://fonts.googleapis.com/css2?family=Montserrat&display=swap";
    // document.getElementById("google-map-api").src =
    //   process.env.REACT_APP_FONT_URL ||
    //   `https://maps.googleapis.com/maps/api/js?key=${process.env
    //     .REACT_APP_GOOGLE_MAPS_API || ""}&libraries=places`;
    createDynamicWebmanifest();
  };

  useEffect(() => {
    if (user) {
      Sentry.setUser({ email: user.email });
    }
    setEnvOnIndexHtml();
    const initializeApp = async () => {
      const res = await getListPasar("");
      if (!selectedPasar) {
        setDefaultLocation(res?.data);
      } else {
        const resSelectedIndex = res?.data.findIndex(
          item => item.id === selectedPasar?.id
        );
        if (resSelectedIndex !== -1) {
          restoreCart();
          localStorage.setItem("listLocation", JSON.stringify(res?.data));
          localStorage.setItem(
            "selectedPasar",
            JSON.stringify(res?.data[resSelectedIndex])
          );

          if (res?.data[resSelectedIndex].isOpen) {
            localStorage.removeItem("isLocationClose");
          } else {
            localStorage.setItem("isLocationClose", "true");
            setIsClose(true);
          }
          if (res?.data[resSelectedIndex].isOpenHour) {
            localStorage.removeItem("isLocationCloseHour");
          } else {
            localStorage.setItem("isLocationCloseHour", "true");
            setIsCloseHour(true);
          }

          setIsLoading(false);
        } else {
          if (window.location.pathname !== "/market") {
            setDefaultLocation(res?.data);
          } else {
            restoreCart();
            setIsLoading(false);
          }
        }
      }
    };

    const fetchAPI = async () => {
      const response = await tenantInfo();
      if (response) {
        localStorage.setItem("tenant", JSON.stringify(response.data));
      }
    };

    fetchAPI();
    initializeApp();
  }, []);

  useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem("users"));
    const isOnAuth =
      authRoute.findIndex(item => item === window.location.pathname) !== -1;
    const isOnCheckout = window.location.pathname.includes("/cart-shipment");
    if (process.env.REACT_APP_POSTHOG_ENABLE === "true") {
      posthog.capture(`Page event ${window.location.pathname}`, {
        property: `${window.location.pathname}`
      });
    }
    if (!isLogin) {
      if (process.env.REACT_APP_PROTECTED_APP === "true" && !isOnAuth) {
        console.log("atas");
        history.push(`/login?ref=${props.location.pathname}`);
      }
      if (process.env.REACT_APP_PROTECTED_CHECKOUT === "true" && isOnCheckout) {
        console.log("bawah");
        console.log(window.location.pathname);
        history.push(`/login?ref=${props.location.pathname}`);
      }
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (localStorage.getItem("isFirstTime") !== "true") {
      setIsShowOnboarding(true);
      urlParams.set("step", activeStep.toString());
      history.replace(`${history.location.pathname}?${urlParams.toString()}`);
    }
  }, [activeStep]);

  const handleOnBoardingClick = () => {
    if (activeStep === 2) {
      localStorage.setItem("isFirstTime", "true");
      setIsShowOnboarding(false);
      urlParams.delete("step");
      history.replace("");
    } else {
      setActiveStep(activeStep + 1);
      urlParams.set("step", activeStep.toString());
      history.replace(`${history.location.pathname}?${urlParams.toString()}`);
    }
  };

  const handleSkipOnboarding = () => {
    setActiveStep(2);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isShowOnboarding && window.location.pathname !== "/change-language") {
    return (
      <IntlProvider
        locale={currentAppLocale?.locale}
        messages={currentAppLocale.messages}
      >
        <OnBoarding
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          onClick={handleOnBoardingClick}
          skipOnboarding={handleSkipOnboarding}
        />
      </IntlProvider>
    );
  }

  return (
    <React.Fragment>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <Switch>
          {/* HOME */}
          <ApmRoute exact path="/" component={Home} />
          {/* CATEGORY & PRODUCT */}
          <ApmRoute path="/category/:id" component={ProductList} />
          <ApmRoute exact path="/product/:id" component={ProductDetails} />
          <ApmRoute exact path="/article/:id" component={ArticleDetail} />
          <ApmRoute exact path="/addons" component={Addons} />
          <ApmRoute exact path="/product-search" component={ProductSearch} />
          <ApmRoute exact path="/cart" component={Cart} />
          <ApmRoute exact path="/cart-review" component={CartReview} />
          <ApmRoute exact path="/cart-success" component={CartSuccess} />
          <ApmRoute exact path="/cart-shipment" component={CartShipment} />
          <ApmRoute
            exact
            path="/cart-shipment/vouchers"
            component={CartVoucher}
          />
          <ApmRoute
            exact
            path="/cart-shipment/address"
            component={AddressList}
          />
          {/* <Route exact path="/checkout-review" component={CartShipmentNew} /> */}
          <ApmRoute exact path="/top-seller" component={TopSeller} />
          {/* PASAR */}
          <ApmRoute
            exact
            path="/market"
            component={Market}
            cartStateSetDefault
          />
          {/* PROFILE & AUTH */}
          <PrivateRoute exact path="/profile" component={Profile} />
          <ApmRoute exact path="/profile-edit" component={ProfileEdit} />
          <ApmRoute exact path="/profile/address" component={ProfileAddress} />
          <ApmRoute exact path="/login" component={Login} />
          <ApmRoute exact path="/register" component={Register} />
          <ApmRoute exact path="/address" component={Alamat} />
          <ApmRoute exact path="/new-address" component={AddAddress} />
          <ApmRoute
            exact
            path="/new-address/detail"
            component={DetailAddress}
          />
          <ApmRoute exact path="/address/maps" component={Maps} />
          <ApmRoute exact path="/banner/:id" component={BannerDetail} />
          <ApmRoute
            exact
            path="/cart-shipment/update-address"
            component={UpdateAddress}
          />
          <ApmRoute exact path="/term-of-use" component={TermOfUse} />
          <ApmRoute exact path="/about-us" component={AboutUs} />
          <ApmRoute exact path="/privacy-policy" component={PrivacyPolicy} />
          <ApmRoute exact path="/profile/point" component={Point} />
          <ApmRoute exact path="/change-language" component={ChangeLanguage} />
          <ApmRoute
            exact
            path="/profile/vouchers"
            component={CustomerVoucher}
          />
          \
          <ApmRoute exact path="/profile/redeem" component={RedeemCode} />
          {/* <Route exact path='/register' component={Register} /> */}
          {/* ORDER */}
          <PrivateRoute exact path="/orders" component={Orders} />
          <ApmRoute exact path="/order-history" component={OrderHitory} />
          <ApmRoute exact path="/order/:id" component={OrderDetails} />
          {/* HELP */}
          <ApmRoute exact path="/help" component={Help} />
          <ApmRoute exact path="/help/:id" component={HelpDetails} />
          <ApmRoute exact path="/timeout" component={TimeOut} />
          <ApmRoute exact path="/cart-shipment/voucher" component={Voucher} />
          <ApmRoute path="/" component={NotFound} />
        </Switch>

        {["/cart", "/cart-shipment", "/voucher"].indexOf(
          props.location.pathname
        ) === -1 && (
          <>
            <CustomDialog
              button="OK"
              onClose={() => {
                // if (localStorage.getItem("isLocationClose", "true")) {
                //   history.push("/cart");
                // }
                setIsClose(false);
                setIsCloseHour(false);
              }}
              open={isClose}
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

            <CustomDialog
              button="OK"
              onClose={() => {
                // if (localStorage.getItem("isLocationCloseHour", "true")) {
                //   history.push("/cart");
                // }
                setIsClose(false);
                setIsCloseHour(false);
              }}
              open={isCloseHour && !isClose}
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
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <WatchIcon />
                    <Typography
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginLeft: 5
                      }}
                    >
                      Tutup &#9679;{" "}
                      <span style={{ fontWeight: 400 }}>
                        {selectedPasar?.openHours?.[thisDay]?.hours?.length ===
                        0
                          ? "Maaf hari ini toko tutup"
                          : `Buka hari ini ${selectedPasar?.openHours?.[thisDay]?.hours[0]?.open} - ${selectedPasar?.openHours?.[thisDay]?.hours[0]?.close}`}
                      </span>
                    </Typography>
                  </div>
                </div>
              }
            />
          </>
        )}

        {homeRoute.indexOf(props.location.pathname) !== -1 && (
          <>
            <BottomNavigationApp />
          </>
        )}
      </IntlProvider>
    </React.Fragment>
  );
}

export default withRouter(App);
