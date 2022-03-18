import React from "react";
import Link from 'next/link'
import styles from "./styles.module.css";
import { Instagram } from 'react-bootstrap-icons';

function FirstIdentity() {
  return (
    <div className={styles.container}>
      <div className={`${styles.row} ${styles.row1}`}>
        <div className={styles.frame}>
          <img className={styles.img} src="/g-1.jpg" alt="productImg" />
        </div>
        <div className={styles.textWrapper}>
          <div className={`${styles.name} ${styles.name1}`}>Ariana Grande</div>
          <div className={`${styles.capt} ${styles.capt1}`}>
            Putri dari Joan Grande dan Edward Butera
          </div>
          <Link href="https://www.instagram.com/arianagrande/">
          <a className={styles.linkIG} target="_blank">
          <Instagram className={styles.iconIG} />
          </a>
          </Link>
        </div>
      </div>
      <div className={`${styles.row} ${styles.row2}`}>
        <div className={`${styles.textWrapper} ${styles.textWrapper2}`}>
          <div className={`${styles.name} ${styles.name2}`}>Dalton Gomez</div>
          <div className={`${styles.capt} ${styles.capt2}`}>
            Putra dari Joan Grande dan Edward Butera
          </div>
          <Link href="https://www.instagram.com/arianagrande/">
          <a className={styles.linkIG} target="_blank">
          <Instagram className={styles.iconIG} />
          </a>
          </Link>
        </div>
        <div className={styles.frame}>
          <img className={styles.img} src="/b-1.jpg" alt="productImg" />
        </div>
      </div>
    </div>
  );
}

export default FirstIdentity;
