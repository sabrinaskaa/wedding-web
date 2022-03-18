import React, { useEffect, useState } from "react";
import AppBar from "../../components/app-bar/component";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import firebase from "firebase/app";
import "firebase/auth";
import Divider from "@material-ui/core/Divider";
// import { locationById } from "../../services/vendor";
import Skeleton from "@material-ui/lab/Skeleton";
import { getCategoryFaq } from "../../services/faq";
import Fab from "../../components/wa-fab";
import info from "../../vector/info.svg";
import { withTransaction } from "@elastic/apm-rum-react";
import { useIntl } from "react-intl";

function Help(props) {
  const intl = useIntl();
  const phone = JSON.parse(localStorage.getItem("tenant"));
  const [state, setState] = useState({
    data: {}
  });
  console.log(state);
  // const [tenantInfo, setTenantInfo] = useState([]);
  const [categoryFaq, setCategoryFaq] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const data = firebase.auth().currentUser;
    setState({ data });
    const fetchFaq = async () => {
      const res = await getCategoryFaq();
      setCategoryFaq(res.data);
      if (res) {
        setLoading(false);
      }
    };
    // const fetchLocationById = async () => {
    //   const response = await locationById(waPhone.id);
    //   setTenantInfo(response.data);
    //   if (response) {
    //     setLoading(false);
    //   }
    // };
    // fetchLocationById();
    fetchFaq();
    setLoading(true);
  }, []);

  const getWaLink = () => {
    return `https://api.whatsapp.com/send?phone=${Number(
      phone.phone
    )}&text=${process.env.REACT_APP_WHATSAPP_TEXT_PREFIX || "Hai"} ${process.env
      .REACT_APP_BRAND_NAME || "Srikopi"}${process.env
      .REACT_APP_WHATSAPP_TEXT_SUFFIX || ", saya ingin bertanya"}`;
  };

  const { classes } = props;
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <AppBar
        title={`${intl.formatMessage({
          id: "helpCenter.requirements.1.0"
        })}`}
      />
      <Grid
        elevation={0}
        align="center"
        style={{
          background: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
          borderRadius: 0,
          color: process.env.REACT_APP_COLOR_FONT || "#000000",
          opacity: 0.7,
          paddingTop: 20,
          paddingBottom: 20
          // boxShadow:
          //   '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        }}
      >
        <Typography variant="h6" gutterBottom>
          <b>
            {""}
            {intl.formatMessage({
              id: "helpCenter.ask.requirements.1.0"
            })}
          </b>
        </Typography>
      </Grid>

      {loading ? (
        <div style={{ padding: 16 }}>
          <Skeleton
            variant="rect"
            height={40}
            animation="wave"
            className={classes.skeleton}
          />
          <Skeleton
            variant="rect"
            height={40}
            animation="wave"
            className={classes.skeleton}
          />
          <Skeleton
            variant="rect"
            height={40}
            animation="wave"
            className={classes.skeleton}
          />
          <Skeleton
            variant="rect"
            height={40}
            animation="wave"
            className={classes.skeleton}
          />
          <Skeleton
            variant="rect"
            height={40}
            animation="wave"
            className={classes.skeleton}
          />
        </div>
      ) : (
        <>
          {categoryFaq.map(data => (
            <Grid container spacing={0} className={classes.gridList}>
              <Grid item xs={12}>
                <Typography className={classes.textLixt}>
                  <b>{data.name}</b>
                </Typography>
                <Divider style={{ marginTop: "4%" }} />
              </Grid>

              {data.faqs.map(filter => (
                <Grid item xs={12} className={classes.what}>
                  <Link to={`help/${filter.id}`} className={classes.link}>
                    <Typography className={classes.textLixt}>
                      {filter.title}
                    </Typography>
                  </Link>
                  <Divider style={{ marginTop: "4%" }} />
                </Grid>
              ))}
            </Grid>
          ))}
        </>
      )}

      <Grid container spacing={0} className={classes.gridList}>
        <Grid item xs={12} className={classes.what}>
          <Typography className={classes.textLixt}>
            {""}
            {intl.formatMessage({
              id: "helpCenter.ask.requirements.2.1"
            })}
            <b>
              {""}
              {intl.formatMessage({
                id: "helpCenter.ask.requirements.2.2"
              })}
            </b>
            {""}
            {intl.formatMessage({
              id: "helpCenter.ask.requirements.2.3"
            })}
            <b>
              {""}
              {intl.formatMessage({
                id: "helpCenter.ask.requirements.2.4"
              })}
            </b>
            &nbsp;{""}
            {intl.formatMessage({
              id: "helpCenter.ask.requirements.2.5"
            })}
            <a
              target="_blank"
              rel="noreferrer"
              href={getWaLink()}
              style={{
                marginLeft: 6,
                color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                textDecoration: "none"
              }}
            >
              <b>
                {""}
                {intl.formatMessage({
                  id: "helpCenter.contactUs.requirements.1.0"
                })}
              </b>
            </a>
          </Typography>
        </Grid>
      </Grid>

      <Grid style={{ padding: 10 }} container spacing={0}>
        <Grid
          item
          xs={1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img src={info} alt="Info" />
        </Grid>
        <Grid item xs={11}>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            style={{ color: "#898B8C", fontWeight: "bold" }}
          >
            {""}
            {intl.formatMessage({
              id: "helpCenter.service.requirements.1.0"
            })}
          </Typography>
        </Grid>
      </Grid>
      <div style={{ marginLeft: "74%" }}>
        <a
          target="_blank"
          rel="noreferrer"
          href={getWaLink()}
          style={{
            color: process.env.REACT_APP_COLOR_FONT || "#000000",
            textDecoration: "none"
          }}
        >
          <Fab />
        </a>
      </div>
    </Container>
  );
}

export default withTransaction("Help", "component")(Help);
