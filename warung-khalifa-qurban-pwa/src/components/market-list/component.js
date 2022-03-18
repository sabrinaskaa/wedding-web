import React from "react";

import { Card, Typography, Grid } from "@material-ui/core";

import badge from "../../vector/badge.svg";

function Component(props) {
  const { classes, pasar } = props;

  return (
    <>
      {props.noImage ? (
        props.list ? (
          <Grid item xs={12}>
            <div onClick={props.click} style={{ padding: "0px 14px" }}>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: "19px 15px ",
                  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)",
                  marginBottom: 5,
                }}
              >
                <Grid item xs={12} className={classes.gridName}>
                  <Typography style={{ fontSize: 14, fontWeight: "bold" }}>
                    <b>{pasar.name}</b>
                  </Typography>
                  <img src={badge} alt="Badge" />
                </Grid>
                <Grid item xs={12}>
                  <div
                    dangerouslySetInnerHTML={{ __html: pasar.description }}
                    style={{
                      color: "#707585",
                      fontSize: 10,
                      margin:
                        pasar.description === "Description"
                          ? "unset"
                          : "-10px 0px",
                    }}
                  />
                  <Typography
                    style={{
                      fontSize: 10,
                      paddingTop: "2%",
                      fontWeight: 500,
                      color: "#14181B",
                    }}
                  >
                    Alamat :
                  </Typography>
                  <Typography
                    style={{ color: "#707585", fontSize: 8, fontWeight: 400 }}
                  >
                    {pasar.address}
                  </Typography>
                </Grid>
              </div>
            </div>
          </Grid>
        ) : (
          <Card onClick={props.click} elevation={0} className={classes.paper}>
            <Grid container spacing={0} className={classes.container}>
              <Grid item xs={12} className={classes.contentGrid}>
                <Grid container spacing={0} className={classes.contentWrapper}>
                  <Grid item xs={12} className={classes.gridName}>
                    <Typography style={{ fontSize: 14 }}>
                      <b>{pasar.name}</b>
                    </Typography>
                    <img src={badge} alt="Badge" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography style={{ color: "#707585", fontSize: 10 }}>
                      {pasar.description}
                    </Typography>

                    <Typography style={{ fontSize: 12, paddingTop: "2%" }}>
                      <b> Alamat :</b>
                    </Typography>
                    <Typography style={{ color: "#707585", fontSize: 10 }}>
                      {pasar.address}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        )
      ) : (
        <Card onClick={props.click} elevation={0} className={classes.paper}>
          <Grid container spacing={0} className={classes.container}>
            <Grid item xs={3}>
              <img
                className={classes.media}
                src={pasar?.image?.url}
                alt="Gambar pasar"
              />
            </Grid>
            <Grid item xs={9} className={classes.contentGrid}>
              <Grid container spacing={0} className={classes.contentWrapper}>
                <Grid item xs={12} className={classes.gridName}>
                  <Typography style={{ fontSize: 14 }}>
                    <b>{pasar.name}</b>
                  </Typography>
                  <img src={badge} alt="Badge" />
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{ color: "#707585", fontSize: 10 }}>
                    {pasar.description}
                  </Typography>

                  <Typography style={{ fontSize: 12, paddingTop: "2%" }}>
                    <b> Alamat :</b>
                  </Typography>
                  <Typography style={{ color: "#707585", fontSize: 10 }}>
                    {pasar.address}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
}
export default Component;
