import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import styles from "./styles.module.css";
import Clock from "./Clock";

export default function FirstTime() {
  let deadline = "Maret, 10, 2022";

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Save The Date</h1>
      <Clock deadline={deadline} />
    </div>
  );
}
