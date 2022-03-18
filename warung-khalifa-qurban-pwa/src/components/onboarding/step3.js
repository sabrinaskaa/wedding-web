import React from "react";
import AvatarStep3 from "../../vector/step3.png";
import { Typography, makeStyles, useMediaQuery } from "@material-ui/core";
import { useIntl } from "react-intl";

const useStyles = makeStyles({
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 40
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
      <img src={AvatarStep3} alt="avatar" style={{ width: sm ? 150 : 218 }} />
      <Typography className={classes.title}>
        {intl.formatMessage({ id: "step3.title" })}
      </Typography>
    </div>
  );
}
