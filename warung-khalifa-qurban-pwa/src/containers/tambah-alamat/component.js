import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Button,
  FormControl,
  Paper
} from "@material-ui/core";

import AppBar from "../../components/app-bar";

function Component(props) {
  const { classes } = props;

  const [state, setState] = useState({
    locationName: "",
    name: "",
    phone: null,
    address: "",
    isPrimary: false
  });

  const handleSubmit = () => {
    setState(prevState => ({
      ...prevState,
      locationName: "Test",
      name: "test",
      phone: "08182821281",
      address: "test",
      isPrimary: true
    }));
  };

  useEffect(() => {}, [state]);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <AppBar title="Tambah Alamat" goBack divider />
        <Grid item xs={12} direction="column" className={classes.body}>
          <Grid item xs={12}>
            <FormControl className={classes.form} style={{ marginTop: 0 }}>
              <label className={classes.text12} htmlFor="simpan-sebagai">
                Simpan Alamat Sebagai
              </label>
              <TextField
                variant="outlined"
                id="simpan-sebagai"
                placeholder="Simpan Alamat Sebagai"
                style={{ margin: "8px 0" }}
                inputProps={{ className: classes.inputRoot }}
              />
            </FormControl>
            <FormControl className={classes.form}>
              <label className={classes.text12} htmlFor="nama-penerima">
                Nama Penerima
              </label>
              <TextField
                variant="outlined"
                id="nama-penerima"
                placeholder="Nama Penerima"
                style={{ margin: "8px 0" }}
                inputProps={{ className: classes.inputRoot }}
              />
            </FormControl>
            <FormControl className={classes.form}>
              <label className={classes.text12} htmlFor="no-telepon">
                No. Telepon
              </label>
              <TextField
                variant="outlined"
                id="no-telepon"
                placeholder="No. Telepon"
                type="number"
                style={{ margin: "8px 0" }}
                inputProps={{ className: classes.inputRoot }}
              />
            </FormControl>
            <FormControl className={classes.form}>
              <label className={classes.text12} htmlFor="alamat-lengkap">
                Alamat Lengkap
              </label>
              <TextField
                variant="outlined"
                id="alamat-lengkap"
                placeholder="Detail Alamat dengan Nomor Rumah, Warna dan lainnya"
                multiline
                rows="4"
                maxRows="4"
                style={{ margin: "8px 0" }}
                InputProps={{
                  classes: {
                    root: classes.inputRootMultiline
                  }
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Paper
          style={{
            position: "absolute",
            padding: 16,
            backgroundColor: "#fff",
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: 442
          }}
        >
          <Button
            disableRipple="true"
            disableFocusRipple="true"
            style={{
              width: "100%",
              background: "#FF7632",
              color: "#fff",
              fontWeight: "bold"
            }}
            onClick={handleSubmit}
          >
            <b>Simpan Alamat</b>
          </Button>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Component;
