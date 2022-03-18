import styles from "./styles.module.css";
import React from "react";
// import { Icon, IconContainer, Title } from "./components";
import TextContent from "./spantext.js";
// import { CountUp } from "use-count-up";

import TimSVG from "./svg/tim";
import QualitySVG from "./svg/quality";
import TimeSVG from "./svg/time";
import DiscountSVG from "./svg/discount";
import GuarantySVG from "./svg/guaranty";
import LaptopSVG from "./svg/laptop";
import TrustedSVG from "./svg/trusted";

// import TimSVG from "./svg/discount.svg";
// import QualitySVG from "./svg/quality.svg";
// import TimeSVG from "./svg/time.svg";
// import DiscountSVG from "./svg/discount.svg";
// import GuarantySVG from "./svg/guaranty.svg";
// import LaptopSVG from "./svg/laptop.svg";
// import TrustedSVG from "./svg/trusted.svg";

// const RatingList = [
//   TimSVG,
//   QualitySVG,
//   TimeSVG,
//   DiscountSVG,
//   GuarantySVG,
//   LaptopSVG,
//   TrustedSVG,
// ];

// const SpanText = [
//   {
// icon: TimSVG,
// icon: require('./svg/time.svg'),
//   text: "Tim Hebat",
// },
// {
// icon: QualitySVG,
// icon: require('./svg/discount.svg'),
//   text: "Kualitas Diutamakan",
// },
// {
// icon: TimeSVG,
// icon: require('./svg/time.svg'),
//   text: "Tepat Waktu",
// },
// {
// icon: DiscountSVG,
// icon: require('./svg/discount.svg'),
//   text: "Diskon & Hadiah",
// },
// {
// icon: GuarantySVG,
// icon: require('./svg/guaranty.svg'),
//   text: "Bergaransi",
// },
// {
// icon: LaptopSVG,
// icon: require('./svg/laptop.svg'),
//   text: "Konsultasi Desain",
// },
// {
// icon: TrustedSVG,
// icon: require('./svg/trusted.svg'),
//     text: "Terpercaya",
//   },
// ];

function RatingContent() {
  return (
    <div className={styles.containerRating}>
      <div className={styles.Up}>
        <div className={styles.rowRating}>
          {/* {RatingList.map((SVG, key) => (
          <div key={key}>
            <SVG />
          </div>
        ))} */}
          {/* {SpanText.map((texts, index) => (
          <TextContent data={texts} key={index} />
        ))} */}
          <TimSVG className={styles.Icon}/>
          <span className={styles.spanText}>Tim Hebat</span>
        </div>
        <div className={styles.rowRating}>
          <QualitySVG className={styles.Icon}/>
          <span className={styles.spanText}>Kualitas Diutamakan</span>
        </div>
        <div className={styles.rowRating}>
          <TimeSVG className={styles.Icon}/>
          <span className={styles.spanText}>Tepat Waktu</span>
        </div>
        <div className={styles.rowRating}>
          <DiscountSVG className={styles.Icon}/>
          <span className={styles.spanText}>Diskon & Hadiah</span>
        </div>
      </div>
      <div className={styles.Down}>
        <div className={styles.rowRating}>
          <GuarantySVG className={styles.Icon}/>
          <span className={styles.spanText}>Bergaransi</span>
        </div>
        <div className={styles.rowRating}>
          <LaptopSVG className={styles.Icon}/>
          <span className={styles.spanText}>Konsultasi Desain</span>
        </div>
        <div className={styles.rowRating}>
          <TrustedSVG className={styles.Icon}/>
          <span className={styles.spanText}>Terpercaya</span>
        </div>
      </div>
    </div>
  );
}

export default RatingContent;
