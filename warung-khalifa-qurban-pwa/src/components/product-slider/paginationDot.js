import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  root: {
    height: 12,
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: 0,
    marginLeft: -8
  },
  dot: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    opacity: 0.4,
    height: 8,
    width: 8,
    borderRadius: 6,
    margin: "0 8px"
  },
  active: {
    width: 28,
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    opacity: 1
  }
}));

function PaginationDot(props) {
  const classes = styles();
  const handleClick = event => {
    props.onClick(event, props.index);
  };

  const { active } = props;

  const dotStyle = clsx({
    [classes.dot]: true,
    [classes.active]: active
  });

  return (
    <button type="button" className={classes.root} onClick={handleClick}>
      <div className={dotStyle} style={{ paddingRight: active ? 4 : 0 }} />
    </button>
  );
}

export default PaginationDot;
