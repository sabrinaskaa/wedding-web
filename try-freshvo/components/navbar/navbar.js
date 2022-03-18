import styles from './styles.module.css'
import Image from 'next/image'

function Navbar(){
    return(
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <p className={styles.pHeader}>Kamu berbelanja di</p>
                <div className={styles.tempatHeader}>
                    <div className={styles.locHeader}>
                        <svg className={styles.locIcon} viewBox="0 0 18 14" fill="none"><path d="M17.8381 4.25015L15.0808 -0.000488281H3.04738L0.290039 4.24919C0.290039 5.19887 1.09195 5.99951 2.04523 5.99951C2.99756 5.99951 3.80043 5.24951 3.80043 4.24919C3.80043 5.19887 4.60234 5.99951 5.55563 5.99951C6.50795 5.99951 7.31082 5.24951 7.31082 4.24919C7.31082 5.19887 8.11273 5.99951 9.06602 5.99951C10.0183 5.99951 10.8212 5.24951 10.8212 4.24919C10.8212 5.19887 11.6231 5.99951 12.5764 5.99951C13.5287 5.99951 14.3316 5.24951 14.3316 4.24919C14.3316 5.19887 15.1335 5.99951 16.0868 5.99951C17.0363 5.99951 17.8382 5.24951 17.8382 4.25013L17.8381 4.25015Z" fill="#00A739"></path><path d="M16.0839 8.0002C15.5321 8.0002 15.031 7.89988 14.5797 7.7002V11.4999H3.54846V7.7002C3.09721 7.89988 2.59614 8.0002 2.04428 8.0002C1.89387 8.0002 1.69363 8.0002 1.54321 7.95051V13.4995H16.584L16.585 7.94955C16.4346 8.00017 16.2343 8.00017 16.0839 8.00017L16.0839 8.0002Z" fill="#00A739"></path></svg>
                        <span className={styles.locPlace}>Freshvo Cilandak (Jabodetabek)</span>
                    </div>
                    <div className={styles.changeLoc}>
                        <p className={styles.pChange}>Ganti</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="12" viewBox="0 0 17 12" fill="none">
                            <path d="M5.22144 1.44688L5.90772 0.7625C6.19916 0.471875 6.67548 0.46875 6.97005 0.759375L11.7301 5.46875C12.0278 5.7625 12.0278 6.24063 11.7301 6.53438L6.97005 11.2406C6.67548 11.5312 6.20229 11.5312 5.90772 11.2375L5.22144 10.5531C4.91747 10.25 4.93001 9.75937 5.24651 9.46875L7.67827 7.24687H1.67409C1.2573 7.24687 0.921997 6.9125 0.921997 6.49687V5.49687C0.921997 5.08125 1.2573 4.74687 1.67409 4.74687H7.67513L5.24338 2.525C4.93001 2.24063 4.91747 1.74688 5.22144 1.44688ZM16.9666 9V3C16.9666 1.34375 15.6191 0 13.9582 0H11.3259C11.1191 0 10.9499 0.16875 10.9499 0.375V1.625C10.9499 1.83125 11.1191 2 11.3259 2H13.9582C14.5129 2 14.961 2.44688 14.961 3V9C14.961 9.55313 14.5129 10 13.9582 10H11.3259C11.1191 10 10.9499 10.1687 10.9499 10.375V11.625C10.9499 11.8313 11.1191 12 11.3259 12H13.9582C15.6191 12 16.9666 10.6562 16.9666 9Z" fill="#2F9CF1"/>
                        </svg>
                    </div>
                </div>
                <div className={styles.searchBar}>
                    <div className={styles.searchIcon}>
                        <svg className={styles.MuiSvgIcon} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#707585"></path></svg>
                    </div>
                    <div className={styles.inputSrc} inputprops="[object Object]">
                        <input
                            type="text"
                            id="header-search"
                            className={styles.srcHeader}
                            placeholder="Cari produk yang kamu cari ..."
                            name="s" 
                        />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar