import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Carousel } from "react-bootstrap";
import styles from "./styles.module.css";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";

const CarouselWrapper = styled.div`
  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 7%;
    height: 10%;
    color: #fff;
    text-align: center;
    background: #bfc0c0;
  }

  .carousel-indicators {
    margin: 0;
    padding: 0;
    [data-bs-target] {
      height: 5px;
      margin: 0;
      padding: 0;
      background-color: #bfc0c0;
      width: 100%;
      border-bottom: none;
    }
  }
`;

function CarouselHome() {
  return (
    <div className={styles.CarouselWrapPadding}>
      <CarouselWrapper className={styles.forOverlay}>
        {/* <div className={styles.overlayCarousel}></div> */}
        <Carousel>
          <Carousel.Item>
            <img
              className={styles.imgCarousel}
              src="https://res.cloudinary.com/tpostr/image/upload/v1553865338/paparouna/IMG_7638-01.jpg"
              alt="First slide"
              // src={props.data.img}
            />
            <span className={styles.caption}>PREMIUM CLOTHING MAKER</span>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={styles.imgCarousel}
              src="https://res.cloudinary.com/tpostr/image/upload/v1553865338/paparouna/IMG_7621-01.jpg"
              alt="Second slide"
            />
            <span className={styles.caption}>BIKIN BAND KAOSMU</span>
          </Carousel.Item>
        </Carousel>
      </CarouselWrapper>
    </div>
  );
}
export default CarouselHome;
