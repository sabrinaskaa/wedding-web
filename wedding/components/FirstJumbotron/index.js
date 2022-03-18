import React from "react";
import styles from "./styles.module.css"

export default function FirstJumbotron(){
    return(
        <div className={styles.container}>
            <img className={styles.img} src="/img-1.jpg" alt="" />
            <div className={styles.rowCouple}>
                <span className={styles.coupleName}>Ariana & Dalton</span>
                <span className={styles.descOne}>we're getting married</span>
                <span className={styles.descTwo}>July 10th, 2022</span>
            </div>
        </div>
    )
}