import React from "react";
import { Typography } from "@material-ui/core";
import { Capitalize } from "../../utilities/capitalize";
import { useIntl } from "react-intl";

const CardAddress = props => {
  const { item, primaryAddress, updateAddress, selectedAddress } = props;
  const intl = useIntl();
  return (
    <div
      style={{
        height: 200,
        backgroundColor: "white",
        margin: 10,
        borderRadius: 8,
        border: "1px solid #F5F5F5"
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <span
          style={{
            position: "inherit",
            backgroundColor: item.default
              ? process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
              : "white",
            minWidth: 5,
            height: "100%",
            borderRadius: "8px 0px 0px 8px"
          }}
        >
          &nbsp;
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 5,
            padding: 10,
            fontWeight: "bold",
            width: "100%"
          }}
        >
          {item.default ? (
            <div
              style={{
                backgroundColor:
                  process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                color: "white",
                borderRadius: 8,
                padding: 7,
                width: "fit-content",
                fontSize: 12
              }}
            >
              {" "}
              {intl.formatMessage({
                id: "cardAddress.requirements.1.0"
              })}
            </div>
          ) : (
            <div
              onClick={primaryAddress}
              style={{
                backgroundColor: "white",
                border: `1px solid ${process.env.REACT_APP_COLOR_PRIMARY ||
                  "#FFD101"}`,
                color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                borderRadius: 8,
                padding: 7,
                width: "fit-content",
                fontSize: 12,
                cursor: "pointer"
              }}
            >
              {" "}
              {intl.formatMessage({
                id: "cardAddress.requirements.2.0"
              })}
            </div>
          )}
          <div onClick={selectedAddress}>
            <Typography
              style={{ marginTop: 10 }}
              variant="subtitle2"
              display="block"
            >
              {item.label}
            </Typography>
            <Typography
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginTop: 10
              }}
              variant="caption"
              display="block"
            >
              {Capitalize(item.address)}
            </Typography>
            <Typography
              style={{ marginTop: 5 }}
              variant="caption"
              display="block"
            >
              {item.name}
            </Typography>
            <Typography
              style={{ marginTop: 5 }}
              variant="caption"
              display="block"
            >
              {/* +62 {item.phone?.slice(2, item?.phone?.length)} */}+
              {item?.phone}
            </Typography>
          </div>
          <div
            style={{
              color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: 20
            }}
            onClick={updateAddress}
          >
            {" "}
            {intl.formatMessage({
              id: "cardAddress.requirements.3.0"
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAddress;
