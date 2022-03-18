import { NoEncryption } from "@material-ui/icons";
import React from "react";
import styles from "./styles.module.css";
import { useRouter } from 'next/router'

const modal = {
  position: "fixed",
  zIndex: 1,
  left: 0,
  right: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
};

const close = {
  cursor: "pointer",
};

const modalContent = {
  display: "flex",
  width: "100%",
  height: "auto",
  margin: 0,
};

export default function ModalContent({ onClose, children }) {
  const router = useRouter()
  const nameId = router.query.nameId

  return (
    <div style={modal}>
      <div className={styles.WrapperModal}>
        <div className={styles.rowModal}>
          <span className={styles.nameInModal}>Dear {nameId},</span>
          <span className={styles.invitedWedding}>
            <span className={styles.wordOne}>YOU ARE INVITED!&nbsp;</span>
            <span className={styles.wordOne}>WEDDING CELEBRATION OF</span>
          </span>
          <span className={styles.nameCouple}>Ariana & Dalton</span>
        </div>
        <div className={styles.rowModal}>
          <span style={close} onClick={onClose}>
            <button className={styles.btnOpenModal}>OPEN INVITATION</button>
          </span>
        </div>
      </div>
      <div style={modalContent}>{children}</div>
    </div>
  );
};
