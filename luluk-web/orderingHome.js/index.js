import React from "react";
import styles from "./styles.module.css";

import AdminSVG from "./svg/admin";
import CustomerSVG from "./svg/customer";
import DesainSVG from "./svg/desain";
import PackageSVG from "./svg/package";
import PrintSVG from "./svg/print";
import ProofSVG from "./svg/proof";
import WhatsappSVG from "./svg/whatsapp";

function Ordering() {
  return (
    <div className={styles.containerOrder}>
      <span className={styles.headerOrder}>Working Process</span>
      <div className={styles.rowOrder}>
        <div className={styles.contentOrder}>
          <span className={styles.numberOrder}>01</span>
          <AdminSVG className={styles.IconOrder} />
          <span className={styles.textHeader}>Konsumen Order</span>
          <span className={styles.textContent}>
            Konsumen mengorder pesanannya terlebih dahulu.
          </span>
        </div>
        <div className={styles.contentOrder}>
          <span className={styles.numberOrder}>02</span>
          <CustomerSVG className={styles.IconOrder} />
          <span className={styles.textHeader}>Kring Admin</span>
          <span className={styles.textContent}>
            Setelah order, customer perlu contact admin.
          </span>
        </div>
        <div className={styles.contentOrder}>
          <span className={styles.numberOrder}>03</span>
          <DesainSVG className={styles.IconOrder} />
          <span className={styles.textHeader}>Desain Editing</span>
          <span className={styles.textContent}>
            Setelah customer contact admin, kami melakukan proses editing.
          </span>
        </div>
      </div>
      <div className={styles.rowOrder}>
        <div className={styles.contentOrder}>
          <span className={styles.numberOrder}>04</span>
          <PackageSVG className={styles.IconOrder} />
          <span className={styles.textHeader}>Proofing</span>
          <span className={styles.textContent}>
            Customer perlu melakukan proofing agar produk bisa diproduksi.
          </span>
        </div>
        <div className={styles.contentOrder}>
          <span className={styles.numberOrder}>05</span>
          <PrintSVG className={styles.IconOrder} />
          <span className={styles.textHeader}>Cetak/Produksi</span>
          <span className={styles.textContent}>
            Setelah proofing, produk diproduksi.
          </span>
        </div>
        <div className={styles.contentOrder}>
          <span className={styles.numberOrder}>06</span>
          <ProofSVG className={styles.IconOrder} />
          <span className={styles.textHeader}>Bungkus</span>
          <span className={styles.textContent}>
            Setelah terproduksi, customer dapat membungkus produknya.
          </span>
        </div>
      </div>
      <div className={styles.subRowOrder}>
      <button className={styles.buttonOrdering}>
        {" "}
        <WhatsappSVG className={styles.whatsappIcons} />
        Whatsapp
      </button>
      </div>
    </div>
  );
}

export default Ordering;
