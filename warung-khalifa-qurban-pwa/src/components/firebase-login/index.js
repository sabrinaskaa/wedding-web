import React, { useState, useEffect } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import queryString from "query-string";
import {
  makeStyles,
  createMuiTheme,
  TextField,
  Box,
  Button,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  CircularProgress
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Masuk from "../../vector/masuk.js";
import MasukEmail from "../../vector/masukEmail.js";
import IconPassword from "../../vector/password.js";
import google from "../../vector/google.svg";
import iconEmail from "../../vector/email.svg";
import pass from "../../vector/pass.svg";
import EmailLain from "../../vector/emaillain.js";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import * as Sentry from "@sentry/react";
import { loginWithEmailToken } from "../../services/auth";
import { useIntl } from "react-intl";

import AppBar from "../app-bar";
import { loginWithFirebaseToken, resetPassword } from "../../services/auth";

import "./firebase-ui.css";
import "./imports.css";
import "./mdl.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
    }
  }
});

const useStyles = makeStyles(theme => ({
  textField: {
    ".MuiInput-underline-447:after": {
      borderBottomColor: "2px solid #F4783B"
    },
    ".MuiInput-underline-447:before": {
      borderBottomColor: "2px solid #F4783B"
    },
    width: "100%",
    "& label": {
      fontSize: 12
    }
  },
  gridGoogle: {
    marginBottom: 58,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 20
    }
  },
  nikmat: {
    marginBottom: 70,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 37
    }
  },
  loginTitle: {
    fontWeight: 600,
    fontSize: 16
  }
}));

