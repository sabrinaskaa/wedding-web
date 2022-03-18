import React from "react";
import AvatarStep2 from "../../vector/step2.png";
import { Typography, makeStyles, useMediaQuery } from "@material-ui/core";
import { useIntl } from "react-intl";

const useStyles = makeStyles({
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 40
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 16
  }
});

export default function Step2() {
  const classes = useStyles();
  const sm = useMediaQuery("(max-width: 425px)");
  const intl = useIntl();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 36
      }}
    >
      <img src={AvatarStep2} alt="avatar" style={{ width: sm ? 150 : 218 }} />
      <Typography className={classes.title}>
        {intl.formatMessage({ id: "step2.title" })}
      </Typography>
      <Typography className={classes.subtitle}>
        {intl.formatMessage({ id: "step2.subtitle" })}
      </Typography>
    </div>
  );
}
