import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function FirstVenue() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.textWrapper}>
          <span className={styles.header}>venue</span>
          <span className={`${styles.date} ${styles.textctn}`}>
            Date : January, 28th 2022
          </span>
          <span className={`${styles.time} ${styles.textctn}`}>
            Time : 9.30 am - 11.30 am
          </span>
          <span className={`${styles.location} ${styles.textctn}`}>
            Location : Royal Park – Bukit Sari, Jl. Bukit Baladewa No. 22-24,{" "}
            <br />
            Kec. Banyumanik, Kota Semarang, Jawa Tengah
          </span>
          <Link  href="https://goo.gl/maps/JTFdwm1DERBpHhdo9">
            <a className={styles.linkLocation} target="_blank">
              <button className={styles.btnLocation}>view location</button>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.row}>
        <img className={styles.img} src="/venue.jpg" alt="" />
      </div>
    </div>
  );
}
