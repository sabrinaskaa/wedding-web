import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import currencyFormatter from "../../utilities/currency-formatter";
import {
  getShippingChannelLabel,
  getOrderPaymentStatusBackgroundColor,
  getOrderStatusPaymentLabel
} from "../../utils/order";

function Component(props) {
  const { classes, order } = props;
  // const colorFunc = () => {
  //   if (props.order.status === "Dalam Proses") {
  //     return { color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101" };
  //   } else {
  //     return { color: "red" };
  //   }
  // };
  if (props.order.status === "wc-pending") {
    props.order.status = "Dalam Proses";
  }
  if (props.order.status === "wc-processing") {
    props.order.status = "Dalam Proses";
  }
  if (props.order.status === "wc-cancelled") {
    props.order.status = "Dibatalkan";
  }
  if (props.order.status === "wc-completed") {
    props.order.status = "Selesai Belanja";
  }
  if (props.order.status === "trash") {
    props.order.status = "Dibatalkan";
  }
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "white" }}>
        <Link style={{ textDecoration: "none" }} to={`/order/${order.id}`}>
          <List className={classes.root}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0px"
              }}
            >
              <Typography
                style={{ fontSize: 12, fontWeight: 600, color: "#808080" }}
              >
                {getShippingChannelLabel(order)}
              </Typography>
              <Typography
                style={{ fontSize: 12, fontWeight: 400, color: "#808080" }}
              >
                {order?.id}
              </Typography>
            </div>
            <Divider variant="fullWidth" />
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%"
                }}
              >
                <div
                  style={{
                    background: getOrderPaymentStatusBackgroundColor(order),
                    borderRadius: 5,
                    padding: "5px 15px",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "white",
                    marginTop: 16,
                    width: 200
                  }}
                >
                  {getOrderStatusPaymentLabel(order)}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 12,
                    fontWeight: 600,
                    marginTop: "12px",
                    textAlign: "left",
                    justifyContent: "space-between"
                  }}
                >
                  {order.items[0].name}{" "}
                  {order.items.length > 1 && (
                    <div
                      style={{
                        color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                      }}
                    >
                      + {order.items.length - 1} Item lainnya
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "#808080",
                    margin: "12px 0px",
                    textAlign: "left"
                  }}
                >
                  {moment(order.createdAt).format("DD MMMM YYYY")}&nbsp; •
                  &nbsp;
                  {moment(order.createdAt).format("HH:mm")}
                </div>
              </div>
            </div>
            <Divider variant="fullWidth" />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 0px",
                alignItems: "center"
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#333333",
                    fontWeight: 400,
                    textAlign: "left",
                    marginBottom: 5
                  }}
                >
                  Total Pembayaran
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {currencyFormatter.format(order.totalPrice)}
                </div>
              </div>
              <div
                style={{
                  border: `1px solid ${process.env.REACT_APP_COLOR_PRIMARY ||
                    "#FFD101"}`,
                  borderRadius: 5,
                  padding: "5px 12px",
                  height: 25,
                  fontSize: 10,
                  fontWeight: 600,
                  color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                  display: "flex"
                }}
              >
                Lihat Detail
              </div>
            </div>
          </List>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Component;
