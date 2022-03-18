import React, { useState, useEffect } from 'react';
import styles from './styles.module.css'
import Image from 'next/image'

function Navbar() {
    const [navbar, setNavbar] = useState(false);

    const changeBackground = () => {
        if(window.scrollY >= 80){
            setNavbar(true);
        } else{
            setNavbar(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground, true);
        return () => window.removeEventListener('scroll', changeBackground);
      }, []);

    // window.addEventListener('scroll', changeBackground);

    return(
        <header className={navbar ? 'header active' : 'header'}>
            <nav className={styles.navbar}>
                <span className={styles.navTitle}>
                <Image src="/logo.png" alt="me" width="160" height="160" />
                </span>
                <div className={styles.navToggle}>
                    <span></span>
                    <span></span>
                </div>
                <div className={styles.navMenu}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>HOME</li>
                        <li className={styles.navItem}>KEMITRAAN</li>
                        <li className={styles.navItem}>RESELLER</li>
                        <li className={styles.navItem}>HUBUNGI KAMI</li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar