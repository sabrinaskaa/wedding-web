import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  loading: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    margin: "auto",
    flexGrow: 1,
    alignItems: "center",
    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
  },
  progress: {
    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
  }
});
function Loading(props) {
  const { classes } = props;
  return (
    <div className={classes.loading}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

export default withStyles(styles)(Loading);
