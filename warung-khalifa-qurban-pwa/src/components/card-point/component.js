/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { withTransaction } from "@elastic/apm-rum-react";
import { Divider, Typography, Dialog, Button } from "@material-ui/core";
import Dompet from "../../vector/dompet";
import Expired from "../../vector/expired";
import currencyFormatter from "../../utilities/currency-formatter";
import moment from "moment";
import Maks from "../../vector/maks";
import Big from "../../vector/range";
import DialogDetail from "../../components/dialog";
import { buyReward } from "../../services/user";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import Info from "../../vector/information";

function CardPoint(props) {
  const { classes, data } = props;
  const [isDetail, setIsDetail] = useState(false);
  const [dialogError, setDialogError] = useState(false);
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const intl = useIntl();

  const handleClose = () => {
    setIsDetail(false);
  };

  const handleRedeem = () => {
    setDialogError(false);
    setDialogSuccess(false);
    if (dialogSuccess) {
      history.push("/profile/vouchers");
    }
  };

  return (
    <>
      <div className={classes.card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5
          }}
        >
          <div
            style={{ height: 70, width: 70 }}
            onClick={() => setIsDetail(true)}
          >
            <img
              src={data.image.url}
              height="70"
              width="70"
              style={{ borderRadius: 5 }}
              alt="poin"
            />
          </div>
          <div
            style={{
              width: "70%",
              padding: "0px 10px "
            }}
            onClick={() => setIsDetail(true)}
          >
            <Typography style={{ fontSize: 12, fontWeight: 600 }}>
              {data.title}
            </Typography>
            <Typography className={classes.description}>
              {data.description}
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
              }}
              onClick={() => setIsDetail(true)}
            >
              {data.priceInPoint} {""}
              {intl.formatMessage({
                id: "cardPoint.requirements.1.0"
              })}
            </Typography>
            <div
              className={classes.buttonVoucher}
              onClick={async () => {
                setIsDetail(false);
                await buyReward(data.id)
                  .then(res => {
                    setIsDetail(false);
                    if (res.data) {
                      setDialogSuccess(true);
                      setMessage(
                        `${intl.formatMessage({
                          id: "cardPoint.requirements.2.0"
                        })}`
                      );
                    }
                  })
                  .catch(err => {
                    setIsDetail(false);
                    if (
                      err.response.data.meta.errorCode ===
                      "INSUFFICIENT_POINT_BALANCE"
                    ) {
                      setDialogError(true);
                      setMessage(
                        `${intl.formatMessage({
                          id: "cardPoint.requirements.3.0"
                        })}`
                      );
                      return;
                    }
                    setMessage(err);
                  });
              }}
            >
              {""}
              {intl.formatMessage({
                id: "cardPoint.requirements.4.0"
              })}
            </div>
            <Typography
              style={{ fontSize: 8, fontWeight: 500, color: "#808080" }}
              onClick={() => setIsDetail(true)}
            >
              {""}
              {intl.formatMessage({
                id: "cardPoint.requirements.5.0"
              })}
            </Typography>
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
                ? `${intl.formatMessage({ id: "cardPoint.requirements.6.0" })}`
                : `${intl.formatMessage({
                    id: "cardPoint.requirements.7.0"
                  })} ${currencyFormatter.format(data.minimumAmount)} `}
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
              {""}
              {intl.formatMessage({
                id: "cardPoint.requirements.8.0"
              })}
              {moment(data.expiredAt.slice(0, 10)).format("ll")}
            </div>
          </div>
        </div>
      </div>

      <DialogDetail
        button={`${intl.formatMessage({ id: "voucherCart.requirements.9.0" })}`}
        push={async () => {
          setIsDetail(false);
          await buyReward(data.id)
            .then(res => {
              if (res.data) {
                setDialogSuccess(true);
                setMessage(
                  `${intl.formatMessage({
                    id: "voucherCart.requirements.10.0"
                  })}`
                );
              }
            })
            .catch(err => {
              if (
                err.response.data.meta.errorCode ===
                "INSUFFICIENT_POINT_BALANCE"
              ) {
                setDialogError(true);
                setMessage(
                  `${intl.formatMessage({
                    id: "voucherCart.requirements.11.0"
                  })}`
                );
                return;
              }
              setMessage(err);
            });
        }}
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
                    ? `${intl.formatMessage({
                        id: "voucherCart.requirements.6.0"
                      })}`
                    : `${intl.formatMessage({
                        id: "voucherCart.requirements.7.0"
                      })} ${currencyFormatter.format(data.minimumAmount)} `}
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
                    {""}
                    {intl.formatMessage({
                      id: "cardPoint.requirements.12.0"
                    })}
                    {currencyFormatter.format(data.maximumAmount)}
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
                  {""}
                  {intl.formatMessage({
                    id: "cardPoint.requirements.13.0"
                  })}{" "}
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
                  {""}
                  {intl.formatMessage({
                    id: "cardPoint.requirements.14.0"
                  })}
                  {data.type === "SHIPPING" ? "ongkir" : "produk"}{" "}
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
                    {""}
                    {intl.formatMessage({
                      id: "cardPoint.requirements.15.0"
                    })}
                    {data.amount}%
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
                    {""}
                    {intl.formatMessage({
                      id: "cardPoint.requirements.15.0"
                    })}
                    {currencyFormatter.format(data.amount)}
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
                  {""}
                  {intl.formatMessage({
                    id: "cardPoint.requirements.16.0"
                  })}
                </div>
              </div>
            </div>
          </div>
        }
      />

      <Dialog
        classes={{ paperFullScreen: classes.fullPaper }}
        fullScreen
        open={dialogError || dialogSuccess}
        onClose={handleRedeem}
      >
        <div style={{ marginTop: 10 }} align="center">
          <div
            style={{
              width: "15%",
              backgroundColor: "#f5f5f5",
              height: 4,
              borderRadius: 5,
              marginBottom: 20
            }}
          ></div>

          <Typography
            variant="caption"
            display="block"
            style={{ fontSize: 14, fontWeight: 600, padding: "20px 10px" }}
          >
            {message}
          </Typography>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.buttonError}
            style={{
              backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
            }}
            fullWidth
            onClick={handleRedeem}
          >
            OK
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export default withTransaction("CardPoint", "component")(CardPoint);
