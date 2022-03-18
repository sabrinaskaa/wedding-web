import React from "react";
import PaginationDot from "./paginationDot";

import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  root: {
    position: "absolute",
    bottom: 0,
    left: 10,
    display: "flex",
    flexDirection: "row"
  }
}));

function Pagination(props) {
  const classes = styles();
  const handleClick = (event, index) => {
    props.onChangeIndex(index);
  };

  const { index, dots } = props;

  const children = [];

  for (let i = 0; i < dots; i += 1) {
    children.push(
      <PaginationDot
        key={i}
        index={i}
        active={i === index}
        onClick={handleClick}
      />
    );
  }

  return <div className={classes.root}>{children}</div>;
}

export default Pagination;
