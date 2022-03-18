import React, { useEffect, useState } from "react";
import Appbar from "../../components/app-bar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Box } from "@material-ui/core";
import { getBannerById } from "../../services/banner";
import Skeleton from "@material-ui/lab/Skeleton";
import parse from "html-react-parser";
import { withTransaction } from "@elastic/apm-rum-react";

const useStyles = makeStyles({
  container: {
    marginBottom: 0,
    padding: 0,
    minHeight: "100%",
    height: "100%",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    maxWidth: 444
  },
  img: {
    width: "100%"
  },
  imgDescription: {
    "& figure": {
      "& img": {
        width: "100%"
      }
    }
  }
});

const BannerDetail = props => {
  const classes = useStyles();
  const [bannerData, setBannerData] = useState(null);
  const [bannerTitle, setBannerTitle] = useState("Banner");

  useEffect(() => {
    getBannerById(props.match.params.id)
      .then(res => {
        const data = res.data;
        setBannerTitle(data?.title);
        setBannerData(data);
      })
      .catch(err => alert("Error get banner... " + err.message));
  }, [props.match.params.id]);

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <Appbar title={bannerTitle} goBack={true} />
        {bannerData ? (
          <Box padding="16px" marginTop="64px">
            <img
              className={classes.img}
              src={bannerData.image.url}
              alt="banner"
            />
            <Typography className={classes.imgDescription}>
              {parse(bannerData.description)}
            </Typography>
          </Box>
        ) : (
          <Box padding="16px" marginTop="64px">
            <Skeleton variant="rect" height={118} animation="wave" />
            <Skeleton
              variant="text"
              animation="wave"
              style={{ marginTop: 24 }}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default withTransaction("BannerDetail", "component")(BannerDetail);
