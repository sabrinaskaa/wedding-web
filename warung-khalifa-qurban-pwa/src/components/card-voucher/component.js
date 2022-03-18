/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

import { withTransaction } from "@elastic/apm-rum-react";
import { Typography, Divider } from "@material-ui/core";
import DialogDetail from "../../components/dialog";
import moment from "moment";
import currencyFormatter from "../../utilities/currency-formatter";
import Dompet from "../../vector/dompet";
import Expired from "../../vector/expired";
import Maks from "../../vector/maks";
import Big from "../../vector/range";
import Info from "../../vector/information";

function CardVoucher(props) {
  const { classes, data, onClick, label } = props;
  const [isDetail, setIsDetail] = useState(false);

  const handleClose = () => {
    setIsDetail(false);
  };
  return (
    <>
      <div className={classes.card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div style={{ width: "70%" }} onClick={() => setIsDetail(true)}>
            <Typography style={{ fontSize: 14, fontWeight: 600 }}>
              {data.title}
            </Typography>
          </div>

          <div>
            <div className={classes.buttonVoucher} onClick={onClick}>
              {label}
            </div>
          </div>
        </div>

        <div onClick={() => setIsDetail(true)}>
          <Divider style={{ margin: "10px 0px" }} />
        </div>

        <div onClick={() => setIsDetail(true)}>
          <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
            <Dompet />{" "}
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "#808080",
                marginLeft: 5
              }}
            >
              {data.minimumAmount === 0
                ? "Tanpa min.order"
                : `Min. order ${currencyFormatter.format(data.minimumAmount)} `}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
            <Expired />
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "#808080",
                marginLeft: 5
              }}
            >
              Berlaku sampai {moment(data.expiredAt.slice(0, 10)).format("ll")}
            </div>
          </div>
        </div>
      </div>

      <DialogDetail
        button="Tutup"
        open={isDetail}
        onClose={handleClose}
        content={
          <div className={classes.voucherWrapper}>
            <Typography className={classes.titleVoucher}>
              {data.title}
            </Typography>
            <div className={classes.voucherMessageWrapper}>
              <div
                style={{ display: "flex", alignItems: "center", marginTop: 5 }}
              >
                <Dompet />{" "}
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: "#808080",
                    marginLeft: 5
                  }}
                >
                  {data.minimumAmount === 0
                    ? "Tanpa min.order"
                    : `Min. order ${currencyFormatter.format(
                        data.minimumAmount
                      )} `}
                </div>
              </div>
              {data.maximumAmount !== 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 5
                  }}
                >
                  <Dompet />{" "}
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#808080",
                      marginLeft: 5
                    }}
                  >
                    Max. order {currencyFormatter.format(data.maximumAmount)}
                  </div>
                </div>
              )}

              <div
                style={{ display: "flex", alignItems: "center", marginTop: 5 }}
              >
                <Expired />
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: "#808080",
                    marginLeft: 5
                  }}
                >
                  Berlaku sampai{" "}
                  {moment(data.expiredAt.slice(0, 10)).format("ll")}
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", marginTop: 5 }}
              >
                <Maks />
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: "#808080",
                    marginLeft: 5
                  }}
                >
                  Diskon untuk {data.type === "SHIPPING" ? "ongkir" : "produk"}{" "}
                  {data.maximumDiscountAmount !== null &&
                    `s.d. ${currencyFormatter.format(
                      data.maximumDiscountAmount
                    )}`}
                </div>
              </div>
              {data.discountType === "PERCENTAGE" ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 5
                  }}
                >
                  <Big />
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#808080",
                      marginLeft: 5
                    }}
                  >
                    Diskon sebesar {data.amount}%
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 5
                  }}
                >
                  <Big />
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#808080",
                      marginLeft: 5
                    }}
                  >
                    Diskon sebesar {currencyFormatter.format(data.amount)}
                  </div>
                </div>
              )}
            </div>
            <div className={classes.syarat}>
              <div
                style={{
                  width: 5,
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                  backgroundColor:
                    process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                }}
              ></div>
              <div style={{ margin: "8px 10px", display: "flex" }}>
                <Info />
                <div
                  style={{
                    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                    fontSize: 10,
                    marginLeft: 10
                  }}
                >
                  Baca Syarat dan Ketentuan
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}

export default withTransaction("CardVoucher", "component")(CardVoucher);
