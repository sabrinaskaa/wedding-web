import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Pagination from "./Pagination";
import { getBanners } from "../../services/banner";
import { Link } from "react-router-dom";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = () => ({
  root: {
    flexGrow: 1,
    position: "relative"
  },
  img: {
    display: "block",
    overflow: "hidden",
    borderRadius: 7
  }
  // swipeable: {
  //   "& .react-swipeable-view-container": {
  //     width: "calc(100% - 1.5rem)"
  //   }
  // }
});

class Component extends React.Component {
  state = {
    activeStep: 0,
    banners: [],
    static: []
  };

  async componentDidMount() {
    const bannerData = await getBanners();
    this.setState({
      banners: bannerData.data
    });
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;

    const isLocationClose =
      localStorage.getItem("isLocationClose") ||
      localStorage.getItem("isLocationCloseHour");

    return (
      <div className={classes.root}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
          className={classes.swipeable}
        >
          {this.state.banners?.map((step, index) => (
            <div key={step.source_url}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Link to={"/banner/" + step?.id}>
                  <img
                    className={classes.img}
                    src={step?.image?.url}
                    alt={step.label}
                    style={{
                      width: "100%",
                      // maxWidth: `${step.aspectRatio.width}px`,
                      height: `${step.aspectRatio.height}px`,
                      filter: isLocationClose ? "grayScale(1)" : "unset"
                    }}
                  />
                </Link>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        {
          <Pagination
            dots={this.state.banners.length}
            index={activeStep}
            onChangeIndex={this.handleChangeIndex}
          />
        }
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Component);
