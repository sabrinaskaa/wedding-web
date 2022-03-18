/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import ContentLoader from "react-content-loader";
import BackButton from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Pasar from "../../vector/cross.png";
import MarketList from "../../components/market-list";
import silang from "../../vector/silang.svg";
import { getListPasar } from "../../services/vendor";
import { withTransaction } from "@elastic/apm-rum-react";
import { CartContext } from "../../context/cart";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const MyLoader = () => (
  <ContentLoader
    height={568}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#dcdada"
  >
    <rect x="16" y="136" rx="0" ry="0" width="150" height="21" />
    <rect x="16" y="165" rx="0" ry="0" width="300" height="28" />
    <rect x="16" y="209" rx="0" ry="0" width="150" height="21" />
    <rect x="16" y="238" rx="0" ry="0" width="300" height="28" />
    <rect x="16" y="282" rx="0" ry="0" width="150" height="21" />
    <rect x="16" y="311" rx="0" ry="0" width="300" height="28" />
    <rect x="16" y="355" rx="0" ry="0" width="150" height="21" />
    <rect x="16" y="384" rx="0" ry="0" width="300" height="28" />
    <rect x="16" y="428" rx="0" ry="0" width="150" height="21" />
    <rect x="16" y="457" rx="0" ry="0" width="300" height="28" />
    <rect x="16" y="501" rx="0" ry="0" width="150" height="21" />
    <rect x="16" y="530" rx="0" ry="0" width="300" height="28" />
  </ContentLoader>
);

