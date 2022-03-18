import React, { useState } from "react";
import styles from "./styles.module.css";
import { Modal, ModalContent } from "./Modal";

function ProfileGallery(props) {
  const [isOpen, setIsopen] = useState(false);
  const showModal = () => setIsopen((prev) => !prev);

  return (
    <div className={styles.cardProfile}>
      <Modal onOpen={showModal}>
        <img src={props.data.img} className={styles.imgProfile} />
        <div className={styles.middleOverlay}></div>
      </Modal>

      {isOpen && (
        <ModalContent onClose={() => setIsopen(false)}>
          <img src={props.data.img} className={styles.imgProfile} />
        </ModalContent>
      )}
    </div>
  );
}

export default ProfileGallery;
