/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/app";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import "firebase/performance";
import { init as initApm } from "@elastic/apm-rum";
import posthog from "posthog-js";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { CaptureConsole as CaptureConsoleIntegration } from "@sentry/integrations";
import CartContextProvider from "./context/cart";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import LanguageContextProvider from "./context/language";

const theme = createMuiTheme({
  typography: {
    fontFamily: process.env.REACT_APP_FONT_FAMILY || "Montserrat"
  },
  palette: {
    primary: {
      main: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
    },
    background: {
      default: "#FBFDFF"
    }
  },
  overrides: {
    MuiInputBase: {
      input: {
        "&::placeholder": {
          fontSize: 12,
          fontWeight: 500,
          color: "#A6A6A6"
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        border: "1px solid #F5F5F5",
        borderRadius: "8px"
      },
      adornedStart: {
        paddingLeft: "16px"
      }
    }
  }
});

const REACT_APP_POSTHOG_ENABLE =
  process.env.REACT_APP_POSTHOG_ENABLE || "false";
if (REACT_APP_POSTHOG_ENABLE === "true") {
  posthog.init(process.env.REACT_APP_POSTHOG_API_KEY, {
    api_host: process.env.REACT_APP_POSTHOG_API_HOST
  });
}

const REACT_APP_ELK_APM_ANALYTICS_ENABLE =
  process.env.REACT_APP_ELK_APM_ANALYTICS_ENABLE || "true";

if (REACT_APP_ELK_APM_ANALYTICS_ENABLE === "true") {
  // eslint-disable-next-line
  var apm = initApm({
    // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
    serviceName:
      process.env.REACT_APP_APM_SERVICE_NAME || "warung-customer-pwa",

    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl:
      process.env.REACT_APP_APM_SERVER_URL ||
      "https://a18f807785c946a785a53f3ee5d5942d.apm.westus2.azure.elastic-cloud.com:443",

    // Set the service version (required for source map feature)
    serviceVersion: process.env.REACT_APP_APM_SERVICE_VERSION || "1.0",

    // Set the service environment
    environment: process.env.REACT_APP_APM_ENVIRONMENT || "production"
  });
}

const REACT_APP_SENTRY_ENABLE = process.env.REACT_APP_SENTRY_ENABLE || "true";

if (REACT_APP_SENTRY_ENABLE === "true") {
  Sentry.init({
    dsn:
      process.env.REACT_APP_SENTRY_DSN ||
      "https://65cfcdbfe1b44c2eabec2d9523b88096@o910762.ingest.sentry.io/5896834",
    integrations: [
      new Integrations.BrowserTracing(),
      new CaptureConsoleIntegration({
        // array of methods that should be captured
        // defaults to ['log', 'info', 'warn', 'error', 'debug', 'assert']
        levels: ["warn", "error"]
      })
    ],
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT || "production",

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate:
      parseInt(process.env.REACT_APP_SENTRY_TRACE_SAMPLE_RATE) || 1.0
  });
}

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_API_KEY || "AIzaSyADkQXziL_SPtaDrVPMIrEivRPhvheuDtY",
  authDomain:
    process.env.REACT_APP_AUTH_DOMAIN || "warung-customer.firebaseapp.com",
  databaseURL:
    process.env.REACT_APP_DATABASE_URL ||
    "https://warung-customer.firebaseio.com",
  projectId: process.env.REACT_APP_PROJECT_ID || "warung-customer",
  storageBucket:
    process.env.REACT_APP_STORAGE_BUCKET || "warung-customer.appspot.com",
  messagingSenderId:
    process.env.REACT_APP_MESSAGING_SENDER_ID || "563273079568",
  appId:
    process.env.REACT_APP_APP_ID || "1:563273079568:web:5281cd990e83152d38a395",
  measurementId: process.env.REACT_APP_MEASUREMENT_ID || "G-DMVGTZ8K6M"
};

firebase.initializeApp(firebaseConfig);

// Initialize Performance Monitoring and get a reference to the service
const REACT_APP_FIREBASE_PERFORMANCE_ENABLE =
  process.env.REACT_APP_FIREBASE_PERFORMANCE_ENABLE || "true";
if (process.env.REACT_APP_FIREBASE_PERFORMANCE_ENABLE === "true") {
  const perf = firebase.performance();
}
const REACT_APP_FIREBASE_ANALYTICS_ENABLE =
  process.env.REACT_APP_FIREBASE_ANALYTICS_ENABLE || "true";
if (REACT_APP_FIREBASE_ANALYTICS_ENABLE === "true") {
  const analytics = firebase.analytics();
}

ReactDOM.render(
  <CartContextProvider>
    <LanguageContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </LanguageContextProvider>
  </CartContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
