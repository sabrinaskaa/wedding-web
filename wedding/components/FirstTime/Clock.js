import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Clock = ({ deadline }) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
  
    const leading0 = (num) => {
      return num < 10 ? "0" + num : num;
    };
  
    const getTimeUntil = (deadline) => {
      const time = Date.parse(deadline) - Date.parse(new Date());
      if (time < 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      } else {
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
      }
    };
  
    useEffect(() => {
      setInterval(() => getTimeUntil(deadline), 1000);
  
      return () => getTimeUntil(deadline);
    }, [deadline]);
  
    return (
        <div className={styles.timerContainer}>
        <div className={styles.timerWrap}>
          <div className={styles.timer}>
            <span className={styles.number}>{leading0(days)}</span>
            <span className={styles.word}>Day(s)</span>
          </div>
          <div className={`${styles.timer} ${styles.timerColon}`}>:</div>
          <div className={styles.timer}>
            <span className={styles.number}>{leading0(hours)}</span>
            <span className={styles.word}>Hour(s)</span>
          </div>
        </div>
        <div
          className={`${styles.timer} ${styles.timerColon} ${styles.timerColonCenter}`}
        >
          :
        </div>
        <div className={styles.timerWrap}>
          <div className={styles.timer}>
            <span className={styles.number}>{leading0(minutes)}</span>
            <span className={styles.word}>Minute(s)</span>
          </div>
          <div className={`${styles.timer} ${styles.timerColon}`}>:</div>
          <div className={styles.timer}>
            <span className={styles.number}>{leading0(seconds)}</span>
            <span className={styles.word}>Second(s)</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Clock;