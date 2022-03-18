/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { withTransaction } from "@elastic/apm-rum-react";
import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  Slide,
  Divider
} from "@material-ui/core";
import "firebase/analytics";
import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/header-home";
import Category from "../../components/category-item";
import Carousel from "../../components/slider-home";
import Slider from "../../components/slider-article-nice-person";
import {
  getListArticles,
  getListAllArticles,
  getListArticleCategories
} from "../../services/products";
import SplashScreen from "../../components/splash-screen";
import CardArticle from "../../components/card-article";
import Skeleton from "@material-ui/lab/Skeleton";
import { useIntl } from "react-intl";

function HomePage(props) {
  const history = useHistory();
  const { classes } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [listAllArticles, setListAllArticles] = useState([]);
  const [listArticleCategories, setListArticleCategories] = useState([]);
  const [listArticles, setListArticles] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isCustomLoading, setIsCustomLoading] = useState(true);
  const intl = useIntl();

  const getData = async () => {
    const listAllArticles = await getListAllArticles();
    const listArticleCategories = await getListArticleCategories();
    setListAllArticles(listAllArticles);
    setListArticleCategories(listArticleCategories);
    setSelectedCategoryId(listArticleCategories?.[0]?.id);
    setIsLoading(false);
  };

  const getListArticleByCategory = async () => {
    setIsCustomLoading(true);
    const listArticles = await getListArticles(selectedCategoryId);
    setListArticles(listArticles);
    setIsCustomLoading(false);
  };

  const name = localStorage.getItem("name");
  const first = name.split(" ");
  const firstName = first[0].trim();

  useEffect(() => {
    if (selectedCategoryId) {
      getListArticleByCategory();
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    firebase.analytics().logEvent("application_started");
    getData();
  }, []);

  return (
    <>
      <CssBaseline />

      <Container maxWidth="xs" className={classes.container}>
        {isLoading ? (
          <SplashScreen withLoading />
        ) : (
          <>
            <div
              style={{
                maxWidth: 442,
                top: 0,
                width: "100%",
                position: "fixed",
                zIndex: 0
              }}
            >
              <Header firstName={firstName} />
            </div>
            <div className={classes.contentWrapper}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(196, 196, 196, 0.5)",
                    width: 44,
                    height: 3,
                    borderRadius: "1.5px",
                    marginTop: 4
                  }}
                />
              </div>
              <Category />
              <Divider className={classes.divider} />
              <Carousel />
              <Divider className={classes.divider} />
              <Typography
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: process.env.REACT_APP_COLOR_PRIMARY || "#27AE60"
                }}
              >
                {intl.formatMessage({ id: "homeNicePerson.title" })}
              </Typography>
              <Grid className={classes.scrollingWrapper}>
                {listAllArticles.map(item => (
                  <div>
                    <Slider item={item} />
                  </div>
                ))}
                <Grid className={classes.sliderMarginEnd} />
              </Grid>
              <Grid className={classes.scrollingWrapper}>
                {listArticleCategories.map(item => (
                  <div
                    style={{
                      padding: "6px 10px",
                      backgroundColor:
                        selectedCategoryId === item.id
                          ? process.env.REACT_APP_COLOR_PRIMARY || "#27AE60"
                          : "white",
                      border:
                        selectedCategoryId !== item.id && "1px solid #8D968D",
                      color:
                        selectedCategoryId === item.id ? "white" : "#8D968D",
                      display: "flex",
                      width: "min-content",
                      whiteSpace: "nowrap",
                      borderRadius: 8,
                      marginRight: 8
                    }}
                    onClick={() => {
                      setSelectedCategoryId(item.id);
                    }}
                  >
                    <Typography style={{ fontSize: 10 }}>
                      {item.name}
                    </Typography>
                  </div>
                ))}
              </Grid>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                {isCustomLoading ? (
                  <Skeleton
                    width={259}
                    height={500}
                    style={{ marginTop: -110 }}
                  />
                ) : (
                  listArticles.map(item => <CardArticle item={item} />)
                )}
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default withTransaction("HomePage", "component")(HomePage);
