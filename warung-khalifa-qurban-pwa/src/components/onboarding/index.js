import {
  Button,
  Container,
  makeStyles,
  MobileStepper,
  useTheme,
  InputBase
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React, { useContext, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import IndonesiaFlag from "../../vector/indonesiaFlag.svg";
import EnglishFlag from "../../vector/englishFlag.svg";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import { LanguageContext } from "../../context/language";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const onBoardingSteps = [
  {
    content: <Step1 />
  },
  {
    content: <Step2 />
  },
  {
    content: <Step3 />
  }
];

const useStyles = makeStyles({
  root: {
    padding: "16px",
    minHeight: "100vh",
    height: "100%",
    maxWidth: 444,
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  nextButton: {
    textTransform: "capitalize",
    fontWeight: 600,
    width: "100%",
    padding: 12,
    borderRadius: 8
  },
  changeLanguageButton: {
    textTransform: "capitalize",
    border: `1px solid ${process.env.REACT_APP_COLOR_PRIMARY}`,
    color: `${process.env.REACT_APP_COLOR_PRIMARY}`,
    fontSize: 12,
    fontWeight: 600
  },
  inputWrapper: {
    padding: "14px 16px",
    backgroundColor: "#F1F2F6",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    marginTop: -30
  },
  inputRoot: {
    marginLeft: 0,
    color: "inherit",
    width: "100%",
    height: "100%"
  },
  inputInput: {
    width: "100%",
    fontSize: "16px !important",
    padding: 0,
    "&::placeholder": {
      color: "black !important"
    }
  },
  stepper: {
    backgroundColor: "transparent",
    "& .MuiMobileStepper-dot": {
      width: "8px",
      height: "8px",
      backgroundColor: `${process.env.REACT_APP_COLOR_SECONDARY}`
    },
    "& .MuiMobileStepper-dotActive": {
      backgroundColor: `${process.env.REACT_APP_COLOR_PRIMARY}`,
      width: "32px !important",
      height: "8px",
      borderRadius: 100
    }
  },
  disabledButton: {
    backgroundColor: "#A6A6A6 !important",
    color: "white !important"
  }
});

function OnBoarding(props) {
  const { activeStep, onClick, setActiveStep, skipOnboarding } = props;
  const intl = useIntl();
  const { language } = useContext(LanguageContext);
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const maxSteps = onBoardingSteps.length;
  const [input, setInput] = useState(null);

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <div>
      <Container maxWidth="xs" className={classes.root}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: activeStep === 2 ? "flex-end" : "space-between"
          }}
        >
          {activeStep !== 2 && (
            <CloseIcon
              style={{ fill: "#9B9B9B", cursor: "pointer" }}
              onClick={skipOnboarding}
            />
          )}
          <Button
            className={classes.changeLanguageButton}
            onClick={() => history.push("/change-language")}
          >
            {intl.formatMessage({ id: "onBoarding.changeLanguage" })}
            {language === "id" ? (
              <img src={IndonesiaFlag} alt="flag" style={{ marginLeft: 24 }} />
            ) : (
              <img src={EnglishFlag} alt="flag" style={{ marginLeft: 24 }} />
            )}
          </Button>
        </div>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {onBoardingSteps.map((step, index) => (
            <div className={classes.imageContainer} key={step.title}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div>{step.content}</div>
              ) : null}
            </div>
          ))}
        </SwipeableViews>
        {activeStep === 2 && (
          <div className={classes.inputWrapper}>
            <PersonIcon style={{ fill: "#808080" }} />
            <InputBase
              type="text"
              id="standard-multiline-static"
              placeholder={`${intl.formatMessage({
                id: "onBoarding.placeholder"
              })}`}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              InputProps={{
                "aria-label": "search"
              }}
              value={input}
              onChange={e => setInput(e.target.value)}
              name="note"
              style={{ marginLeft: 12 }}
            />
          </div>
        )}
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.stepper}
            style={{ marginTop: activeStep === 2 ? 20 : 40 }}
          />
        </div>
        {activeStep !== 2 ? (
          <>
            <div
              style={{ display: "flex", justifyContent: "center", padding: 16 }}
            >
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
                  onClick={onClick}
                  style={{
                    backgroundColor:
                      process.env.REACT_APP_COLOR_PRIMARY || "#2DBE78",
                    color: process.env.REACT_APP_COLOR_FONT_BUTTON || "#FFFFFF",
                    fontFamily:
                      process.env.REACT_APP_FONT_FAMILY_BUTTON || "Poppins"
                  }}
                  disabled={activeStep === 2 && !input}
                >
                  {intl.formatMessage({ id: "onBoarding.next" })}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                position: "fixed",
                bottom: 16
              }}
            >
              <Button
                style={{
                  backgroundColor:
                    process.env.REACT_APP_COLOR_PRIMARY || "#2DBE78",
                  color: process.env.REACT_APP_COLOR_FONT_BUTTON || "#FFFFFF",
                  fontFamily:
                    process.env.REACT_APP_FONT_FAMILY_BUTTON || "Poppins",
                  borderRadius: "50%",
                  minWidth: 45,
                  maxWidth: 45,
                  height: 45
                }}
                classes={{ disabled: classes.disabledButton }}
                disabled={activeStep === 2 && !input}
                onClick={() => {
                  onClick();
                  if (activeStep === 2) {
                    localStorage.setItem("name", input);
                  }
                }}
              >
                <ArrowForwardIcon
                  style={{
                    fill: process.env.REACT_APP_COLOR_FONT_BUTTON || "#FFFFFF"
                  }}
                />
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
export default OnBoarding;
