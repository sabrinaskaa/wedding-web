/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { withRouter } from "react-router-dom";
import { CardMedia, Typography } from "@material-ui/core";
import "./index.css";
import Tags from "../../vector/tags.svg";
import Calender from "../../vector/calender.svg";
import moment from "moment";
import { useIntl } from "react-intl";

import { useHistory } from "react-router-dom";

function Component(props) {
  const { classes, item } = props;
  const history = useHistory();
  const intl = useIntl();

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
        <div
          className={classes.content}
          onClick={() => {
            history.push(`/article/${item.id}`);
          }}
        >
          <Typography
            style={{
              color: process.env.REACT_APP_COLOR_PRIMARY || "#2DBE78",
              fontSize: 14,
              fontWeight: 700
            }}
            className="titleArticle"
            onClick={() => {
              history.push(`/article/${item.id}`);
            }}
          >
            {item.title}
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: item.tags.length > 0 && "flex-start"
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: item.tags.length > 0 && 24
              }}
            >
              <img src={Calender} alt="calender" />
              <Typography
                style={{ fontSize: 10, color: "#8D968D", marginLeft: 8 }}
              >
                {moment(new Date(item.updatedAt)).format("l")}
              </Typography>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: item?.body }}
            style={{
              color: "#4D4D4D",
              fontSize: 10
            }}
            className="bodyArticle"
          />
          <Typography
            style={{
              color: process.env.REACT_APP_COLOR_PRIMARY || "#2DBE78",
              fontSize: 10,
              fontWeight: 700,
              marginTop: 8
            }}
          >
            {intl.formatMessage({ id: "homeArticle.readMore" })}
          </Typography>
        </div>
      </div>
    </>
  );
}

export default withRouter(Component);
