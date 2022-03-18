import React from "react";
import {
  Dialog,
  Slide,
  withStyles,
  Paper,
  Typography,
  makeStyles,
  Box,
  RadioGroup,
  Radio
} from "@material-ui/core";
import Draggable from "react-draggable";
import InfoIcon from "../../vector/information-icon.svg";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const StyledPaper = withStyles({
  root: {
    bottom: "0px",
    position: "absolute",
    marginBottom: "unset",
    borderRadius: "16px 16px 0px 0px",
    padding: "16px 16px 0px 16px",
    width: "100%"
  }
})(Paper);

const StyledRadio = withStyles({
  root: {
    padding: "unset",
    width: "24px",
    height: "24px",
    alignSelf: "center",
    marginRight: 16
  }
})(Radio);

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
  title: {
    fontWeight: 600,
    fontSize: "14px",
    marginBottom: "12px"
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
  timeShipping: {
    fontWeight: 600,
    fontSize: 12,
    marginBottom: 8
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

const CustomRadio = ({ value, price, description, title, onClick }) => {
  const classes = useStyles();
  return (
    <Box className={classes.itemContainer} onClick={() => onClick(value)}>
      <StyledRadio
        value={value}
        color={process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"}
        checkedIcon={
          <div
            style={{
              backgroundColor: "#f5f5f5",
              width: 24,
              height: 24,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                backgroundColor:
                  process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                width: 16,
                height: 16,
                borderRadius: "50%"
              }}
            />
          </div>
        }
        icon={
          <div
            style={{
              backgroundColor: "#f5f5f5",
              width: 24,
              height: 24,
              borderRadius: "50%"
            }}
          />
        }
      />
      <Box>
        <Typography className={classes.timeShipping}>{title}</Typography>
        <Typography
          className={classes.timeShippingDescription}
          style={{ marginBottom: 4, fontWeight: 500 }}
        >
          {price}
        </Typography>
        {description && (
          <Typography className={classes.timeShippingDescription}>
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const DialogCourier = ({
  onClose,
  open,
  onChange,
  value,
  setValue,
  onSelect
}) => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth
      PaperComponent={CustomPaper}
      PaperProps={{ close: onClose }}
      aria-labelledby="draggable-dialog-title"
    >
      <div id="draggable-dialog-title" className={classes.sliderBar} />
      <Typography className={classes.title}>Pilih Kurir</Typography>
      <Box
        borderRadius="8px"
        border="1px solid #F5F5F5;"
        display="flex"
        marginBottom="24px"
      >
        <div className={classes.infoBar} />
        <img style={{ width: 16, margin: 12 }} src={InfoIcon} alt="info-icon" />
        <Typography className={classes.infoText}>
          Waktu tiba dihitung setelah paket diserahkan ke kurir
        </Typography>
      </Box>
      <RadioGroup name="shipment-time-method" value={value} onChange={onChange}>
        <CustomRadio
          value="jne"
          title="JNE"
          price="10.000"
          onClick={v => {
            setValue(v);
            onSelect();
          }}
        />
        <CustomRadio
          value="jnt"
          title="J&T"
          price="12.000"
          onClick={v => {
            setValue(v);
            onSelect();
          }}
        />
      </RadioGroup>
    </Dialog>
  );
};

export default DialogCourier;
