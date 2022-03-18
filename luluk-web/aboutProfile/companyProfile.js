import styles from "./styles.module.css";
import ProfileGallery from "./takeLook.js";

const TakeLook = [
  {
      img: "https://res.cloudinary.com/tpostr/image/upload/v1553865338/paparouna/IMG_7638-01.jpg"
  },
  {
      img: "https://res.cloudinary.com/tpostr/image/upload/v1553865338/paparouna/IMG_7621-01.jpg"
  },
  {
      img: "https://res.cloudinary.com/tpostr/image/upload/v1553865337/paparouna/IMG_7615-01.jpg"
  }
];

function CompanyProfile() {
  return (
    <div className={styles.wrapperProfile}>
      <div className={styles.containerProfileContent}>
        <span className={styles.profileHeader}>About Us</span>
        <span className={styles.profileHeader}>Company Profile</span>
        <p>
          <span className={styles.thisBold}>CV. Vektor Printing </span>
          merupakan vendor sablon kaos premium yang menyajikan kualitas terbaik
          kepada customer. Kami memproduksi kaos sablon plastisol, hoodie,
          crewneck, totebag, topi, kaos polo, kemeja, dll untuk keperluan brand,
          komunitas, grup kelas, tim kerja, dan sebagainya. Anda akan
          mendapatkan pengalaman membeli produk clothing yang berbeda dari
          sebelumnya.
        </p>
      </div>

      <div className={styles.wrapperCard}>
        {TakeLook.map((gallery, index) => (
          <ProfileGallery data={gallery} key={index} />
        ))}
      </div>
    </div>
  );
}

export default CompanyProfile;
