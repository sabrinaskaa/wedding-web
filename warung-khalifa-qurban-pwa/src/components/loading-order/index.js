import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import LoadingImage from "../../vector/loading-order.png";
import CustomSpinner from "../../vector/custom-spinner.png";
import { useIntl } from "react-intl";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    backgroundColor: "white",
    zIndex: "100",
    maxWidth: "441px",
    top: "0px",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    marginTop: 32,
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 16
  },
  subTitle: {
    fontWeight: 400,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 32
  },
  loading: {
    animationName: "$spin",
    animationDuration: "1s",
    animationIterationCount: "infinite"
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" }
  }
});

const LoadingOrder = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <img src={LoadingImage} alt="loading" />
      <Typography className={classes.title}>
        {""}
        {intl.formatMessage({
          id: "loadingOrder.requirements.1.0"
        })}
      </Typography>
      <Typography className={classes.subTitle}>
        {""}
        {intl.formatMessage({
          id: "loadingOrder.requirements.2.0"
        })}{" "}
        <br /> {""}
        {intl.formatMessage({
          id: "loadingOrder.requirements.3.0"
        })}
      </Typography>
      <img
        className={classes.loading}
        src={CustomSpinner}
        alt="loading-spinner"
      />
    </div>
  );
};

export default LoadingOrder;
