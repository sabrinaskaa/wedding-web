import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Pagination from "./pagination";
import styles from "./styles";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";

function PopupSlider({ data, click }) {
  const classes = styles();
  const [state, setState] = useState(0);

  const handleChangeIndex = index => {
    setState(index);
  };

  const validUrl = item => {
    if (
      item[state].redirectUrl.substr(item[state].redirectUrl.length - 1) === "/"
    ) {
      return item[state].redirectUrl;
    } else {
      return `${item[state].redirectUrl}/`;
    }
  };
  return (
    <>
      <Grid className={classes.root}>
        <Grid className={classes.wrapper}>
          <SwipeableViews
            index={state}
            onChangeIndex={handleChangeIndex}
            containerStyle={{ width: "100%" }}
            enableMouseEvents
          >
            {data?.map((item, index) => {
              // setRedirectUrl(item[index].redirectUrl);
              return (
                <div
                  key={index}
                  className={classes.slide}
                  style={{
                    width: `${item.aspectRatio.width}px`,
                    background: `url(${
                      item.image
                        ? item.image.url
                        : "https://via.placeholder.com/250/ABABAB/F5F5F5/?text=Placeholder"
                    }) center no-repeat`,
                    backgroundSize: "cover",
                    height: `${item.aspectRatio.height}px`,
                    borderTopLeftRadius: "1.3rem",
                    borderTopRightRadius: "1.3rem"
                  }}
                ></div>
              );
            })}
          </SwipeableViews>
          <div className={classes.closeWrapper}>
            <div className={classes.close} onClick={click}>
              <CloseIcon />
            </div>
          </div>
          {data?.length > 1 && (
            <Pagination
              dots={data?.length}
              index={state}
              onChangeIndex={handleChangeIndex}
              // className={classes.slider}
            />
          )}
        </Grid>
      </Grid>
      <div className={classes.buttonWrapper}>
        <div
          className={classes.buttonPopup}
          onClick={
            window.location.href === validUrl(data)
              ? click
              : () => window.location.replace(`${data[state].redirectUrl}`)
          }
        >
          Lanjut
        </div>
      </div>
    </>
  );
}

export default PopupSlider;
