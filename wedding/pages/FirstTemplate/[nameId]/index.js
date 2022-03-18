import React, { useState } from "react";
import styles from "../styles.module.css";
import ModalContent from "../index.js";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "../../../actions/store.js";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

import FirstJumbotron from "../../../components/FirstJumbotron/index.js";
import FirstIdentity from "../../../components/FirstIdentity/index.js";
import FirstTime from "../../../components/FirstTime/index.js";
import FirstVenue from "../../../components/FirstVenue/index.js";
import FirstGallery from "../../../components/FirstGallery/index.js";
import PostMessages from "../../../components/FirstJournal/PostMessages.js";

export default function ModalPopUp() {
  const [isOpen, setIsopen] = useState(true);
  const router = useRouter();
  const nameId = router.query.nameId;

  return (
    <div className={styles.ModalContainer}>
      {isOpen && (
        <ModalContent onClose={() => setIsopen(false)}>
          <img className={styles.img} src="/img-2.jpg" alt="" />
        </ModalContent>
      )}

      <FirstJumbotron />
      <FirstIdentity />
      <FirstTime />
      <FirstVenue />
      <FirstGallery />
      <Provider store={store}>
        <PostMessages />
        <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
      </Provider>
    </div>
  );
}
