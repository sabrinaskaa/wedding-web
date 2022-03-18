/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "../../components/app-bar";
import { withTransaction } from "@elastic/apm-rum-react";
import CardVoucher from "../../components/card-voucher";
import { getUserVoucher } from "../../services/user";
import ContentLoader from "react-content-loader";
import KosongVector from "../../vector/kosong.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import { Typography, Button, Dialog } from "@material-ui/core";

function CustomerVoucher(props) {
  const intl = useIntl();
  const { classes } = props;
  const history = useHistory();
  const [vouchers, setVouchers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [dialog, setDialog] = useState(false);
  // eslint-disable-next-line
  const [totalData, setTotalData] = useState(0);
  const [nextPage, setNextPage] = useState(1);

  const getVouchers = async () => {
    await getUserVoucher()
      .then(res => {
        setVouchers(res.data.data);
        setIsLoading(false);
        setTotalPage(res?.data?.meta?.totalPage);
        setTotalData(res?.data?.meta?.totalData);
        setNextPage(res?.data?.meta?.page + 1);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getVouchers();
    setIsLoading(true);
  }, []);

  async function refetchVouchers() {
    const listVoucher = await getUserVoucher(nextPage);
    setTimeout(() => {
      setVouchers([...vouchers, ...listVoucher?.data?.data]);
      setIsLoading(false);
      setTotalPage(listVoucher?.data?.meta?.totalPage);
      setTotalData(listVoucher?.data?.meta?.totalData);
      setNextPage(listVoucher?.data?.meta?.page + 1);
    }, 1000);
  }

  const CardLoader = () => (
    <div style={{ padding: "0px 16px 0px 8px" }}>
      <ContentLoader
        speed={2}
        width={350}
        height={350}
        viewBox="0 0 350 350"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="7" y="19" rx="6" ry="6" width="95" height="95" />
        <rect x="115" y="18" rx="6" ry="6" width="256" height="25" />
        <rect x="114" y="55" rx="6" ry="6" width="256" height="25" />
        <rect x="249" y="90" rx="6" ry="6" width="118" height="25" />
        <rect x="116" y="90" rx="6" ry="6" width="118" height="25" />
        <rect x="7" y="139" rx="6" ry="6" width="95" height="95" />
        <rect x="115" y="138" rx="6" ry="6" width="256" height="25" />
        <rect x="114" y="175" rx="6" ry="6" width="256" height="25" />
        <rect x="249" y="210" rx="6" ry="6" width="118" height="25" />
        <rect x="116" y="210" rx="6" ry="6" width="118" height="25" />
        <rect x="8" y="261" rx="6" ry="6" width="95" height="95" />
        <rect x="116" y="260" rx="6" ry="6" width="256" height="25" />
        <rect x="115" y="297" rx="6" ry="6" width="256" height="25" />
        <rect x="250" y="332" rx="6" ry="6" width="118" height="25" />
        <rect x="117" y="332" rx="6" ry="6" width="118" height="25" />
        <rect x="8" y="261" rx="6" ry="6" width="95" height="95" />
        <rect x="116" y="260" rx="6" ry="6" width="256" height="25" />
        <rect x="115" y="297" rx="6" ry="6" width="256" height="25" />
        <rect x="250" y="332" rx="6" ry="6" width="118" height="25" />
        <rect x="117" y="332" rx="6" ry="6" width="118" height="25" />
      </ContentLoader>
    </div>
  );

  const handleSetVouchers = index => {
    localStorage.setItem("myVoucher", index);
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);

    history.push("/");
  };
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <AppBar
          title={`${intl.formatMessage({
            id: "voucher.voucherBar.requirements"
          })}`}
          goBack={true}
        />
        <CssBaseline />

        <div style={{ marginTop: 10, padding: "16px 16px" }}>
          {isLoading ? (
            <CardLoader />
          ) : (
            <>
              <InfiniteScroll
                dataLength={vouchers.length} //This is important field to render the next data
                next={refetchVouchers}
                hasMore={nextPage <= totalPage}
                loader={
                  <div style={{ width: "100%" }}>
                    <CardLoader />
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>
                      {""}
                      {intl.formatMessage({
                        id: "voucher.requirements.1.0"
                      })}
                    </b>
                  </p>
                }
              >
                {vouchers.map((item, index) => (
                  <div style={{ marginBottom: 16 }} key={index}>
                    <CardVoucher
                      data={item}
                      onClick={() => handleSetVouchers(item.id)}
                      label={`${intl.formatMessage({
                        id: "voucher.labelVoucher.requirements.1.0"
                      })}`}
                    />
                  </div>
                ))}
              </InfiniteScroll>

              {vouchers.length === 0 && (
                <div className={classes.notFoundWrapper}>
                  <img src={KosongVector} alt="not found" />
                  <h5>
                    {""}
                    {intl.formatMessage({
                      id: "voucher.requirements.2.0"
                    })}
                  </h5>
                </div>
              )}
            </>
          )}
        </div>

        <Dialog
          classes={{ paperFullScreen: classes.fullPaper }}
          fullScreen
          open={dialog}
          onClose={handleClose}
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
              {""}
              {intl.formatMessage({
                id: "voucher.requirements.3.0"
              })}
            </Typography>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.buttonError}
              style={{
                backgroundColor:
                  process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
              }}
              fullWidth
              onClick={handleClose}
            >
              OK
            </Button>
          </div>
        </Dialog>
      </Container>
    </React.Fragment>
  );
}

export default withTransaction("CustomerVoucher", "component")(CustomerVoucher);