function LocationList(props) {
  const lg = useMediaQuery("(max-height:800px)");
  const { restoreDefault } = useContext(CartContext);
  const initialState = {
    listPasar: [],
    list: [],
    pasar: localStorage.getItem("selectedPasar"),
    isLoading: true,
    marked: false,
    open: false,
    kosong: false,
    confirm: false,
    isOpen: false,
    temporaryPasar: {},
    totalData: 0,
    totalPage: 0,
    nextPage: 1
  };
  const [state, setState] = useState(initialState);
  const [keyword, setKeyword] = useState("");

  async function refetchLocation() {
    const locations = await getListPasar("", state.nextPage);
    setTimeout(() => {
      setState({
        ...state,
        listPasar: [...state.listPasar, ...locations?.data],
        isLoading: false,
        totalPage: locations?.meta?.totalPage,
        totalData: locations?.meta?.totalData,
        nextPage: locations?.meta?.page + 1
      });
    }, 1000);
  }

  useEffect(() => {
    async function fetchAPI() {
      const res = await getListPasar("");
      localStorage.setItem("listLocation", JSON.stringify(res.data));
      setState({
        ...state,
        listPasar: res.data,
        isLoading: false,
        totalPage: res?.meta?.totalPage,
        totalData: res?.meta?.totalData,
        nextPage: res?.meta?.page + 1
      });
    }
    fetchAPI();
  }, []);

  const { classes, history } = props;
  // const { keyword } = state;

  const updateMarketList = async () => {
    setState({ ...state, isLoading: true });

    const listPasar = await getListPasar(keyword);

    setState({
      ...state,
      listPasar: listPasar.data,
      isLoading: false,
      totalPage: listPasar?.meta?.totalPage,
      totalData: listPasar?.meta?.totalData,
      nextPage: listPasar?.meta?.page + 1
    });
  };
  const handleSearchChange = event => {
    // const keyword = event.target.value;
    setState({
      ...state,
      isLoading: true
    });
    setKeyword(event.target.value);
  };

  useEffect(() => {
    updateMarketList();
  }, [keyword]);

  const cancel = () => {
    setKeyword("");
    async function fetchAPI() {
      const res = await getListPasar("");
      setState({
        ...state,
        listPasar: res.data,
        isLoading: false,
        totalPage: res?.meta?.totalPage,
        totalData: res?.meta?.totalData,
        nextPage: res?.meta?.page + 1
      });
    }
    fetchAPI();
  };

  const closeConfirm = () => {
    setState({ ...state, confirm: false });
  };

  const confirmPasar = () => {
    restoreDefault();
    sessionStorage.clear();
    localStorage.setItem("selectedPasar", JSON.stringify(state.temporaryPasar));
    localStorage.removeItem("cart");
    if (state.temporaryPasar.isOpen) {
      localStorage.removeItem("isLocationClose");
    } else {
      localStorage.setItem("isLocationClose", "true");
    }
    if (state.temporaryPasar.isOpenHour) {
      localStorage.removeItem("isLocationCloseHour");
    } else {
      localStorage.setItem("isLocationCloseHour", "true");
    }
    setState({ ...state, marked: true });
    props.history.push("/");
  };

  console.log(state.listPasar);

  return (
    <React.Fragment>
      <React.Fragment>
        <Container maxWidth="xs" className={classes.container}>
          <CssBaseline />
          {window.location.pathname === "/market" ? (
            <>
              <AppBar
                elevation={0}
                position="static"
                className={classes.appbar}
              >
                <Toolbar variant="dense">
                  <Grid
                    container
                    spacing={0}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Grid item xs={1}>
                      <IconButton
                        edge="start"
                        className={classes.backButton}
                        onClick={() => {
                          props.history.push("/");
                        }}
                      >
                        <BackButton />
                      </IconButton>
                    </Grid>

                    <Grid item xs={11}>
                      <Typography className={classes.textLokasi}>
                        Pilih Lokasi
                      </Typography>
                    </Grid>

                    <Grid container spacing={0}>
                      <Grid className={classes.input} item xs={12}>
                        <SearchIcon style={{ color: "#707585" }} />
                        <InputBase
                          className={classes.baseInput}
                          autoFocus
                          placeholder="Cari lokasi terdekatmu"
                          onChange={handleSearchChange}
                          value={keyword}
                        />
                        {keyword !== "" && (
                          <img src={silang} onClick={cancel} alt="Clear" />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
            </>
          ) : (
            <AppBar elevation={0} position="static" className={classes.appbar}>
              <Toolbar variant="dense">
                <Grid
                  container
                  spacing={0}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Grid item xs={12}>
                    <Typography className={classes.textLok}>
                      Pilih Lokasi
                    </Typography>
                  </Grid>

                  <Grid container spacing={0}>
                    <Grid className={classes.input} item xs={12}>
                      <SearchIcon style={{ color: "#707585" }} />
                      <InputBase
                        className={classes.baseInput}
                        autoFocus
                        placeholder="Cari lokasi terdekatmu"
                        onChange={handleSearchChange}
                        value={keyword}
                      />
                      {keyword !== "" && (
                        <img src={silang} onClick={cancel} alt="Clear" />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          )}

          {state.isLoading === true ? (
            <div style={{ width: "100%" }}>
              <MyLoader />
            </div>
          ) : (
            <>
              <InfiniteScroll
                dataLength={state.listPasar.length} //This is important field to render the next data
                next={refetchLocation}
                hasMore={state.nextPage <= state.totalPage}
                height={lg ? 850 : 700}
                loader={
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <CircularProgress
                      style={{
                        color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                      }}
                    />
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
                {state.listPasar.length > 0 ? (
                  <Grid container spacing={0} className={classes.gridPasar}>
                    {state.listPasar.map(pasar => (
                      <Grid item xs={12} key={pasar.name}>
                        <MarketList
                          noImage
                          list
                          click={() => {
                            const isSelectedPasar = JSON.parse(
                              localStorage.getItem("selectedPasar")
                            );

                            if (isSelectedPasar) {
                              setState({
                                ...state,
                                confirm: true,
                                temporaryPasar: pasar
                              });
                            } else {
                              sessionStorage.clear();
                              localStorage.setItem(
                                "selectedPasar",
                                JSON.stringify(pasar)
                              );

                              localStorage.removeItem("cart");
                              setState({
                                ...state,
                                confirm: false,
                                marked: true
                              });
                              {
                                !state.pasar
                                  ? history.push("/")
                                  : history.push("/");
                              }
                            }
                          }}
                          pasar={pasar}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <div>
                    <Grid
                      item
                      xs={12}
                      align="center"
                      className={classes.Kosong}
                    >
                      <img src={Pasar} alt="Pasar" />
                      <Typography style={{ paddingTop: 45, fontSize: 16 }}>
                        <b>Uups..</b>
                      </Typography>
                      <Typography style={{ padding: "5%", fontSize: 13 }}>
                        Lokasi yang anda cari tidak ditemukan atau tidak
                        tersedia.
                      </Typography>
                    </Grid>
                  </div>
                )}
              </InfiniteScroll>
            </>
          )}
        </Container>

        <Dialog open={state.confirm} onClose={closeConfirm}>
          <DialogTitle id="alert-dialog-title">
            <Typography className={classes.dialog}>
              <b>Peringatan</b>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography className={classes.ganti}>
                Apakah anda yakin akan mengganti lokasi?
              </Typography>

              <Typography className={classes.gantiText}>
                Keranjang belanja akan dikosongkan jika Anda mengganti lokasi.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions align="left">
            <Button
              onClick={closeConfirm}
              color="primary"
              style={{
                backgroundColor: "none",
                color: "#9FA3A6",
                fontWeight: "bold"
              }}
            >
              Kembali
            </Button>
            <Button
              onClick={confirmPasar}
              autoFocus
              style={{
                fontWeight: "bold",
                color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
              }}
            >
              Ya, Ganti Lokasi
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </React.Fragment>
  );
}

export default withTransaction(
  "LocationList",
  "component"
)(withRouter(LocationList));
