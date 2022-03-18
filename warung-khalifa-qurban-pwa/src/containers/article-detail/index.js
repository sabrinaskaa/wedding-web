import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { withTransaction } from "@elastic/apm-rum-react";
import { makeStyles } from "@material-ui/styles";
import { getListAllArticles, getDetailArticle } from "../../services/products";
import AppBar from "../../components/app-bar";
import Tags from "../../vector/tags.svg";
import Calender from "../../vector/calender.svg";
import moment from "moment";
import Slider from "../../components/slider-article-nice-person";
import SplashScreen from "../../components/splash-screen";
import { useIntl } from "react-intl";

const useStyles = makeStyles({
  container: {
    padding: 0,
    minHeight: "100vh",
    height: "100%",
    maxWidth: 444,
    backgroundColor: "#FAFAFA",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    paddingTop: 64
  },
  root: {
    padding: "16px",
    height: "100%",
    maxWidth: 444,
    backgroundColor: "#FAFAFA",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    "& p": {
      margin: 0
    },
    "& figure": {
      margin: 0,
      "& img": {
        width: "100%",
        maxWidth: 408
      }
    }
  },
  nextButton: {
    textTransform: "capitalize",
    fontWeight: 600,
    width: "100%",
    padding: 12,
    borderRadius: 8
  },
  languageWrapper: {
    display: "flex",
    padding: 16,
    border: "1px solid #F1F2F6",
    borderRadius: "0.5rem",
    alignItems: "center"
  },
  icon: {
    backgroundColor: "#EBEBEB",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%"
  },
  text2: {
    marginLeft: "0.75rem",
    fontSize: "14px",
    fontWeight: 600,
    alignSelf: "center"
  },
  title: {
    fontWeight: 700,
    fontSize: "1.125rem",
    color: process.env.REACT_APP_COLOR_PRIMARY || "#2DBE78"
  },
  image: {
    width: "100%",
    maxWidth: 444,
    maxHeight: 190
  },
  scrollingWrapper: {
    padding: "8px 2px",
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
    "-webkit-overflow-scrolling": "touch",
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent"
    },
    "&::-webkit-scrollbar": {
      height: 1
    },
    backgroundColor: "#fff",
    height: "110%"
  },
  otherTitle: {
    fontWeight: 700,
    fontSize: 14,
    color: process.env.REACT_APP_COLOR_PRIMARY || "#2DBE78"
  }
});

function ArticleDetail(props) {
  const { match } = props;
  const classes = useStyles();
  const [listArticles, setListArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailArticle, setDetailArticle] = useState();
  const intl = useIntl();

  const articleId = match.params.id;

  const getData = async () => {
    setIsLoading(true);
    const detailArticle = await getDetailArticle(articleId);
    const listArticles = await getListAllArticles();
    setDetailArticle(detailArticle);
    setListArticles(listArticles);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [articleId]);

  return (
    <Container maxWidth="xs" className={classes.container}>
      {isLoading ? (
        <SplashScreen withLoading />
      ) : (
        <>
          <AppBar
            goBack
            title={`${intl.formatMessage({ id: "homeNicePerson.title" })}`}
          />
          <div className={classes.root}>
            <Typography className={classes.title}>
              {detailArticle?.title}
            </Typography>
            <div
              style={{
                display: "flex",
                marginTop: 16
              }}
            >
              {detailArticle?.tags?.length > 0 && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={Tags} alt="tags" />
                  <Typography
                    style={{
                      fontSize: 10,
                      color: "#8D968D",
                      fontWeight: 600,
                      marginLeft: 8
                    }}
                  >
                    {detailArticle?.tags?.[0]?.name}
                  </Typography>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: detailArticle?.tags.length > 0 && 24
                }}
              >
                <img src={Calender} alt="calender" />
                <Typography
                  style={{
                    fontSize: 10,
                    color: "#8D968D",
                    marginLeft: 8,
                    fontWeight: 600
                  }}
                >
                  {moment(new Date(detailArticle?.updatedAt)).format("l")}
                </Typography>
              </div>
            </div>
          </div>
          <img
            className={classes.image}
            src={detailArticle?.image?.url}
            alt="thumbnail"
          />
          <div
            className={classes.root}
            dangerouslySetInnerHTML={{ __html: detailArticle?.body }}
          />
          <div className={classes.root}>
            <Typography className={classes.anotherTitle}>
              {intl.formatMessage({ id: "articleDetail.anotherStory" })}
            </Typography>
            <div className={classes.scrollingWrapper}>
              {listArticles.map(item => (
                <div>
                  <Slider item={item} />
                </div>
              ))}
              <div className={classes.sliderMarginEnd} />
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default withTransaction("ArticleDetail", "component")(ArticleDetail);
