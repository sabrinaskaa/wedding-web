import React from "react";
import styles from "./styles.module.css";

export default function Gallery(props) {
  return (
    <div className={styles.row}>
      <img className={styles.img} src={props.data.img} />
    </div>
  );
}
