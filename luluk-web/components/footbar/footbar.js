import React from "react";
import styles from "./styles.module.css";

function Footbar() {
  return (
    <div className={styles.containerFootbar}>
      <div className={styles.rowFootbar}>
        {/* <iframe
        className={styles.iFrame}
          width="300"
          height="350"
          src="https://maps.google.com/maps?q=%20Griya%20Satria%20Indah%20Purwokerto&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          allowFullScreen=""
          loading="lazy"
        ></iframe> */}

        <iframe
          className={styles.iFrame}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1978.274588078652!2d109.23787651132376!3d-7.4043020664512635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655ef9869dc427%3A0x2156b89346b67233!2sGriya%20Satria%20Indah%20Purwokerto!5e0!3m2!1sid!2sid!4v1642828401207!5m2!1sid!2sid"
          width="300"
          height="350"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className={styles.rowFootbar}>
        <span className={styles.headShortcuts}>SHORTCUTS:</span>
        <span className={styles.contentShortcuts}>HOME</span>
        <span className={styles.contentShortcuts}>KEMITRAAN</span>
        <span className={styles.contentShortcuts}>RESELLER</span>
        <span className={styles.contentShortcuts}>HUBUNGI KAMI</span>
      </div>
      <div className={styles.rowFootbar}>
        <span className={styles.headContact}>CONTACT US:</span>
        <div className={styles.subRowFootbar}>
          <span className={styles.contentContact}>Phone:</span>
          <span className={styles.contentContact}>+62819 3122 12918</span>
        </div>
        <div className={styles.subRowFootbar}>
          <span className={styles.contentContact}>Email:</span>
          <span className={styles.contentContact}>
            vektorprintingpwt@gmail.com
          </span>
        </div>
        <div className={styles.subRowFootbar}>
          <span className={styles.contentContact}>Store:</span>
          <span className={styles.contentContact}>
            Griya Satria Indah Purwokerto
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footbar;
