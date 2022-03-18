import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function HomeReact() {
  return (
    <div className={styles.container}>
      <img className={styles.img} src="/home.jpg" />
      <div className={styles.wrapper}>
        <span className={styles.title}>Wedding Invitation</span>
        <span className={styles.subtitle}>Lihat Template</span>
        <Link href="../FirstTemplate/Guest">
          <button className={styles.button}>Go to template!</button>
        </Link>
      </div>
    </div>
  );
}
