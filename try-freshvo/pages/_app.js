import '../styles/globals.css'
import styles from '../styles/style.module.css'
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function MyApp({ Component, pageProps }) {
  return (
    <Container maxWidth="xs" className={styles.Container}>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
