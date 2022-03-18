import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import RightArrow from "@material-ui/icons/KeyboardArrowRightRounded";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useLocation } from "react-router-dom";
import Payment from "../../vector/payment-icon.js";
import { useIntl } from "react-intl";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ButtonPaymentMethod = ({ onClick, selectedPayment }) => {
  const address = JSON.parse(localStorage.getItem("selectedAddress"));
  const query = useQuery();
  const intl = useIntl();
  const tabs = query.get("tabs");
  return (
    <>
      <Typography style={{ marginBottom: 16, fontWeight: 600 }}>
        {" "}
        {intl.formatMessage({
          id: "btnPaynment.requirements.1.0"
        })}
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        disabled
        value={
          selectedPayment ? selectedPayment.label || selectedPayment.name : ""
        }
        placeholder={
          selectedPayment
            ? selectedPayment.label || selectedPayment.name
            : `${intl.formatMessage({ id: "btnPaynment.requirements.2.0" })}`
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Payment />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <RightArrow
                style={{
                  color:
                    tabs !== "1"
                      ? process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                      : address && tabs === "1"
                      ? process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                      : "red"
                }}
              />
            </InputAdornment>
          ),
          style: { cursor: "pointer" }
        }}
        // eslint-disable-next-line
        inputProps={{
          style: {
            cursor: "pointer",
            color: "#333333",
            fontSize: 12,
            fontWeight: 500
          }
        }}
        onClick={onClick}
      />
    </>
  );
};

export default ButtonPaymentMethod;
