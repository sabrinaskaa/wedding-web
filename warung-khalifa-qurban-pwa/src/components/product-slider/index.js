import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Pagination from "./pagination";
import styles from "./styles";
import Grid from "@material-ui/core/Grid";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

function Slider({ data }) {
  //   const isMobile = useMediaQuery("(max-width:380px)");
  const classes = styles();
  const [state, setState] = useState(0);

  const [sliderImage, setSliderImage] = useState([]);

  const handleChangeIndex = index => {
    setState(index);
  };

  useEffect(() => {
    setSliderImage([data.image, ...data.images]);
    // eslint-disable-next-line
  }, []);

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
            {sliderImage?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classes.slide}
                  style={{
                    width: "100%",
                    background: `url(${
                      item
                        ? item.url
                        : "https://via.placeholder.com/250/ABABAB/F5F5F5/?text=Placeholder"
                    }) center no-repeat`,
                    backgroundSize: "cover",
                    height: 450,
                    borderRadius: 5
                  }}
                ></div>
              );
            })}
          </SwipeableViews>
          <div className={classes.cardMedia}>
            {data.size === null && (
              <div className={classes.cardMediaDigital}>Produk Digital</div>
            )}
          </div>
          {data.images.length !== 0 && (
            <Pagination
              dots={sliderImage?.length}
              index={state}
              onChangeIndex={handleChangeIndex}
              // className={classes.slider}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Slider;
