/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import BackButton from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import ContentLoader from "react-content-loader";
import Typography from "@material-ui/core/Typography";
import { withTransaction } from "@elastic/apm-rum-react";
import silang from "../../vector/silang.svg";
import { getProductbyKeyword } from "../../services/products";
import ProductItem from "../../components/product-item";
import Fab from "../../components/fab";
import { useIntl } from "react-intl";

const MyLoader = () => (
  <ContentLoader
    height={500}
    width={400}
    speed={1}
    primaryColor="#ededed"
    secondaryColor="#d1d1d1"
  >
    <rect x="13" y="11" rx="0" ry="0" width="260" height="21" />
    <rect x="13" y="44" rx="0" ry="0" width="84" height="75" />
    <rect x="106" y="44" rx="0" ry="0" width="106" height="12" />
    <rect x="108" y="71" rx="0" ry="0" width="183" height="11" />
    <rect x="108" y="95" rx="0" ry="0" width="74" height="18" />
    <rect x="305" y="72" rx="0" ry="0" width="85" height="40" />
    <rect x="14" y="137" rx="0" ry="0" width="84" height="75" />
    <rect x="109" y="137" rx="0" ry="0" width="106" height="12" />
    <rect x="111" y="165" rx="0" ry="0" width="183" height="11" />
    <rect x="112" y="191" rx="0" ry="0" width="74" height="18" />
    <rect x="307" y="164" rx="0" ry="0" width="85" height="40" />
    <rect x="14" y="226" rx="0" ry="0" width="84" height="75" />
    <rect x="111" y="224" rx="0" ry="0" width="106" height="12" />
    <rect x="111" y="256" rx="0" ry="0" width="183" height="11" />
    <rect x="113" y="280" rx="0" ry="0" width="74" height="18" />
    <rect x="306" y="256" rx="0" ry="0" width="85" height="40" />
    <rect x="15" y="315" rx="0" ry="0" width="84" height="75" />
    <rect x="109" y="316" rx="0" ry="0" width="106" height="12" />
    <rect x="111" y="344" rx="0" ry="0" width="183" height="11" />
    <rect x="110" y="367" rx="0" ry="0" width="74" height="18" />
    <rect x="306" y="338" rx="0" ry="0" width="85" height="40" />
    <rect x="16" y="404" rx="0" ry="0" width="84" height="75" />
    <rect x="113" y="403" rx="0" ry="0" width="106" height="12" />
    <rect x="112" y="428" rx="0" ry="0" width="183" height="11" />
    <rect x="113" y="458" rx="0" ry="0" width="74" height="18" />
    <rect x="304" y="433" rx="0" ry="0" width="85" height="40" />
  </ContentLoader>
);

function ProductSearch(props) {
  const initialState = {
    products: [],
    isLoading: false,
    error: null,
    call: null,
    isSearchChanged: false,
    selectedPasar: JSON.parse(localStorage.getItem("selectedPasar")),
    kosong: false
  };
  const intl = useIntl();
  const [state, setState] = useState(initialState);
  const [keyword, setKeyword] = useState("");
  const { classes } = props;
  const cartItems = localStorage.getItem("cart");

  const getProducts = async inputKeyword => {
    const vendorId = state.selectedPasar.id;
    const response = await getProductbyKeyword(inputKeyword, vendorId);
    return response;
  };

  useEffect(() => {
    if (keyword === "") {
      setState({
        ...state,
        products: [],
        kosong: false,
        isLoading: false
      });
    }

    const timer = setTimeout(() => {
      async function Searched() {
        if (keyword !== "") {
          const res = await getProducts(`${keyword}`);
          setState({
            ...state,
            kosong: res.length < 1,
            products: res,
            isLoading: false
          });
        }
      }
      Searched();
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  const handleSearchChange = event => {
    const keywords = event.target.value;
    setState({
      ...state,
      isLoading: true
    });
    setKeyword(keywords);
  };

  const goBack = () => {
    props.history.push("/");
  };

  const cancel = () => {
    setState({ ...state, products: [] });
    setKeyword("");
  };

  const fabStyle = () => {
    if (cartItems && JSON.parse(cartItems).length > 0) {
      return { marginBottom: 40 };
    }
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" bgcolor="white">
          <AppBar elevation={0} position="static" className={classes.appbar}>
            <Toolbar variant="dense" style={{ height: "100%" }}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="Menu"
                onClick={goBack}
              >
                <BackButton />
              </IconButton>

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  style={{
                    color: "#707585",
                    marginRight: 23,
                    width: "100% !important"
                  }}
                  placeholder={`${intl.formatMessage({
                    id: "category.search"
                  })}`}
                  autoFocus
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  onChange={handleSearchChange}
                  inputProps={{ "aria-label": "Search" }}
                  value={keyword}
                />
                {keyword !== "" && (
                  <div className={classes.clearIcon} onClick={cancel}>
                    <img src={silang} alt="Clear" />
                  </div>
                )}
              </div>
            </Toolbar>
          </AppBar>
        </Box>
        <Paper elevation={0} className={classes.paper}>
          <Grid container style={fabStyle()} className={classes.grdiContainer}>
            {state.error !== null && <h1>{state.error}</h1>}
            {state.isLoading ? (
              <div style={{ width: "100%" }}>
                <MyLoader />
              </div>
            ) : (
              <React.Fragment>
                {state.kosong && (
                  <Grid
                    align="center"
                    item
                    xs={12}
                    style={{
                      height: "100vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column"
                    }}
                  >
                    <div>
                      <Typography
                        style={{ padding: 10 }}
                        display="block"
                        gutterBottom
                        variant="caption"
                      >
                        {intl.formatMessage({ id: "product.empty" })}
                      </Typography>
                    </div>
                  </Grid>
                )}

                {state.products.map(product => (
                  <Grid
                    item
                    xs={12}
                    key={product.id}
                    style={{ maxHeight: 165, marginBottom: 10 }}
                  >
                    <ProductItem product={product} />
                  </Grid>
                ))}
              </React.Fragment>
            )}
          </Grid>
        </Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Fab cartItems={state.cartItems} to="/cart?from=/" />
        </div>
      </Container>
    </React.Fragment>
  );
}

export default withTransaction("ProductSearch", "component")(ProductSearch);
