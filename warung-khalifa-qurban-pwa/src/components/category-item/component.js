import React from "react";
import { Divider, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Category1 from "../../vector/category1.png";
import Category2 from "../../vector/category2.png";
import { useIntl } from "react-intl";

function Component(props) {
  const { classes } = props;
  const intl = useIntl();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 14
      }}
    >
      <div align="center" style={{ cursor: "pointer" }}>
        <div
          onClick={() => {
            props.history.push(`/category/${process.env.REACT_APP_CATEGORY_1}`);
          }}
        >
          <img style={{ width: 55 }} src={Category1} alt="Items pic" />
        </div>
        <Typography
          className={classes.categoryTitle}
          variant="caption"
          gutterBottom
        >
          {intl.formatMessage({ id: "homeCategory.aqiqahProgram" })}
        </Typography>
      </div>
      <Divider
        orientation="vertical"
        style={{
          backgroundColor: "#E8E8E8",
          height: 47
        }}
      />
      <div align="center" style={{ cursor: "pointer" }}>
        <div
          onClick={() => {
            props.history.push(`/category/${process.env.REACT_APP_CATEGORY_2}`);
          }}
        >
          <img style={{ width: 55 }} src={Category2} alt="Items pic" />
        </div>
        <Typography
          className={classes.categoryTitle}
          variant="caption"
          gutterBottom
        >
          {intl.formatMessage({ id: "homeCategory.qurbanProgram" })}
        </Typography>
      </div>
    </div>
  );
}

export default withRouter(Component);
