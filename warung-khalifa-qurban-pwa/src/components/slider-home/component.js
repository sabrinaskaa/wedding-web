import React from "react";
import { withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Carousel from "../carousel";

function Component(props) {
  const { classes } = props;
  return (
    <>
      <Grid container className={classes.container} item xs={12}>
        <div style={{ marginTop: 12 }}>
          <Carousel />
        </div>
      </Grid>
    </>
  );
}

export default withRouter(Component);
