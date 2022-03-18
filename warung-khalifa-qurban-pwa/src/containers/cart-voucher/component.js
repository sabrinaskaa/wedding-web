/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withTransaction } from "@elastic/apm-rum-react";
import CardVoucher from "../../components/card-voucher";
import { getUserVoucher } from "../../services/user";
import ContentLoader from "react-content-loader";
import KosongVector from "../../vector/kosong.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import BackButton from "@material-ui/icons/ArrowBackIos";
import AppBar from "@material-ui/core/AppBar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useHistory, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CartVoucher(props) {
  const intl = useIntl();
  const { classes } = props;
  const [vouchers, setVouchers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  // eslint-disable-next-line
  const [totalData, setTotalData] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const query = useQuery();
  const history = useHistory();
  const tabs = query.get("tabs");

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
    localStorage.setItem("isUsed", "true");
    if (tabs === "0") {
      history.push("/cart-shipment?tabs=0");
    }
    if (tabs === "1") {
      history.push("/cart-shipment?tabs=1");
    }
  };

  const handleNextPage = () => {
    if (tabs === "0") {
      history.push("/cart-shipment/voucher?tabs=0");
    }
    if (tabs === "1") {
      history.push("/cart-shipment/voucher?tabs=1");
    }
  };

  const handleBackPage = () => {
    if (tabs === "0") {
      history.push("/cart-shipment?tabs=0");
    }
    if (tabs === "1") {
      history.push("/cart-shipment?tabs=1");
    }
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <AppBar
          style={{
            width: "100%",
            maxWidth: 444,
            backgroundColor: "white",
            padding: 16,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)"
          }}
          classes={{ positionFixed: classes.appBar }}
          elevation={1}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <BackButton
              style={{
                color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                cursor: "pointer",
                marginRight: 10
              }}
              onClick={handleBackPage}
            />

            <strong style={{ color: "black" }}>
              {""}
              {intl.formatMessage({
                id: "voucherCart.requirements.1.0"
              })}
            </strong>
          </div>
          <div className={classes.searchDiv} onClick={handleNextPage}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={`${intl.formatMessage({
                id: "voucherCart.requirements.2.0"
              })}`}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              InputProps={{
                "aria-label": "search"
              }}
            />
          </div>
        </AppBar>

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
                        id: "voucherCart.requirements.3.0"
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
                      label="Pakai"
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
                      id: "voucherCart.requirements.4.0"
                    })}
                  </h5>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </React.Fragment>
  );
}

export default withTransaction("CartVoucher", "component")(CartVoucher);
