import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import HomeReact from "../components/Home/index.js";

export default function Home() {
  return (
    <div className={styles.Container}>
      <HomeReact />
    </div>
  );
}