function FirebaseLogin(props, target, event) {
  if (props.user) {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        props.setUserLogin(result.user);
        props.history.push(getUrl.ref);
      });
  }
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [click, setClick] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [withEmail, setWithEmail] = useState(false);
  const [login, setLogin] = useState(true);
  const [forgotPass, setForgotPass] = useState(false);
  const getUrl = queryString.parse(window.location.search);
  const provider = new firebase.auth.GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState({ email: false, password: false });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(
    localStorage.getItem("loginWithGoogle") === "true"
  );
  const intl = useIntl();
  const loginWithGoogle = async () => {
    setLoading(true);
    localStorage.setItem("loginWithGoogle", "true");
    firebase.auth().signInWithRedirect(provider);
  };

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  const validateForm = () => {
    let result = {};
    if (password.length < 6) {
      result.password = true;
    }
    if (!validateEmail(email)) {
      result.email = true;
    }
    setIsError(prevState => ({
      ...prevState,
      ...result
    }));
    const validate = Object.keys(result).length > 0 ? false : true;
    return validate;
  };

  const loginWithEmail = () => {
    const data = { email, password };
    if (validateForm()) {
      setLoading(true);
      loginWithEmailToken(data)
        .then(res => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("users", JSON.stringify(res.data.user));
          localStorage.removeItem("selectedAddress");
          localStorage.removeItem("edit_data_address");
          localStorage.removeItem("savedData");
          window.location.href = getUrl.ref;
          Sentry.setUser({ email: res.data.email });
        })
        .catch(err => {
          const errMessage = err.response.data.meta.message;
          setErrorMessage(errMessage);
          setLoading(false);
        });
    }
  };

  const handleResetPassword = async () => {
    const emailAddress = { email: email };
    await resetPassword(emailAddress)
      .then(res => {
        if (res.data) {
          alert("Silahkan cek inbox email anda");
          history.push(`/login?ref=${getUrl.ref}&state=login`);
        }
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    const search = queryString.parse(location.search);
    if (click && login) {
      if (search.state !== "login") {
        props.history.push(`/login?ref=${getUrl.ref}&state=login`);
      }
    }
    if (forgotPass) {
      if (search.state !== "forgotPassword") {
        props.history.push(`/login?ref=${getUrl.ref}&state=forgotPassword`);
      }
    }
    if (click && !login) {
      if (search.state !== "register") {
        props.history.push(`/login?ref=${getUrl.ref}&state=register`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login, click, forgotPass]);

  useEffect(() => {
    const search = queryString.parse(location.search);

    if (!search.state) {
      setClick(false);
      setForgotPass(false);
    }
    if (search.state === "register") {
      setClick(true);
      setLogin(false);
      setForgotPass(false);
    }
    if (search.state === "login") {
      setClick(true);
      setForgotPass(false);
      setLogin(true);
    }
    if (search.state === "forgotPassword") {
      setForgotPass(true);
    }
  }, [location]);

  useEffect(() => {
    if (loading) {
      firebase
        .auth()
        .getRedirectResult()
        .then(async res => {
          if (res) {
            localStorage.setItem("users", JSON.stringify(res.user));
            const googleToken = await res.user.getIdToken();
            loginWithFirebaseToken(googleToken)
              .then(res => {
                localStorage.removeItem("loginWithGoogle");
                localStorage.setItem("token", res.data.token);
                localStorage.removeItem("selectedAddress");
                localStorage.removeItem("savedData");
                localStorage.removeItem("edit_data_address");
                Sentry.setUser({ email: res.data.email });
                window.location.href = getUrl.ref;
              })
              .catch(err => {
                localStorage.removeItem("loginWithGoogle");
                setLoading(false);
                setWithEmail(false);
                alert("Ups terjadi kesalahan");
                console.log("error");
              });
            // window.location.href = getUrl.ref;
          }
        })
        .catch(error => {
          localStorage.removeItem("loginWithGoogle");
          setLoading(false);
          setWithEmail(false);
          alert("Ups terjadi kesalahan");
          console.log("error", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showHideIcon = showPassword => {
    if (showPassword) {
      return <Visibility fontSize="small" />;
    } else {
      return <VisibilityOff fontSize="small" />;
    }
  };
  // console.log({
  //   click,
  //   forgotPass,
  //   login
  // });

  return (
    <React.Fragment>
      {forgotPass === true ? (
        <AppBar
          goBack
          title={`${intl.formatMessage({
            id: "firebaseLoginAdd.requirements.1.0"
          })}`}
        />
      ) : (
        <React.Fragment>
          {click === false ? (
            <AppBar goBack title={`${intl.formatMessage({ id: "signIn" })}`} />
          ) : (
            <React.Fragment>
              <AppBar
                goBack
                title={`${intl.formatMessage({ id: "signIn.withEmail" })}`}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      <div style={{ marginBottom: 20 }}>
        {forgotPass === true ? (
          <div className="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner">
            <div className="firebaseui-card-content">
              {/* <div style={{ padding: 20 }}> */}
              <center>
                <div style={{ marginTop: 72 }} align="center">
                  <IconPassword />
                  <Typography
                    className={classes.loginTitle}
                    variant="body2"
                    style={{ marginBottom: 20, marginTop: 30 }}
                  >
                    {" "}
                    {intl.formatMessage({
                      id: "firebaseLoginAdd.requirements.1.0"
                    })}
                  </Typography>
                </div>

                <TextField
                  value={email || ""}
                  error={isError.email}
                  onChange={event => {
                    if (validateEmail(event.target.value)) {
                      setIsError({
                        ...isError,
                        email: false
                      });
                    } else {
                      setIsError({
                        ...isError,
                        email: true
                      });
                    }
                    setEmail(event.target.value);
                  }}
                  label="Email"
                  className={classes.textField}
                  type="email"
                  autoComplete="email"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    style: { fontSize: 12 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          style={{
                            color: "white",
                            padding: 0,
                            margin: 0
                          }}
                        >
                          <img src={iconEmail} alt="email" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  // placeholder="Masukan Email"
                  placeholder={`${intl.formatMessage({
                    id: "firebaseLoginAdd.requirements.2.0"
                  })}`}
                  color="white"
                />
                {isError.email && (
                  <Typography style={{ color: "red" }} variant="caption">
                    {" "}
                    {intl.formatMessage({
                      id: "firebaseLoginAdd.requirements.3.0"
                    })}
                  </Typography>
                )}
                <Typography style={{ fontSize: 12, marginTop: 22 }}>
                  {" "}
                  {intl.formatMessage({
                    id: "firebaseLoginAdd.requirements.4.0"
                  })}
                </Typography>
                <Grid style={{ marginTop: 30 }} container spacing={0}>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor:
                          process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                        color: "white",
                        width: 200,
                        textTransform: "none"
                      }}
                      className={classes.button}
                      onClick={handleResetPassword}
                    >
                      <b>
                        {" "}
                        {intl.formatMessage({
                          id: "firebaseLoginAdd.requirements.5.0"
                        })}
                      </b>
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      style={{
                        marginTop: "5%",
                        color: "#9FA3A6",
                        width: 200,
                        textTransform: "none"
                      }}
                      className={classes.button}
                      onClick={() => setForgotPass(!forgotPass)}
                    >
                      <b>
                        {" "}
                        {intl.formatMessage({
                          id: "firebaseLoginAdd.requirements.6.0"
                        })}
                      </b>
                    </Button>
                  </Grid>
                </Grid>
              </center>
            </div>
          </div>
        ) : (
          <div>
            {!props.user ? (
              <div>
                <div lang="en">
                  <div className="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner">
                    <div className="firebaseui-card-content">
                      <form
                        onSubmit={event => {
                          event.preventDefault();
                        }}
                      >
                        <ul className="firebaseui-idp-list">
                          {click === false ? (
                            <Grid container align="center">
                              <Grid
                                style={{ marginBottom: 30, marginTop: 72 }}
                                item
                                xs={12}
                              >
                                <Masuk />
                              </Grid>
                              <Grid item xs={12} className={classes.nikmat}>
                                <Typography
                                  variant="body2"
                                  className={classes.loginTitle}
                                >
                                  {intl.formatMessage({ id: "signIn" })}
                                </Typography>
                                <Typography variant="caption" display="block">
                                  {intl.formatMessage({
                                    id: "signIn.greeting"
                                  })}{" "}
                                  {process.env.REACT_APP_BRAND_NAME ||
                                    "Khalifa Qurban"}
                                </Typography>
                              </Grid>
                              {loading ? (
                                <Grid style={{ marginBottom: 10 }} item xs={12}>
                                  <div
                                    style={{
                                      width: "100%",
                                      justifyContent: "center"
                                    }}
                                  >
                                    <CircularProgress
                                      style={{
                                        color:
                                          process.env.REACT_APP_COLOR_PRIMARY ||
                                          "#FFD101",
                                        alignSelf: "center"
                                      }}
                                      disableShrink
                                    />
                                  </div>
                                </Grid>
                              ) : (
                                <>
                                  <Grid
                                    style={{ marginBottom: 10 }}
                                    item
                                    xs={12}
                                  >
                                    <button
                                      style={{
                                        backgroundColor: "#4285F4",
                                        margin: 0,
                                        padding: 3,
                                        borderRadius: 4
                                      }}
                                      className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button"
                                      data-provider-id="google.com"
                                      data-upgraded=",MaterialButton"
                                      onClick={loginWithGoogle}
                                    >
                                      <span
                                        align="center"
                                        style={{
                                          backgroundColor: "white",
                                          borderRadius: 4,
                                          width: "20%"
                                        }}
                                        className="firebaseui-idp-icon-wrapper"
                                      >
                                        <img
                                          className="firebaseui-idp-icon"
                                          alt=""
                                          src={google}
                                          style={{ width: 37, height: 35 }}
                                        />
                                      </span>
                                      <span
                                        style={{ color: "white", fontSize: 13 }}
                                        className="firebaseui-idp-text firebaseui-idp-text-long"
                                      >
                                        <b>
                                          {intl.formatMessage({
                                            id: "signIn.withGoogle"
                                          })}
                                        </b>
                                      </span>
                                      <span className="firebaseui-idp-text firebaseui-idp-text-short">
                                        Google
                                      </span>
                                    </button>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    className={classes.gridGoogle}
                                  >
                                    <button
                                      style={{
                                        backgroundColor:
                                          process.env.REACT_APP_COLOR_PRIMARY ||
                                          "#FFD101",
                                        margin: 0,
                                        padding: 3,
                                        borderRadius: 4
                                      }}
                                      className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button"
                                      data-provider-id="password"
                                      data-upgraded=",MaterialButton"
                                      onClick={() => setClick(!click)}
                                    >
                                      <span
                                        align="center"
                                        style={{
                                          backgroundColor: "white",
                                          borderRadius: 4,
                                          width: "23%",
                                          height: 35
                                        }}
                                        className="firebaseui-idp-icon-wrapper"
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                          }}
                                        >
                                          <EmailLain />
                                        </div>
                                      </span>
                                      <span
                                        className="firebaseui-idp-text firebaseui-idp-text-long"
                                        style={{
                                          fontSize: 13,
                                          color:
                                            process.env
                                              .REACT_APP_COLOR_FONT_BUTTON ||
                                            "#ffffff"
                                        }}
                                      >
                                        <b>
                                          {intl.formatMessage({
                                            id: "signIn.withEmail"
                                          })}
                                        </b>
                                      </span>
                                      <span className="firebaseui-idp-text firebaseui-idp-text-short">
                                        Email
                                      </span>
                                    </button>
                                  </Grid>
                                </>
                              )}
                            </Grid>
                          ) : (
                            <ThemeProvider theme={theme}>
                              <Box>
                                <div>
                                  {!loading ? (
                                    <div style={{ marginTop: 72 }}>
                                      <div align="center">
                                        <MasukEmail />
                                        <Typography
                                          variant="body2"
                                          className={classes.loginTitle}
                                          style={{
                                            marginBottom: 20,
                                            marginTop: 30
                                          }}
                                        >
                                          {intl.formatMessage({
                                            id: "signIn.withEmail"
                                          })}{" "}
                                        </Typography>
                                      </div>

                                      <TextField
                                        value={email}
                                        error={isError.email}
                                        onChange={event => {
                                          if (
                                            validateEmail(event.target.value)
                                          ) {
                                            setIsError({
                                              ...isError,
                                              email: false
                                            });
                                          } else {
                                            setIsError({
                                              ...isError,
                                              email: true
                                            });
                                          }
                                          setEmail(event.target.value);
                                        }}
                                        label="Email:"
                                        className={classes.textField}
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        margin="normal"
                                        InputLabelProps={{
                                          shrink: true
                                        }}
                                        InputProps={{
                                          style: { fontSize: 12 },
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <IconButton
                                                style={{
                                                  color: "white",
                                                  padding: 0,
                                                  margin: 0
                                                }}
                                              >
                                                <img
                                                  src={iconEmail}
                                                  alt="Email"
                                                />
                                              </IconButton>
                                            </InputAdornment>
                                          )
                                        }}
                                        // placeholder="Masukan Email"
                                        placeholder={`${intl.formatMessage({
                                          id: "firebaseLogin.enterEmail.1.0"
                                        })}`}
                                        required
                                      />
                                      {isError.email && (
                                        <Typography
                                          style={{ color: "red" }}
                                          variant="caption"
                                        >
                                          {""}
                                          {intl.formatMessage({
                                            id: "firebaseLogin.enterEmail.2.0"
                                          })}
                                        </Typography>
                                      )}
                                      <TextField
                                        value={password}
                                        error={isError.password}
                                        onChange={event => {
                                          if (event.target.value.length < 6) {
                                            setIsError({
                                              ...isError,
                                              password: true
                                            });
                                          } else {
                                            setIsError({
                                              ...isError,
                                              password: false
                                            });
                                          }
                                          setPassword(event.target.value);
                                        }}
                                        InputProps={{
                                          style: { fontSize: 12 },
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <IconButton
                                                style={{
                                                  color: "white",
                                                  padding: 0,
                                                  margin: 0
                                                }}
                                              >
                                                <img src={pass} alt="Pass" />
                                              </IconButton>
                                            </InputAdornment>
                                          ),
                                          endAdornment: (
                                            <InputAdornment position="end">
                                              <IconButton
                                                style={{
                                                  color: "rgb(159, 163, 166)",
                                                  padding: 0,
                                                  margin: 0
                                                }}
                                                onClick={() =>
                                                  setShowPassword(!showPassword)
                                                }
                                              >
                                                {showHideIcon(showPassword)}
                                              </IconButton>
                                            </InputAdornment>
                                          )
                                        }}
                                        label="Password:"
                                        className={classes.textField}
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        autoComplete="current-password"
                                        margin="normal"
                                        InputLabelProps={{
                                          shrink: true
                                        }}
                                        placeholder={`${intl.formatMessage({
                                          id:
                                            "firebasePassword.requirements.1.0"
                                        })}`}
                                        required
                                      />
                                      {errorMessage && (
                                        <Typography
                                          style={{ color: "red" }}
                                          variant="caption"
                                        >
                                          {errorMessage}
                                        </Typography>
                                      )}
                                      <div>
                                        <Grid
                                          container
                                          spacing={0}
                                          style={{ padding: 0 }}
                                        >
                                          <Grid item xs={8}>
                                            <Typography
                                              style={{
                                                color: "black",
                                                display: "flex",
                                                alignItems: "center",
                                                fontSize: 12
                                              }}
                                              variant="caption"
                                            >
                                              {" "}
                                              {intl.formatMessage({
                                                id:
                                                  "notRegistered.requirements.1.0"
                                              })}{" "}
                                              ?{" "}
                                              <Button
                                                onClick={() =>
                                                  history.push(
                                                    "/register" +
                                                      window.location.search
                                                  )
                                                }
                                                disableRipple
                                                style={{
                                                  color: "#14181B",
                                                  background: "transparent",
                                                  textTransform: "none",
                                                  fontSize: 12,
                                                  padding: 0,
                                                  marginLeft: "-2%"
                                                }}
                                              >
                                                <b>
                                                  {" "}
                                                  {intl.formatMessage({
                                                    id:
                                                      "register.requirements.1.0"
                                                  })}
                                                </b>
                                              </Button>
                                            </Typography>
                                          </Grid>
                                          <Grid
                                            item
                                            xs={4}
                                            style={{
                                              padding: 0,
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "flex-end"
                                            }}
                                          >
                                            <Button
                                              onClick={() =>
                                                setForgotPass(!forgotPass)
                                              }
                                              disableRipple
                                              style={{
                                                color: "#9FA3A6",
                                                background: "transparent",
                                                textTransform: "none",
                                                fontSize: 11,
                                                padding: 0,
                                                marginTop: -2
                                              }}
                                            >
                                              <u>
                                                {" "}
                                                {intl.formatMessage({
                                                  id:
                                                    "forgotPassword.requirements.1.0"
                                                })}
                                              </u>
                                            </Button>
                                          </Grid>
                                        </Grid>
                                      </div>

                                      <div style={{ marginTop: 40 }}>
                                        <Grid
                                          align="center"
                                          container
                                          spacing={3}
                                        >
                                          <Grid item xs={12}>
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor:
                                                  process.env
                                                    .REACT_APP_COLOR_PRIMARY ||
                                                  "#FFD101",
                                                color: "white",
                                                borderRadius: 4,
                                                width: 200,
                                                textTransform: "none",
                                                fontFamily:
                                                  "'Montserrat', sans-serif !important"
                                              }}
                                              className={classes.button}
                                              onClick={loginWithEmail}
                                            >
                                              <b>
                                                {" "}
                                                {intl.formatMessage({
                                                  id:
                                                    "loginButton.requirements.1.0"
                                                })}
                                              </b>
                                            </Button>
                                          </Grid>
                                          <Grid
                                            item
                                            xs={12}
                                            style={{ marginTop: -20 }}
                                          >
                                            <Button
                                              style={{
                                                color: "#9FA3A6",
                                                width: 200,
                                                textTransform: "none"
                                              }}
                                              // className={classes.button}
                                              onClick={() => setClick(!click)}
                                            >
                                              <b>
                                                {" "}
                                                {intl.formatMessage({
                                                  id: "cancel.requirements.1.0"
                                                })}
                                              </b>
                                            </Button>
                                          </Grid>
                                        </Grid>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      align="center"
                                      style={{
                                        width: "100%",
                                        height: "100vh",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                      }}
                                    >
                                      <CircularProgress
                                        style={{
                                          color:
                                            process.env
                                              .REACT_APP_COLOR_PRIMARY ||
                                            "#FFD101",
                                          alignSelf: "center"
                                        }}
                                        disableShrink
                                      />
                                    </div>
                                  )}
                                </div>
                              </Box>
                            </ThemeProvider>
                          )}
                        </ul>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div align="center" style={{ width: "100%" }}>
                <CircularProgress
                  style={{
                    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                    alignSelf: "center"
                  }}
                  disableShrink
                />
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default withRouter(FirebaseLogin);
