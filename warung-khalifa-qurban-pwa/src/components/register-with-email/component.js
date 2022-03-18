import {
  Button,
  Grid,
  Typography,
  InputAdornment,
  TextField,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import React, { useState } from "react";
import queryString from "query-string";
import { withRouter, useHistory } from "react-router";
import CountryData from "../../utilities/country-code";
import AppBar from "../app-bar";
import ReactFlagsSelect from "react-flags-select";
import MasukEmail from "../../vector/masukEmail.js";
import iconEmail from "../../vector/email.svg";
import pass from "../../vector/pass.svg";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { registerWithEmail } from "../../services/auth";
import * as Sentry from "@sentry/react";
import Popup from "../../components/privacy-policy-popup";
import { useIntl } from "react-intl";

function RegisterWithEmail(props) {
  const { classes } = props;
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("ID");
  const [isError, setIsError] = useState({
    name: false,
    phone: false,
    email: false,
    password: false
  });
  const getUrl = queryString.parse(window.location.search);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const intl = useIntl();

  const countryCodeNumber = CountryData[selectedCountryCode].secondary.slice(
    1,
    CountryData[selectedCountryCode].secondary.length
  );

  const validPhone = phone
    ? phone.slice(0, 1) === "0"
      ? countryCodeNumber + phone.slice(1, phone.length)
      : phone.slice(0, 2) === countryCodeNumber
      ? phone
      : countryCodeNumber + phone
    : null;

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  const validateForm = () => {
    let result = {};
    if (name.length < 3) {
      result.name = true;
    }
    if (phone.length < 9) {
      result.phone = true;
    }
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

  const signupWithEmail = () => {
    const data = { email, password, name, phone: validPhone };

    if (validateForm()) {
      setIsLoading(true);
      registerWithEmail(data)
        .then(res => {
          localStorage.setItem("users", JSON.stringify(res.data.user));
          localStorage.removeItem("selectedAddress");
          localStorage.removeItem("savedData");
          localStorage.removeItem("edit_data_address");
          localStorage.setItem("token", res.data.token);
          Sentry.setUser({ email: res.data.email });
          window.location.href = getUrl?.ref || "/profile";
        })
        .catch(err => {
          const errMessage = err.response.data.meta.message;
          setErrorMessage(errMessage);
          setIsLoading(false);
        });
    }
  };

  const showHideIcon = showPassword => {
    if (showPassword) {
      return <Visibility fontSize="small" />;
    } else {
      return <VisibilityOff fontSize="small" />;
    }
  };

  return (
    <div>
      {/* <AppBar goBack title="Daftar Dengan Email" /> */}
      <AppBar
        goBack
        title={`${intl.formatMessage({
          id: "goBack.requirements.1.0"
        })}`}
      />
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress
            style={{
              color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
              alignSelf: "center"
            }}
            disableShrink
          />
        </div>
      ) : (
        <>
          <div className={classes.container}>
            <div align="center">
              <MasukEmail />
              <Typography
                variant="body2"
                className={classes.registerTitle}
                style={{
                  marginBottom: 20,
                  marginTop: 30
                }}
              >
                {" "}
                {intl.formatMessage({
                  id: "regiterEmail.requirements.title.1.0"
                })}
              </Typography>
            </div>
            <TextField
              value={name || ""}
              error={isError.name}
              onChange={event => {
                if (event.target.value.length < 3) {
                  setIsError({
                    ...isError,
                    name: true
                  });
                } else {
                  setIsError({
                    ...isError,
                    name: false
                  });
                }
                setName(event.target.value);
              }}
              label={`${intl.formatMessage({
                id: "labelName.requirements.1.0"
              })}`}
              className={classes.textField}
              name="name"
              autoComplete="name"
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
                      <img src={iconEmail} alt="Email" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              placeholder={`${intl.formatMessage({
                id: "namePlaceholder.requirements.1.0"
              })}`}
            />
            <TextField
              error={isError.phone}
              label={`${intl.formatMessage({
                id: "labelPhone.requirements.1.0"
              })}`}
              fullWidth
              name="phone"
              value={phone}
              onChange={event => {
                if (event.target.value.length < 9) {
                  setIsError({
                    ...isError,
                    phone: true
                  });
                } else {
                  setIsError({
                    ...isError,
                    phone: false
                  });
                }
                setPhone(event.target.value);
              }}
              type="number"
              margin="normal"
              className={classes.textField}
              InputProps={{
                style: { fontSize: 12 },
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
              placeholder={`${intl.formatMessage({
                id: "phonePlaceholder.requirements.1.0"
              })}`}
            />
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
                      <img src={iconEmail} alt="Email" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              placeholder={`${intl.formatMessage({
                id: "emailPlaceholder.requirements.1.0"
              })}`}
            />
            {isError.email && (
              <Typography style={{ color: "red" }} variant="caption">
                {" "}
                {intl.formatMessage({
                  id: "errorEmail.requirements.1.0"
                })}
              </Typography>
            )}
            <TextField
              value={password || ""}
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
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showHideIcon(showPassword)}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              label="Password:"
              className={classes.textField}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              placeholder={`${intl.formatMessage({
                id: "passwordPlaceholder.requirements.1.0"
              })}`}
            />
            {errorMessage && (
              <Typography style={{ color: "red" }} variant="caption">
                {errorMessage}
              </Typography>
            )}
            <Typography
              style={{
                color: "black",
                alignItems: "center",
                display: "flex"
              }}
              variant="caption"
            >
              {" "}
              {intl.formatMessage({
                id: "alredyRegistered.requirements.1.0"
              })}{" "}
              <Button
                onClick={() => history.push("/login" + window.location.search)}
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
                  {""}
                  {intl.formatMessage({
                    id: "login.requirements.1.0"
                  })}
                </b>
              </Button>
            </Typography>
            <div style={{ marginTop: 40 }}>
              <Grid align="center" container spacing={3}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor:
                        process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                      borderRadius: 4,

                      color: "white",
                      width: 200,
                      textTransform: "none"
                    }}
                    className={classes.button}
                    onClick={signupWithEmail}
                  >
                    <b>
                      {" "}
                      {intl.formatMessage({
                        id: "registerButton.requirements.1.0"
                      })}
                    </b>
                  </Button>
                </Grid>
                <Grid item xs={12} style={{ marginTop: -20 }}>
                  <Button
                    style={{
                      color: "#9FA3A6",
                      width: 200,
                      textTransform: "none"
                    }}
                    className={classes.button}
                    onClick={() => history.goBack()}
                  >
                    <b>
                      {" "}
                      {intl.formatMessage({
                        id: "cancelButton.requirements.1.0"
                      })}
                    </b>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
          <Popup />
        </>
      )}
    </div>
  );
}

export default withRouter(RegisterWithEmail);
