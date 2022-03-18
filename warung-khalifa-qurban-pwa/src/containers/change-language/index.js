import React, { useState, useContext } from "react";
import {
  Button,
  Container,
  Typography,
  Radio,
  RadioGroup
} from "@material-ui/core";
import AppBar from "../../components/app-bar/component";
import { withTransaction } from "@elastic/apm-rum-react";
import { makeStyles } from "@material-ui/styles";
import CheckedIcon from "../../vector/checked-icon.svg";
import IndonesiaFlag from "../../vector/indonesiaFlag.svg";
import EnglishFlag from "../../vector/englishFlag.svg";
import { useIntl } from "react-intl";
import { LanguageContext } from "../../context/language";
import { useHistory } from "react-router-dom";

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
    borderRight: "1px solid #f1f1f1"
  },
  title: {
    fontWeight: 600,
    marginBottom: 24
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
    alignItems: "center",
    cursor: "pointer"
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
  }
});

function ChangeLanguage() {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  const { setLanguage, language } = useContext(LanguageContext);
  const [selectLanguage, setSelectLanguage] = useState(language);

  const handleChange = event => {
    setSelectLanguage(event.target.value);
  };

  const handleSubmit = () => {
    setLanguage(selectLanguage);
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <AppBar goBack />
      <div className={classes.root}>
        <Typography className={classes.title}>
          {intl.formatMessage({ id: "changeLanguage.title" })}
        </Typography>
        <form>
          <RadioGroup
            aria-label="language"
            name="language"
            value={selectLanguage}
            onChange={handleChange}
          >
            <div
              className={classes.languageWrapper}
              onClick={() => setSelectLanguage("id")}
            >
              <Radio
                value="id"
                id="id"
                onChange={handleChange}
                className={classes.checkbox}
                icon={<div className={classes.icon} />}
                checkedIcon={<img src={CheckedIcon} alt="checklist-icon" />}
                name="checkedH"
              />
              <div
                style={{
                  marginLeft: 24,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <img
                  src={IndonesiaFlag}
                  alt="indonesia-flag"
                  style={{ width: 24 }}
                />
                <Typography className={classes.text2}>
                  {" "}
                  {intl.formatMessage({ id: "changeLanguage.indonesia" })}
                </Typography>
              </div>
            </div>
            <div
              style={{ marginTop: "0.75rem" }}
              className={classes.languageWrapper}
              onClick={() => setSelectLanguage("en")}
            >
              <Radio
                value="en"
                id="en"
                onChange={handleChange}
                className={classes.checkbox}
                icon={<div className={classes.icon} />}
                checkedIcon={<img src={CheckedIcon} alt="checklist-icon" />}
                name="checkedH"
              />
              <div
                style={{
                  marginLeft: 24,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <img
                  src={EnglishFlag}
                  alt="english-flag"
                  style={{ width: 24 }}
                />
                <Typography className={classes.text2}>
                  {intl.formatMessage({ id: "changeLanguage.english" })}
                </Typography>
              </div>
            </div>
          </RadioGroup>
        </form>
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: 16 }}>
        <div
          style={{
            position: "fixed",
            bottom: 16,
            width: "92%",
            maxWidth: 411
          }}
        >
          <Button
            className={classes.nextButton}
            style={{
              backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#2DBE78",
              color: process.env.REACT_APP_COLOR_FONT_BUTTON || "#FFFFFF",
              fontFamily: process.env.REACT_APP_FONT_FAMILY_BUTTON || "Poppins"
            }}
            onClick={() => {
              handleSubmit();
              history.goBack();
            }}
          >
            {intl.formatMessage({ id: "changeLanguage.selectLanguage" })}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default withTransaction("ChangeLanguage", "component")(ChangeLanguage);
