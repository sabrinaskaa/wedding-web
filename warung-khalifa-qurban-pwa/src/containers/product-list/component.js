/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import AppBar from "../../components/app-bar";
import CustomAppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ProductItem from "../../components/product-item";
import Paper from "@material-ui/core/Paper";
import ContentLoader from "react-content-loader";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  getProductbyCategories,
  getProductCategories
} from "../../services/products";
import Fab from "../../components/fab";
import { withTransaction } from "@elastic/apm-rum-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CartContext } from "../../context/cart";
import { useIntl } from "react-intl";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
    }
  }
});

const MyLoader = () => (
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
    </ContentLoader>
  </div>
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

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

function ProductList(props) {
  const { cart } = useContext(CartContext);
  const { classes } = props;
  const intl = useIntl();

  const fabStyle = () => {
    if (cart.length > 0) {
      return { paddingBottom: 70 };
    }
  };

  const initialState = {
    categoryIndex: 0,
    categories: [],
    products: [],
    productsFiltered: [],
    categoryId: props.match.params.id ? props.match.params.id : null,
    isLoading: true,
    selectedPasar: JSON.parse(localStorage.getItem("selectedPasar")),
    totalData: 0,
    totalPage: 0,
    nextPage: 1
  };

  const [state, setState] = useState(initialState);

  async function refetchProduct() {
    const products = await getProductbyCategories(
      state.categoryId,
      state.nextPage
    );
    setTimeout(() => {
      setState({
        ...state,
        products: [...state.products, ...products?.data],
        isLoading: false,
        totalPage: products?.meta?.totalPage,
        totalData: products?.meta?.totalData,
        nextPage: products?.meta?.page + 1
      });
    }, 1000);
  }

  useEffect(() => {
    async function fetchAPI() {
      const categories = await getProductCategories();
      const categoryId = props.match.params.id;

      let categoryIndex = 0;

      setState({
        ...state,
        categories: categories
      });

      categoryIndex = await getCategoryIndex(categoryId, categories);

      if (categoryIndex === -1) {
        const categoryId = props.match.params.id;
        categoryIndex = await getCategoryIndex(categoryId, categories);
        setState({
          ...state,
          categoryIndex: categoryIndex,
          categoryId: categoryId
        });
      }

      const products = await getProductbyCategories(categoryId, state.nextPage);

      setState({
        ...state,
        categories: categories,
        categoryId: categoryId,
        products: products?.data,
        categoryIndex: categoryIndex,
        isLoading: false,
        totalPage: products?.meta?.totalPage,
        totalData: products?.meta?.totalData,
        nextPage: products?.meta?.page + 1
      });
    }
    fetchAPI();
  }, []);

  const getCategoryIndex = async (categoryId, categories) => {
    const categoryIndex = await categories.findIndex(category => {
      return category.id === categoryId;
    });
    return categoryIndex;
  };

  const getProducts = async categoryId => {
    const response = await getProductbyCategories(categoryId, "1");

    const products = response;
    return products;
  };

  const handleChange = async (event, index) => {
    if (state.categoryIndex === index) {
      return;
    }

    await setState({
      ...state,
      categoryIndex: index,
      isLoading: true
    });

    const Id = state.categories[index].id;

    const res = await getProducts(Id);
    props.history.push(`/category/${Id}`);
    setState({
      ...state,
      products: res.data,
      categoryIndex: index,
      categoryId: Id,
      isLoading: false,
      totalPage: res?.meta?.totalPage,
      totalData: res?.meta?.totalData,
      nextPage: res?.meta?.page + 1
    });
  };

  return (
    <React.Fragment>
      <Container
        component="main"
        maxWidth="xs"
        className={classes.container}
        style={fabStyle()}
      >
        <CssBaseline />
        <Grid item xs={12} className={classes.appbarWrapper}>
          <AppBar title="Select Product" goBack={true} search />
          <CustomAppBar
            elevation={0}
            position="static"
            className={classes.cusappbar}
            style={{ backgroundColor: "white", color: "black" }}
          >
            <ThemeProvider theme={theme}>
              <Tabs
                value={state.categoryIndex}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="on"
                aria-label="scrollable force tabs example"
              >
                {state.categories.map(category => {
                  return (
                    <Tab
                      key={category.id}
                      className={classes.tab}
                      label={category.name}
                      classes={{ root: classes.tabCustom }}
                    />
                  );
                })}
              </Tabs>
            </ThemeProvider>
          </CustomAppBar>
        </Grid>
        <Paper elevation={0} className={classes.paper}>
          <Grid container className={classes.grid}>
            {state.isLoading ? (
              <div style={{ width: "100%" }}>
                <MyLoader />
              </div>
            ) : (
              <>
                {state.products.length === 0 ? (
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
                    {/* <img
                        style={{ marginBottom: 20, marginTop: 40 }}
                        src={kosong}
                      /> */}

                    <center>
                      <Typography
                        style={{ padding: 10, width: "70%" }}
                        display="block"
                        gutterBottom
                        variant="caption"
                      >
                        {intl.formatMessage({ id: "product.empty" })}
                      </Typography>
                    </center>
                  </Grid>
                ) : (
                  <div
                    style={{
                      width: "100%"
                    }}
                  >
                    <InfiniteScroll
                      dataLength={state.products.length} //This is important field to render the next data
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
                      {state.products.map((product, index) => {
                        return (
                          <Grid
                            xs={12}
                            item
                            key={index}
                            style={{
                              padding: "0px 16px",
                              backgroundColor: "#FAFAFA"
                            }}
                          >
                            <ProductItem key={index} product={product} />
                          </Grid>
                        );
                      })}
                    </InfiniteScroll>
                  </div>
                )}
              </>
            )}
          </Grid>
        </Paper>
        {cart && cart.length > 0 && <Fab to="/cart?from=/category/107" />}
      </Container>
    </React.Fragment>
  );
}

export default withTransaction("ProductList", "component")(ProductList);
