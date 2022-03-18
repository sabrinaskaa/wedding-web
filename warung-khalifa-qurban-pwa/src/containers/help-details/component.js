import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import AppBar from "../../components/app-bar";
import smile from "../../vector/smile.svg";
import sad from "../../vector/sad.svg";
import info from "../../vector/info.svg";
import Fab from "../../components/wa-fab";
import { getFaqById } from "../../services/faq";
import { withTransaction } from "@elastic/apm-rum-react";

function HelpDetail(props) {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [tenantInfo, setTenantInfo] = useState([]);
  const phone = JSON.parse(localStorage.getItem("tenant"));

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getFaqById(props.match.params.id);
      setDetail(response.data);
      if (response) {
        setLoading(false);
      }
    };
    // const fetchTenantInfo = async () => {
    //   const res = await locationById(waPhone.id);
    //   setTenantInfo(res.data);
    //   if (res) {
    //     setLoading(false);
    //   }
    // };
    fetchApi();
    // fetchTenantInfo();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState({
    feedback: false
  });

  const { classes } = props;

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <AppBar title="Detail Bantuan" goBack divider />
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
            height={150}
            animation="wave"
            className={classes.skeleton}
          />
        </div>
      ) : (
        <>
          <Grid item xs={12} className={classes.question}>
            <Typography className={classes.textQuestion}>
              <b>{detail.title}</b>
            </Typography>
          </Grid>

          <Grid
            container
            spacing={0}
            className={classes.textContainer}
            align="center"
          >
            <Grid item xs={12}>
              <Typography
                className={classes.textQuestion}
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{ __html: detail.body }}
              />
            </Grid>
          </Grid>
        </>
      )}

      {state.feedback === false ? (
        <Grid
          container
          spacing={0}
          className={classes.textContainerTwo}
          align="center"
        >
          <Grid item xs={12}>
            <Typography className={classes.textQuestion}>
              Apakah penjelasan ini membantu?
            </Typography>
          </Grid>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: 15
              }}
            >
              <Skeleton
                variant="circle"
                width={50}
                height={50}
                style={{ marginRight: 20 }}
              />
              <Skeleton variant="circle" width={50} height={50} />
            </div>
          ) : (
            <Grid container spacing={0} style={{ marginTop: "4%" }}>
              <Grid item xs={6} style={{ paddingLeft: "34%" }}>
                <img
                  onClick={() => setState({ feedback: true })}
                  src={smile}
                  alt="Smile"
                />
              </Grid>
              <Grid item xs={6} style={{ paddingRight: "34%" }}>
                <img
                  onClick={() => setState({ feedback: true })}
                  src={sad}
                  alt="Sad"
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      ) : (
        <>
          <Grid
            container
            spacing={0}
            className={classes.textContainerTwo}
            align="center"
          >
            <Grid item xs={12} className={classes.bg}>
              <Typography className={classes.textQuestion}>
                Terima kasih atas masukan kamu
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={0} className={classes.textContainerTwo}>
            <Grid item xs={12}>
              <Typography className={classes.textQuestion}>
                Masih <b>butuh bantuan</b> atau <b>punya pertanyaan lain </b>
                yang ingin ditanyakan?{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://api.whatsapp.com/send?phone=${Number(
                    phone.phone
                  )}&text=Hai ${process.env.REACT_APP_BRAND_NAME ||
                    "Srikopi"}, mau tanya dong`}
                  style={{
                    marginLeft: 6,
                    color: process.env.REACT_APP_COLOR_FONT || "#000000",
                    textDecoration: "none"
                  }}
                >
                  <b>HUBUNGI KAMI</b>
                </a>
              </Typography>
            </Grid>
          </Grid>

          <div style={{ paddingTop: "3%" }}>
            <Grid style={{ padding: 5 }} container spacing={0}>
              <Grid align="center" item xs={1}>
                <img src={info} alt="Info" />
              </Grid>
              <Grid item xs={11}>
                <Typography
                  style={{ color: "#898B8C" }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  <b>
                    Layanan pelanggan 24 jam, Senin sampai Minggu (tidak
                    termasuk libur nasional)
                  </b>
                </Typography>
              </Grid>
            </Grid>
          </div>
        </>
      )}
      <div style={{ marginLeft: "74%" }}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://api.whatsapp.com/send?phone=${Number(
            phone.phone
          )}&text=${process.env.REACT_APP_WHATSAPP_TEXT_PREFIX ||
            "Hai"} ${process.env.REACT_APP_BRAND_NAME || "Srikopi"}${process.env
            .REACT_APP_WHATSAPP_TEXT_SUFFIX || ", saya ingin bertanya"}`}
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

export default withTransaction("HelpDetail", "component")(HelpDetail);
