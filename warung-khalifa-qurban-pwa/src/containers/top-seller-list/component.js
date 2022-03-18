/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ContentLoader from "react-content-loader";
import { Divider, Typography } from "@material-ui/core";
// import TopSeller from "../../components/top-seller";
import CardProduct from "../../components/card-product";
import Fab from "../../components/fab";
import AppBar from "../../components/app-bar";
import { getProductTopSellers } from "../../services/products";
import { withTransaction } from "@elastic/apm-rum-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CartContext } from "../../context/cart";
import topSeller from "../../components/top-seller";
import kosong from "../../vector/kosong.svg";

const MyLoader = () => (
  <ContentLoader
    height={500}
    width={400}
    speed={1}
    primaryColor="#ededed"
    secondaryColor="#d1d1d1"
  >
    <rect x="16" y="16" rx="0" ry="0" width="84" height="84" />
    <rect x="116" y="16" rx="0" ry="0" width="190" height="16" />
    <rect x="116" y="40" rx="0" ry="0" width="105" height="16" />
    <rect x="116" y="74" rx="0" ry="0" width="74" height="25" />
    <rect x="295" y="74" rx="0" ry="0" width="90" height="25" />

    <rect x="16" y="120" rx="0" ry="0" width="84" height="84" />
    <rect x="116" y="120" rx="0" ry="0" width="190" height="16" />
    <rect x="116" y="144" rx="0" ry="0" width="105" height="16" />
    <rect x="116" y="178" rx="0" ry="0" width="74" height="25" />
    <rect x="295" y="178" rx="0" ry="0" width="90" height="25" />

    <rect x="16" y="224" rx="0" ry="0" width="84" height="84" />
    <rect x="116" y="224" rx="0" ry="0" width="190" height="16" />
    <rect x="116" y="248" rx="0" ry="0" width="105" height="16" />
    <rect x="116" y="282" rx="0" ry="0" width="74" height="25" />
    <rect x="295" y="282" rx="0" ry="0" width="90" height="25" />

    <rect x="16" y="328" rx="0" ry="0" width="84" height="84" />
    <rect x="116" y="328" rx="0" ry="0" width="190" height="16" />
    <rect x="116" y="352" rx="0" ry="0" width="105" height="16" />
    <rect x="116" y="386" rx="0" ry="0" width="74" height="25" />
    <rect x="295" y="386" rx="0" ry="0" width="90" height="25" />
  </ContentLoader>
);

const MySimpleLoader = () => (
  <div style={{ padding: "0px 16px 0px 8px" }}>
    <ContentLoader
      speed={2}
      width={350}
      height={150}
      viewBox="0 0 350 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="7" y="19" rx="6" ry="6" width="95" height="95" />
      <rect x="115" y="18" rx="6" ry="6" width="256" height="25" />
      <rect x="114" y="55" rx="6" ry="6" width="256" height="25" />
      <rect x="249" y="90" rx="6" ry="6" width="118" height="25" />
      <rect x="116" y="90" rx="6" ry="6" width="118" height="25" />
    </ContentLoader>
  </div>
);

function TopSellerProductList(props) {
  const { cart } = useContext(CartContext);
  const [state, setState] = useState({
    topSeller: [],
    isLoading: true,
    selectedPasar: JSON.parse(localStorage.getItem("selectedPasar")),
    totalData: 0,
    totalPage: 0,
    nextPage: 1
  });

  async function refetchProduct() {
    const vendorId = state.selectedPasar.id;
    const res = await getProductTopSellers(vendorId, state.nextPage);
    setTimeout(() => {
      setState({
        ...state,
        topSeller: [...state.topSeller, ...res.data],
        isLoading: false,
        totalPage: res?.meta?.totalPage,
        totalData: res?.meta?.totalData,
        nextPage: res?.meta?.page + 1
      });
    }, 1000);
  }

  useEffect(() => {
    const fetchData = async () => {
      const vendorId = state.selectedPasar.id;
      const topSeller = await getProductTopSellers(vendorId, state.nextPage);

      setState({
        ...state,
        topSeller: topSeller?.data,
        isLoading: false,
        totalPage: topSeller?.meta?.totalPage,
        totalData: topSeller?.meta?.totalData,
        nextPage: topSeller?.meta?.page + 1
      });
    };
    fetchData();
  }, []);

  const botSendError = error => {
    axios.get("https://api.muctool.de/whois").then(response => {
      const { data } = response;
      axios.post(
        "https://api.telegram.org/bot861570655:AAHWhNqltmMKFnhQRt-QHr34BSz-4AeuFUs/sendMessage",
        {
          chat_id: -312868350,
          text: `!!! GET TOP SELLER !!! : 
  Message: ${JSON.stringify(error.message)}
  Name: ${JSON.stringify(error.name)}
  Stack: ${JSON.stringify(error.stack)}
  Url: ${JSON.stringify(error.config.url)}
  Method: ${JSON.stringify(error.config.method)}
  TransformRequest: ${JSON.stringify(error.config.transformRequest)}
  TransformResponse: ${JSON.stringify(error.config.transformResponse)}
  
  !! IDENTITY !!:
  Ip: ${JSON.stringify(data.ip)}
  Isp: ${JSON.stringify(data.isp)}
  Country: ${JSON.stringify(data.country)}
  Browser: ${navigator.userAgent}`
        }
      );
    });
  };

  const { classes } = props;
  const fabStyle = () => {
    if (cart.length > 0) {
      return { paddingBottom: 86, background: "#fafafa" };
    }
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <AppBar title="Produk Terlaris" goBackHome select />
        <Paper elevation={0} className={classes.paper}>
          <Grid container className={classes.grid} style={fabStyle()}>
            {state.isLoading ? (
              <div style={{ width: "100%" }}>
                <MyLoader />
              </div>
            ) : (
              <>
                {state.topSeller.length === 0 ? (
                  <Grid
                    align="center"
                    item
                    xs={12}
                    style={{
                      backgroundColor: "#FAFAFA",
                      height: "75vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column"
                    }}
                  >
                    <img
                      style={{ marginBottom: 20, marginTop: 40 }}
                      src={kosong}
                      alt="kosong"
                    />

                    <center>
                      <Typography
                        style={{ padding: 10, width: "70%" }}
                        display="block"
                        gutterBottom
                        variant="caption"
                      >
                        Item sedang kosong / tidak tersedia sekarang. Tunggu
                        beberapa hari lagi.
                      </Typography>
                    </center>
                  </Grid>
                ) : (
                  <div style={{ width: "100%" }}>
                    <InfiniteScroll
                      dataLength={state.topSeller.length} //This is important field to render the next data
                      next={refetchProduct}
                      hasMore={state.nextPage <= state.totalPage}
                      loader={
                        <div style={{ width: "100%" }}>
                          <MySimpleLoader />
                        </div>
                      }
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                      // // below props only if you need pull down functionality
                      // refreshFunction={this.refresh}
                      // pullDownToRefresh
                      // pullDownToRefreshThreshold={50}
                      // pullDownToRefreshContent={
                      //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                      // }
                      // releaseToRefreshContent={
                      //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                      // }
                    >
                      {state.topSeller.map(top => (
                        <Grid key={top} item xs={12}>
                          {/* <TopSeller top={top} topSeller /> */}
                          <CardProduct top={top} topSeller />
                        </Grid>
                      ))}
                    </InfiniteScroll>
                  </div>
                )}
              </>
            )}
          </Grid>
          <div>
            <Fab to="/cart?from=/top-seller" />
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default withTransaction(
  "TopSellerProductList",
  "component"
)(TopSellerProductList);
