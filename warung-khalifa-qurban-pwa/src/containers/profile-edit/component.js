import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "../../components/app-bar";

function Component(props) {
  const { classes, history } = props;
  return (
    <React.Fragment>
      <AppBar title="Akun Saya" goBack />
      <Paper
        style={{
          backgroundImage: `url(${"http://41.media.tumblr.com/e92fd2d2da98870681f03e8c8e90d250/tumblr_nc0mcyVtWJ1rzjb4go1_500.jpg"})`
        }}
        className={classes.root}
      >
        <Grid container justify="center" alignItems="center">
          <Grid align="center" item xs>
            <Avatar
              alt="Remy Sharp"
              src="https://i.ibb.co/55Zm7C0/37918118-1917061908378084-7618657493543026688-n.jpg"
              className={classes.bigAvatar}
            />
          </Grid>
        </Grid>
      </Paper>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <List className={classes.root}>
          <Typography variant="subtitle1" display="block" gutterBottom>
            Profil
          </Typography>
          <Divider />
          <TextField
            id="standard-full-width"
            label="Nama Lengkap"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="standard-full-width"
            label="Tanggal lahir"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="standard-full-width"
            label="Email"
            fullWidth
            type="number"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="standard-full-width"
            label="No.Telephone"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            className={classes.container}
            id="standard-full-width"
            label="Alamat"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
        </List>
      </Container>
      <div className={classes.stickToBottom}>
        <Paper className={classes.paperbtn}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                className={classes.button}
                variant="contained"
                fullWidth
                onClick={() => history.push("/profile")}
              >
                Selesai
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
}

export default Component;
