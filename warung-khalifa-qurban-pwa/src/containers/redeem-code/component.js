/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import AppBar from "../../components/app-bar";
import {
  Paper,
  Container,
  CssBaseline,
  Typography,
  InputBase,
  CircularProgress,
  Slide,
  Dialog as BaseDialog
} from "@material-ui/core";
import addVoucher from "../../vector/addVoucher.svg";
import { useHistory } from "react-router-dom";
import { withTransaction } from "@elastic/apm-rum-react";
import { redeemCode } from "../../services/user";
import Dialog from "../../components/dialog";
import { useIntl } from "react-intl";
import currencyFormatter from "../../utilities/currency-formatter";
import { FormatListBulletedRounded } from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RedeemCode(props) {
  const intl = useIntl();
  const { classes } = props;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [data, setData] = useState([]);

  const handleRedeemCode = async () => {
    setIsLoading(true);
    const codeVoucher = { code: input };
    await redeemCode(codeVoucher)
      .then(res => {
        setData(res.data.data);
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch(err => {
        console.log(err.response.data.meta.message);
        setIsLoading(false);
        setIsError(true);
        setMessageError(err.response.data.meta.message);
        setErrorCode(err.response.data.meta.errorCode);
      });
  };

  const handleAmountValue = item => {
    if (item.discountType === "PERCENTAGE") {
      return `${item.amount}%`;
    }
    return `${currencyFormatter.format(item.amount)}`;
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setInput(localStorage.getItem("usedVoucher") || "");
  }, []);

  return (
    <React.Fragment>
      <BaseDialog open={isLoading} TransitionComponent={Transition}>
        <div style={{ padding: 10 }}>
          <CircularProgress />
        </div>
      </BaseDialog>

      <Container
        elevation={0}
        component="main"
        maxWidth="xs"
        className={classes.container}
      >
        <CssBaseline />
        <AppBar
          title={`${intl.formatMessage({
            id: "promo.titlePromo.requirements.1.0"
          })}`}
          goBack={true}
        />
        <Paper elevation={0} className={classes.body}>
          <img
            src={addVoucher}
            alt="addVoucher"
            className={classes.addVoucher}
          />
          <div className={classes.content}>
            <Typography
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 600
              }}
            >
              {""}
              {intl.formatMessage({
                id: "promo.requirements.1.0"
              })}
            </Typography>
            <Typography
              style={{
                marginTop: 16,
                fontSize: 12,
                fontWeight: 400,
                textAlign: "center"
              }}
            >
              {""}
              {intl.formatMessage({
                id: "promo.requirements.2.0"
              })}
            </Typography>
          </div>
          <div className={classes.searchWrapper}>
            <div className={classes.searchDiv}>
              <InputBase
                value={input}
                placeholder={`${intl.formatMessage({
                  id: "promo.promoPlaceholder.requirements.1.0"
                })}`}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={event => setInput(event.target.value.toUpperCase())}
              />
            </div>
          </div>
          <div
            style={{
              padding: "16px 16px 0px",
              position: "fixed",
              width: "100%",
              maxWidth: 444,
              bottom: 16
            }}
            onClick={handleRedeemCode}
          >
            <div
              className={classes.button}
              style={{
                backgroundColor:
                  input?.length > 0
                    ? process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                    : "#A6A6A6"
              }}
            >
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: process.env.REACT_APP_COLOR_FONT || "#000000"
                }}
              >
                {""}
                {intl.formatMessage({
                  id: "promo.submit.requirements.1.0"
                })}
              </Typography>
            </div>
          </div>
        </Paper>
      </Container>
      <Dialog
        button="OK"
        open={isSuccess || isError}
        onClose={() => {
          if (isSuccess) {
            history.push("/profile/vouchers");
            return;
          }
          setIsSuccess(false);
          setIsError(false);
        }}
        content={
          isError ? (
            <div className={classes.voucherErrorWrapper}>
              <Typography className={classes.titleVoucherError}>
                {""}
                {intl.formatMessage({
                  id: "promo.error.requirements.1.0"
                })}
              </Typography>
              <div className={classes.voucherMessageWrapper}>
                <ul style={{ fontSize: 12, paddingLeft: 25, margin: 0 }}>
                  <li>
                    {errorCode === "VOUCHER_INVALID_ERROR"
                      ? `${intl.formatMessage({ id: "promo.invalidError" })}`
                      : errorCode === "VOUCHER_EXPIRED_ERROR"
                      ? `${intl.formatMessage({ id: "promo.expiredError" })}`
                      : errorCode === "VOUCHER_USAGE_LIMIT_REACHED_ERROR"
                      ? `${intl.formatMessage({
                          id: "promo.usageLimitReached"
                        })}`
                      : errorCode === "VOUCHER_MIN_SPEND_LIMIT_NOT_MET_ERROR"
                      ? `${intl.formatMessage({
                          id: "promo.minSpendLimit"
                        })} ${messageError?.slice(38, -1)}.`
                      : errorCode === "VOUCHER_MAX_SPEND_LIMIT_MET_ERROR"
                      ? `${intl.formatMessage({
                          id: "promo.maxSpendLimit"
                        })} ${messageError?.slice(38, -1)}.`
                      : errorCode === "VOUCHER_RESTRICTED_EMAIL_ERROR"
                      ? `${intl.formatMessage({ id: "promo.restrictedEmail" })}`
                      : errorCode ===
                        "VOUCHER_APPLIED_INDIVIDUAL_USE_ONLY_ERROR"
                      ? `${intl.formatMessage({
                          id: "promo.appliedIndividualError"
                        })}`
                      : errorCode === "VOUCHER_NOT_APPLICABLE_ERROR"
                      ? `${intl.formatMessage({ id: "promo.notApplicable" })}`
                      : errorCode === "VOUCHER_NOT_ENABLE_ERROR"
                      ? `${intl.formatMessage({ id: "promo.notEnable" })}`
                      : ""}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div
              style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                marginBottom: 70
              }}
            >
              <Typography
                variant="caption"
                display="block"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center"
                }}
              >
                {""}
                {intl.formatMessage({
                  id: "promo.success.requirements.1.0"
                })}
              </Typography>
              <Typography
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  textAlign: "center"
                }}
              >
                {""}
                {intl.formatMessage({
                  id: "promo.requirements.3.0"
                })}{" "}
                {handleAmountValue(data)} {""}
                {intl.formatMessage({
                  id: "promo.requirements.4.0"
                })}
                {""}
                {intl.formatMessage({
                  id: "promo.requirements.5.0"
                })}
              </Typography>
            </div>
          )
        }
      />
    </React.Fragment>
  );
}
export default withTransaction("RedeemCode", "component")(RedeemCode);
