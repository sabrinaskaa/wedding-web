import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import RightArrow from "@material-ui/icons/KeyboardArrowRightRounded";
import InputAdornment from "@material-ui/core/InputAdornment";
import Shipping from "../../vector/shipping";
import currencyFormatter from "../../utilities/currency-formatter";
import { useIntl } from "react-intl";

const ButtonShippingMethod = ({
  selectedShipping,
  openShipmentMethod,
  openCourier
}) => {
  const address = JSON.parse(localStorage.getItem("selectedAddress"));
  const intl = useIntl();

  console.log(selectedShipping);
  const getTitle = () => {
    if (!selectedShipping) return null;
    if (
      selectedShipping?.code === "delivery" &&
      selectedShipping?.gateway === "local"
    ) {
      return `${selectedShipping?.label ||
        process.env.REACT_APP_SHIPPING_DELIVERY_LABEL ||
        selectedShipping?.name} ${selectedShipping?.serviceName}  ${
        selectedShipping?.estimatedTimeMaximum === 1
          ? `(${selectedShipping?.estimatedTimeMinimum} Hari)`
          : `(${selectedShipping?.estimatedTimeMinimum} - ${selectedShipping?.estimatedTimeMaximum} Hari)`
      }  ${currencyFormatter.format(selectedShipping?.cost)}`;
    } else {
      return `${selectedShipping?.label || selectedShipping?.name} ${
        selectedShipping?.serviceName
      }  ${
        selectedShipping?.estimatedTimeMaximum === 1
          ? `(${selectedShipping?.estimatedTimeMinimum} Hari)`
          : `(${selectedShipping?.estimatedTimeMinimum} - ${selectedShipping?.estimatedTimeMaximum} Hari)`
      }  ${currencyFormatter.format(selectedShipping?.cost)}`;
    }
  };

  return (
    <>
      <Typography style={{ marginBottom: 16, fontWeight: 600 }}>
        {" "}
        {intl.formatMessage({
          id: "btnShipping.requirements.1.0"
        })}
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        disabled
        value={getTitle()}
        placeholder={`${intl.formatMessage({
          id: "cartShipment.requirements.31.0"
        })}`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Shipping />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <RightArrow
                style={{
                  color: address
                    ? process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                    : "red"
                }}
              />
            </InputAdornment>
          ),
          style: {
            cursor: "pointer",
            color: "#333333",
            fontSize: 12,
            fontWeight: 500
          }
        }}
        // eslint-disable-next-line
        inputProps={{ style: { cursor: "pointer" } }}
        onClick={openShipmentMethod}
      />
    </>
  );
};

export default ButtonShippingMethod;
