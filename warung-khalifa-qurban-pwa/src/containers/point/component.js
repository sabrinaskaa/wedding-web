/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "../../components/app-bar";
import CardPoint from "../../components/card-point";
import { withTransaction } from "@elastic/apm-rum-react";
import { Typography } from "@material-ui/core";
import Poin from "../../vector/poin";
import { getUserProfile, getUserRewards } from "../../services/user";
import Skeleton from "@material-ui/lab/Skeleton";
import ContentLoader from "react-content-loader";
import KosongVector from "../../vector/kosong.svg";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import InfiniteScroll from "react-infinite-scroll-component";

function Point(props) {
  const { classes } = props;
  const history = useHistory();
  const [point, setPoint] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogError, setDialogError] = useState(false);
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  // eslint-disable-next-line
  const [totalData, setTotalData] = useState(0);
  const [nextPage, setNextPage] = useState(1);

  useEffect(() => {
    const getPoint = async () => {
      await getUserProfile()
        .then(res => {
          setPoint(res.data.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    };

    const getRewards = async () => {
      await getUserRewards()
        .then(res => {
          setRewards(res.data.data);
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
    getPoint();
    getRewards();
    setIsLoading(true);
  }, []);

  async function refetchRewards() {
    const listRewards = await getUserRewards(nextPage);
    setTimeout(() => {
      setRewards([...rewards, ...listRewards?.data?.data]);
      setIsLoading(false);
      setTotalPage(listRewards?.data?.meta?.totalPage);
      setTotalData(listRewards?.data?.meta?.totalData);
      setNextPage(listRewards?.data?.meta?.page + 1);
    }, 1000);
  }

  const handleClose = () => {
    setDialogError(false);
    setDialogSuccess(false);
    if (dialogSuccess) {
      history.push("/profile/vouchers");
    }
  };

  const Loading = () => {
    return (
      <div style={{ padding: 16 }}>
        <Skeleton
          variant="rect"
          height={30}
          width={80}
          animation="wave"
          className={classes.skeleton}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex" }}>
              <Skeleton variant="circle" width={30} height={30} />
              <Skeleton
                variant="rect"
                height={35}
                width={70}
                animation="wave"
                className={classes.poinWave}
              />
            </div>
            <Skeleton variant="text" width={140} />
          </div>
          <Skeleton
            variant="rect"
            height={35}
            width={100}
            animation="wave"
            className={classes.skeleton}
          />
        </div>
      </div>
    );
  };

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
      </ContentLoader>
    </div>
  );

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <div className={classes.AppBarWrapper}>
          <AppBar title="Poinku" goBack={true} />
          <CssBaseline />
          {isLoading ? (
            <Loading />
          ) : (
            <div className={classes.headerPoint}>
              <Typography className={classes.text}>Total Poin</Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "5px 0px "
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Poin />
                  <Typography noWrap className={classes.points}>
                    {point.points?.totalPoints}
                  </Typography>
                </div>
                <div
                  className={classes.button}
                  onClick={() => {
                    setDialogError(true);
                    setMessage("Yuk belanja dahulu untuk menambah poin!");
                  }}
                >
                  Tambah Poin
                </div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 500, color: "#808080" }}>
                {point.points?.expiredAt !== null &&
                  `Berlaku sampai ${point.points?.expiredAt.slice(0, 10)}`}
              </div>
            </div>
          )}
        </div>
        <div style={{ marginTop: 110, padding: "16px 16px" }}>
          {isLoading ? (
            <CardLoader />
          ) : (
            <>
              <InfiniteScroll
                dataLength={rewards.length} //This is important field to render the next data
                next={refetchRewards}
                hasMore={nextPage <= totalPage}
                loader={
                  <div style={{ width: "100%" }}>
                    <CardLoader />
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {rewards.map((item, index) => (
                  <div style={{ paddingBottom: 22 }} key={index}>
                    <CardPoint data={item} />
                  </div>
                ))}
              </InfiniteScroll>
              {rewards.length === 0 && (
                <div className={classes.notFoundWrapper}>
                  <img src={KosongVector} alt="not found" />
                  <h5>Tidak ada rewards yang tersedia!</h5>
                </div>
              )}
            </>
          )}
        </div>

        <Dialog
          classes={{ paperFullScreen: classes.fullPaper }}
          fullScreen
          open={dialogError || dialogSuccess}
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
              {message}
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

export default withTransaction("Point", "component")(Point);
