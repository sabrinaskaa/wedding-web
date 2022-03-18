/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { withRouter } from "react-router-dom";
import { CardMedia, Typography } from "@material-ui/core";
import "./index.css";
import Tags from "../../vector/tags.svg";
import Calender from "../../vector/calender.svg";
import moment from "moment";

import { useHistory } from "react-router-dom";

function Component(props) {
  const { classes, item } = props;
  const history = useHistory();

  return (
    <>
      <div className={classes.card}>
        <CardMedia
          image={
            item.image.url ? item.image.url : "https://via.placeholder.com/150"
          }
          className={classes.image}
          onClick={() => {
            history.push(`/article/${item.id}`);
          }}
        />
        <div className={classes.content}>
          <Typography
            style={{
              color: process.env.REACT_APP_COLOR_PRIMARY || "#2DBE78",
              fontSize: 12
            }}
            className="title"
            onClick={() => {
              history.push(`/article/${item.id}`);
            }}
          >
            {item.title}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent:
                item.tags.length > 0 ? "space-between" : "flex-end"
            }}
          >
            {item.tags.length > 0 && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Tags} alt="tags" />
                <Typography
                  style={{ fontSize: 10, color: "#8D968D", marginLeft: 8 }}
                >
                  {item.tags?.[0]?.name}
                </Typography>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={Calender} alt="calender" />
              <Typography
                style={{ fontSize: 10, color: "#8D968D", marginLeft: 8 }}
              >
                {moment(new Date(item.updatedAt)).format("l")}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Component);
