import React from "react";
import styles from "./styles.module.css";
import Gallery from "./gallery.js";

const imgGallery = [
  {
    img: "/gimg-1.jpg",
  },
  {
    img: "/gimg-2.jpg",
  },
  {
    img: "/gimg-3.jpg",
  },
  // {
  //   img: "/gimg-1.jpg",
  // },
  // {
  //   img: "/gimg-2.jpg",
  // },
  // {
  //   img: "/gimg-3.jpg",
  // },
];

export default function FirstGallery() {
  return (
    <div className={styles.container}>
      {imgGallery.map((gallery, index) => (
        <Gallery data={gallery} key={index} />
      ))}
    </div>
  );
}
