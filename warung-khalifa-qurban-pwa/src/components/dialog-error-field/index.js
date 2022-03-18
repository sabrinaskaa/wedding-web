import React from "react";
import {
  Dialog,
  Slide,
  withStyles,
  Paper,
  Typography,
  makeStyles,
  Button
} from "@material-ui/core";
import Draggable from "react-draggable";
import { useIntl } from "react-intl";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const StyledPaper = withStyles({
  root: {
    bottom: "0px",
    position: "fixed",
    // left: 0,
    marginBottom: "unset",
    borderRadius: "16px 16px 0px 0px",
    paddingTop: "16px",
    margin: 0,
    width: "100%",
    maxWidth: 444
  }
})(Paper);

const useStyles = makeStyles({
  sliderBar: {
    width: "80px",
    height: "4px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    alignSelf: "center",
    cursor: "pointer",
    marginBottom: 24
  },
  button: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    color: process.env.REACT_APP_COLOR_FONT || "#000000",
    fontWeight: 700
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 24
  },
  infoText: {
    color: "#A6A6A6",
    fontWeight: 500,
    fontSize: "10px",
    alignSelf: "center"
  },
  infoBar: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    width: "4px"
  },
  itemTitle: {
    fontWeight: 600,
    fontSize: 12,
    alignSelf: "center"
  },
  timeShippingDescription: {
    fontWeight: 400,
    fontSize: 10
  },
  itemContainer: {
    paddingBottom: 16,
    marginBottom: 16,
    borderBottom: "1px solid #f5f5f5",
    display: "flex",
    cursor: "pointer"
  },
  radioContainer: {
    height: 250,
    overflowY: "auto"
  }
});

function CustomPaper(props) {
  return (
    <Draggable
      axis="y"
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      bounds={{ top: 0 }}
      onDrag={(e, data) => {
        if (data.y > 100) {
          props.close();
        }
      }}
    >
      <StyledPaper {...props} />
    </Draggable>
  );
}

const DialogPaymentMethod = ({ onClose, open }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
      // maxWidth="xs"
      disableScrollLock
      // fullWidth
      PaperComponent={CustomPaper}
      PaperProps={{ close: onClose }}
      aria-labelledby="draggable-dialog-title"
    >
      <div id="draggable-dialog-title" className={classes.sliderBar} />
      <div style={{ padding: 16, textAlign: "center" }}>
        <Typography className={classes.title}>
          {""}
          {intl.formatMessage({
            id: "fillData.requirements.1.0"
          })}
        </Typography>
        <Button
          className={classes.button}
          style={{
            backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
          }}
          variant="contained"
          fullWidth
          onClick={onClose}
        >
          {""}
          {intl.formatMessage({
            id: "fillData.requirements.2.0"
          })}
        </Button>
      </div>
    </Dialog>
  );
};

export default DialogPaymentMethod;
