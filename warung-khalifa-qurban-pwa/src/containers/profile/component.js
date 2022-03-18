/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import firebase from "firebase/app";
import "firebase/auth";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar } from "@material-ui/core";
import { withTransaction } from "@elastic/apm-rum-react";
import profilBG from "../../vector/profilBG.svg";
import ArrowRight from "../../vector/arrowRight.js";
import { getBuildDate } from "../../utilities/clear-cache-utils";
import EditProfile from "../../vector/editProfile";
import Pesananku from "../../vector/pesananku";
import AlamatTersimpan from "../../vector/alamatTersimpan";
import Poinku from "../../vector/poinku";
import Voucherku from "../../vector/voucherku";
import CodeVoucher from "../../vector/codeVoucher";
// import Languange from "../../vector/languange";
import Privacy from "../../vector/privacy";
import Layanan from "../../vector/layanan";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { tenantInfo } from "../../services/vendor";
import { useIntl } from "react-intl";

function ProfileComponent(props) {
  const { classes, history } = props;
  const initialState = {
    data: {},
    user: {}
  };
  const intl = useIntl();
  const [state, setState] = useState(initialState);
  const [isVersion, setIsVersion] = useState("");
  const [configurePoint, setConfigurePoint] = useState(false);

  const tenantDetail = async () => {
    await tenantInfo()
      .then(res => setConfigurePoint(res.data.pointConfiguration.isEnabled))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const version = parseInt(localStorage.getItem("version"));
    setIsVersion(getBuildDate(version));
    async function fetchAPI() {
      const user = JSON.parse(localStorage.getItem("users"));
      const data = JSON.parse(localStorage.getItem("users"));
      setState({ ...state, user, data });
    }
    fetchAPI();
    tenantDetail();
    localStorage.removeItem("addressProfile");
  }, []);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.href = `/`;
        const selectedPasar = JSON.parse(localStorage.getItem("selectedPasar"));
        const firstOpen = JSON.parse(localStorage.getItem("firstOpen"));
        localStorage.setItem("first", false);
        localStorage.clear();
        localStorage.setItem("selectedPasar", JSON.stringify(selectedPasar));
        localStorage.setItem("firstOpen", JSON.stringify(firstOpen));
        localStorage.setItem("first", false);
      });
  };
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />

        <AppBar
          elevation={0}
          position="static"
          className={classes.appbar}
          divider
        >
          <Toolbar>
            <Grid item xs={12} className={classes.profilApp}>
              <Typography className={classes.textProfil}>
                <b
                  style={{
                    fontFamily:
                      process.env.REACT_APP_FONT_FAMILY || "Montserrat"
                  }}
                >
                  {""}
                  {intl.formatMessage({
                    id: "profile.navBar.requirements"
                  })}
                </b>
              </Typography>
              <Button
                disableRipple
                style={{
                  color: process.env.REACT_APP_COLOR_FONT || "#000000",
                  background: "#FFFFFF",
                  textTransform: "none",
                  fontSize: 16
                }}
              />
            </Grid>
          </Toolbar>
        </AppBar>

        <Paper
          elevation={0}
          style={{
            backgroundColor: "#FFFFFF"
          }}
          className={classes.root}
        >
          <Grid container spacing={0}>
            <Grid item xs={3} align="center" style={{ display: "flex" }}>
              <Avatar
                alt="Remy Sharp"
                src={state.data.photoURL ? state.data.photoURL : profilBG}
                className={classes.bigAvatar}
              />
            </Grid>
            <Grid
              item
              xs={7}
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <Typography className={classes.nama} align="left">
                <b style={{ fontSize: 16, fontWeight: 700 }}>
                  {/* {state.data.name ? state.data.name : "User"} */}
                  {state.data.name
                    ? state.data.name
                    : `${intl.formatMessage({
                        id: "profile.userTitle.requirements"
                      })}`}
                </b>
                {state.data.phone !== null && (
                  <p style={{ fontSize: 12, fontWeight: 400, marginBottom: 0 }}>
                    {state.data.phone}
                  </p>
                )}
                <p
                  style={{
                    fontSize: 10,
                    color: "#4E5356",
                    marginTop: 4,
                    marginBottom: 0
                  }}
                >
                  {state.data.email ? state.data.email : "User@email.com"}
                </p>
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <EditProfile />
            </Grid>
          </Grid>
        </Paper>

        <Paper
          elevation={0}
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: "3%",
            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)"
          }}
        >
          <List component="nav">
            <Typography
              style={{ fontSize: 14, fontWeight: 600, padding: "10px 14px" }}
            >
              {""}
              {intl.formatMessage({
                id: "profile.account.requirements.title.1.0"
              })}
            </Typography>
            <ListItem
              button
              style={{ padding: "20px 14px" }}
              onClick={() => history.push("/orders")}
            >
              <Pesananku />
              <div
                style={{
                  color: "#707585",
                  fontSize: 12,
                  fontWeight: 500,
                  marginLeft: 16
                }}
              >
                {""}
                {intl.formatMessage({
                  id: "profile.account.requirements.1.1"
                })}
              </div>
              <div style={{ position: "absolute", right: 20 }}>
                <ArrowRight />
              </div>
            </ListItem>
            <Divider variant="middle" />
            <ListItem
              button
              style={{ padding: "20px 14px" }}
              onClick={() => history.push("/profile/address")}
            >
              <AlamatTersimpan />
              <div
                style={{
                  color: "#707585",
                  fontSize: 12,
                  fontWeight: 500,
                  marginLeft: 16
                }}
              >
                {""}
                {intl.formatMessage({
                  id: "profile.account.requirements.1.2"
                })}
              </div>
              <div style={{ position: "absolute", right: 20 }}>
                <ArrowRight />
              </div>
            </ListItem>
            {configurePoint && (
              <>
                <Divider variant="middle" />
                <ListItem
                  button
                  style={{ padding: "20px 14px" }}
                  onClick={() => history.push("/profile/point")}
                >
                  <Poinku />
                  <div
                    style={{
                      color: "#707585",
                      fontSize: 12,
                      fontWeight: 500,
                      marginLeft: 16
                    }}
                  >
                    {""}
                    {intl.formatMessage({
                      id: "profile.account.requirements.1.5"
                    })}
                  </div>
                  <div
                    style={{
                      color: "#d1d1d1",
                      fontSize: 8,
                      fontWeight: 600,
                      position: "absolute",
                      right: 20,
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <ArrowRight />
                  </div>
                </ListItem>
              </>
            )}

            <Divider variant="middle" />
            <ListItem
              button
              style={{ padding: "20px 14px" }}
              onClick={() => history.push("/profile/vouchers")}
            >
              <Voucherku />
              <div
                style={{
                  color: "#707585",
                  fontSize: 12,
                  fontWeight: 500,
                  marginLeft: 16
                }}
              >
                {""}
                {intl.formatMessage({
                  id: "profile.account.requirements.1.3"
                })}
              </div>
              <div
                style={{
                  color: "#d1d1d1",
                  fontSize: 8,
                  fontWeight: 600,
                  position: "absolute",
                  right: 20,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <ArrowRight />
              </div>
            </ListItem>
            <Divider variant="middle" />
            <ListItem
              button
              style={{ padding: "20px 14px" }}
              onClick={() => history.push("/profile/redeem")}
            >
              <CodeVoucher />
              <div
                style={{
                  color: "#707585",
                  fontSize: 12,
                  fontWeight: 500,
                  marginLeft: 16
                }}
              >
                {""}
                {intl.formatMessage({
                  id: "profile.account.requirements.1.4"
                })}
              </div>
              <div style={{ position: "absolute", right: 20 }}>
                <ArrowRight />
              </div>
            </ListItem>
            {/* <Divider variant="middle" />
            <ListItem button style={{ padding: "20px 14px" }}>
              <Languange />
              <div
                style={{
                  color: "#707585",
                  fontSize: 12,
                  fontWeight: 500,
                  marginLeft: 16
                }}
              >
                Pilihan Bahasa
              </div>
              <div style={{ position: "absolute", right: 20 }}>
                <ArrowRight />
              </div>
            </ListItem> */}
          </List>
        </Paper>

        <Paper
          elevation={0}
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: "3%",
            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)"
          }}
        >
          <List component="nav">
            <Typography
              style={{ fontSize: 14, fontWeight: 600, padding: "10px 14px" }}
            >
              {""}
              {intl.formatMessage({
                id: "profile.another.requirements.title.1.0"
              })}
            </Typography>
            <ListItem
              button
              onClick={() => history.push("/privacy-policy")}
              style={{ padding: "20px 14px" }}
            >
              <Privacy />
              <div
                style={{
                  color: "#707585",
                  fontSize: 12,
                  fontWeight: 500,
                  marginLeft: 16
                }}
              >
                {""}
                {intl.formatMessage({
                  id: "profile.another.requirements.1.1"
                })}
              </div>
              <div style={{ position: "absolute", right: 20 }}>
                <ArrowRight />
              </div>
            </ListItem>
            <Divider variant="middle" />
            <ListItem
              button
              onClick={() => history.push("/term-of-use")}
              style={{ padding: "20px 14px" }}
            >
              <Layanan />
              <div
                style={{
                  color: "#707585",
                  fontSize: 12,
                  fontWeight: 500,
                  marginLeft: 16
                }}
              >
                {""}
                {intl.formatMessage({
                  id: "profile.another.requirements.1.2"
                })}{" "}
              </div>
              <div style={{ position: "absolute", right: 20 }}>
                <ArrowRight />
              </div>
            </ListItem>
            <Divider variant="middle" />

            <ListItem
              button
              onClick={() => history.push("/about-us")}
              style={{ padding: "20px 14px" }}
            >
              <StarBorderIcon />
              <div
                style={{
                  color: "#707585",
                  fontSize: 12,
                  fontWeight: 500,
                  marginLeft: 16
                }}
              >
                {""}
                {intl.formatMessage({
                  id: "profile.another.requirements.1.3"
                })}
              </div>

              <Typography className={classes.textVersi}>
                {process.env.REACT_APP_BRAND_NAME || "Srikopi"} v.
                {isVersion}
              </Typography>

              <div
                style={{
                  color: "#d1d1d1",
                  fontSize: 8,
                  fontWeight: 600,
                  position: "absolute",
                  right: 20,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <ArrowRight />
              </div>
            </ListItem>
            <Divider variant="middle" />

            <div style={{ padding: "70px 16px 24px" }}>
              <div onClick={signOut} className={classes.button}>
                {""}
                {intl.formatMessage({
                  id: "profile.signOut.requirements"
                })}
              </div>
            </div>
          </List>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default withTransaction(
  "ProfileComponent",
  "component"
)(ProfileComponent);
