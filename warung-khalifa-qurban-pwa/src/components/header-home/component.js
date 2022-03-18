import React from "react";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Logo from "../../vector/goat.png";

function Component(props) {
  const { classes, firstName } = props;

  return (
    <>
      <div className={classes.container}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <img src={Logo} alt="logo" className={classes.logo} />
        </div>
        <div style={{ marginTop: -16 }}>
          <Typography className={classes.salam}>Assalamualaikum,</Typography>
          <Typography className={classes.name}>{firstName}</Typography>
        </div>
      </div>
    </>
  );
}

export default withRouter(Component);
