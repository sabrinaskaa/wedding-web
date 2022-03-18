/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import AppBar from "../../components/app-bar";
import CardOrder from "../../components/card-order";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import ContentLoader from "react-content-loader";
import { getOrdersHistory } from "../../services/orders";
import Kosong from "../../vector/transaksikosong.svg";
import { Grid } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroller";
import Skeleton from "@material-ui/lab/Skeleton";
import { withTransaction } from "@elastic/apm-rum-react";
import { useIntl } from "react-intl";

const MyLoader = () => (
  <ContentLoader
    height={375}
    width={400}
    speed={1}
    primaryColor="#ededed"
    secondaryColor="#d1d1d1"
  >
    <rect x="13" y="31" rx="5" ry="5" width="368" height="72" />
    <rect x="14" y="117" rx="5" ry="5" width="368" height="72" />
    <rect x="14" y="204" rx="5" ry="5" width="228" height="72" />
    <rect x="14" y="292" rx="5" ry="5" width="172" height="44" />
  </ContentLoader>
);

const MyLoader2 = () => (
  <ContentLoader
    height={100}
    width={400}
    speed={1}
    primaryColor="#ededed"
    secondaryColor="#d1d1d1"
  >
    <rect x="13" y="31" rx="5" ry="5" width="368" height="72" />
  </ContentLoader>
);

function OrderHistories(props) {
  const initialState = {
    orders: [],
    isLoading: true,
    page: 1,
    hasMore: true,
    infiniteLoading: false
  };
  const [state, setState] = useState(initialState);
  const intl = useIntl();

  useEffect(() => {
    async function fetchAPI() {
      // const users = JSON.parse(localStorage.getItem("users"));
      // const email = users.email;
      const response = await getOrdersHistory(state.page);
      const res = response.data.data;
      // orders.sort((a, b) => (a.status > b.status ? 1 : -1));

      if (res.length > 9) {
        setState({
          ...state,
          orders: res,
          isLoading: false,
          page: state.page + 1,
          hasMore: true,
          infiniteLoading: false
        });
      } else {
        setState({
          ...state,
          orders: res,
          isLoading: false,
          page: state.page,
          hasMore: false,
          infiniteLoading: false
        });
      }
    }
    fetchAPI();
  }, []);

  const { classes } = props;
  window.onscroll = function(ev) {
    handleLoadMore();
  };
  const handleLoadMore = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      state.hasMore === true
    ) {
      setState({
        ...state,
        hasMore: false,
        infiniteLoading: true
      });
      // const users = JSON.parse(localStorage.getItem("users"));
      // const email = users.email;
      const response = await getOrdersHistory(state.page);
      const res = response.data.data;
      let newOrders = [...state.orders, ...response.data.data];

      // newOrders.sort((a, b) => (a.status > b.status ? 1 : -1));

      if (res.length > 9) {
        setState({
          ...state,
          orders: newOrders,
          isLoading: false,
          page: state.page + 1,
          hasMore: true,
          infiniteLoading: false
        });
      } else {
        setState({
          ...state,
          orders: newOrders,
          isLoading: false,
          page: state.page,
          hasMore: false,
          infiniteLoading: false
        });
      }
    }
  };
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            title={`${intl.formatMessage({
              id: "transactionHistory.requirements.1.0"
            })}`}
            goBack={true}
          />

          <Paper elevation={0} className={classes.paper}>
            <div align="center">
              {state.isLoading ? (
                <MyLoader />
              ) : (
                <React.Fragment>
                  {state.orders.length === 0 && (
                    <React.Fragment>
                      <Grid
                        container
                        style={{
                          flexDirection: "column",
                          display: "flex",
                          alignItems: "center",
                          paddingTop: 100
                        }}
                      >
                        <img
                          src={Kosong}
                          style={{ marginBottom: 40 }}
                          alt="Empty"
                        />
                        <Typography
                          variant="subtitle1"
                          display="block"
                          gutterBottom
                          style={{ fontSize: 16, fontWeight: 600 }}
                        >
                          <b>
                            {" "}
                            {intl.formatMessage({
                              id: "transaction.requirements.1.0"
                            })}
                          </b>
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{ fontSize: 12, fontWeight: 400 }}
                        >
                          {" "}
                          {intl.formatMessage({
                            id: "transaction.requirements.2.0"
                          })}
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  )}
                  <ListOrders
                    orders={state.orders}
                    loadMore={handleLoadMore}
                    pageStart={state.page}
                    hasMore={state.hasMore}
                  />
                  {state.hasMore || (state.infiniteLoading && <MyLoader2 />)}
                </React.Fragment>
              )}
            </div>
          </Paper>
        </div>
      </Container>
    </React.Fragment>
  );
}

const ListOrders = props => (
  <React.Fragment>
    <InfiniteScroll
      pageStart={props.pageStart}
      loadMore={props.loadMore}
      hasMore={props.hasMore}
      loader={<Skeleton variant="rect" width={"100%"} height={50} />}
    >
      {props.orders?.map(order => {
        return <CardOrder key={order.id} order={order} />;
      })}
    </InfiniteScroll>
  </React.Fragment>
);

export default withTransaction("OrderHistories", "component")(OrderHistories);
