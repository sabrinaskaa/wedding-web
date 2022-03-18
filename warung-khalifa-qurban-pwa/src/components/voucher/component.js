import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useHistory, useLocation } from "react-router-dom";
import Voucher from "../../vector/voucher.svg";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Component(props) {
  const { classes } = props;
  const history = useHistory();
  const query = useQuery();
  const tabs = query.get("tabs");
  const user = JSON.parse(localStorage.getItem("users"));
  const color = process.env.REACT_APP_COLOR_PRIMARY || "#FFD101";
  const second = process.env.REACT_APP_COLOR_SECONDARY || "#FFE570";
  return (
    <React.Fragment>
      <div
        className={classes.root}
        onClick={e => {
          const isValid = props.click();
          if (isValid) {
            if (e.target.id !== "remove") {
              if (user && tabs === "1") {
                history.push("/cart-shipment/vouchers?tabs=1");
              }
              if (user && tabs !== "1") {
                history.push("/cart-shipment/vouchers?tabs=0");
              }
              if (!user && tabs === "1") {
                history.push("/cart-shipment/voucher?tabs=1");
              }
              if (!user && tabs !== "1") {
                history.push("/cart-shipment/voucher?tabs=0");
              }
            }
          }
        }}
      >
        <Card
          className={classes.card}
          elevation={0}
          style={{
            background: `linear-gradient(to right, ${color}, ${second})`
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={1}>
              <img src={Voucher} alt="voucher" />
            </Grid>
            <Grid item xs={7}>
              <Typography className={classes.content}>
                {props.content}
              </Typography>
            </Grid>
            <Grid item xs={4} className={classes.buttonWrapper}>
              {props.remove && (
                <div
                  className={classes.button}
                  style={{ background: props.buttonColor, marginRight: 10 }}
                  id={props.id}
                  onClick={e => {
                    localStorage.removeItem("usedVoucher");
                    props.remove();
                  }}
                >
                  {props.remove && (
                    <Typography id="remove" className={classes.buttonText}>
                      Hapus
                    </Typography>
                  )}
                </div>
              )}

              <div
                className={classes.button}
                style={{ background: props.buttonColor }}
              >
                <Typography className={classes.buttonText}>
                  {props.buttonContent}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    </React.Fragment>
  );
}

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Component;
