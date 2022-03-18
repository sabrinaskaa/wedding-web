import React from "react";
import { withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Default from "../../vector/default-blank.svg";
import Other from "../../vector/other.js";

function Component(props) {
  const { classes } = props;
  return (
    <>
      <span>
        <Grid
          item
          xs={2.5}
          className={classes.boxGridCategories}
          onClick={() => {
            !props.other && props.history.push(`/category/${props.id}`);
          }}
        >
          {props.other ? (
            <span disableRipple className={classes.boxCategories}>
              <Other className={classes.imageCategories} />
            </span>
          ) : (
            <div disableRipple className={classes.boxCategories}>
              <img
                src={props.image ? props.image : Default}
                alt="Categories Logo"
                className={classes.imageCategories}
              />
            </div>
          )}
          <span className={classes.textCategoriesTitle}>{props.name}</span>
        </Grid>
      </span>
    </>
  );
}

export default withRouter(Component);
