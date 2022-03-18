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
import { useIntl } from "react-intl";
// import Draggable from "react-draggable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledPaper = withStyles({
  root: {
    bottom: "0px",
    position: "fixed",
    marginBottom: "unset",
    borderRadius: "16px 16px 0px 0px",
    padding: "16px 16px 0px 16px",
    margin: 0,
    maxWidth: 412,
    width: "100%",
    "@media (max-width:444px)": {
      width: `calc(100% - 32px)`
    }
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

// function CustomPaper(props) {
//   return (
//     <Draggable
//       axis="y"
//       handle="#draggable-dialog-title"
//       cancel={'[class*="MuiDialogContent-root"]'}
//       bounds={{ top: 0 }}
//       onDrag={(e, data) => {
//         if (data.y > 100) {
//           props.close();
//         }
//       }}
//     >
//       <StyledPaper {...props} />
//     </Draggable>
//   );
// }

const CustomRadio = ({ value, imgSrc, title, onClick }) => {
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
      <Box width="100%" display="flex" justifyContent="space-between">
        <Typography className={classes.itemTitle}>{title}</Typography>
        <img
          src={imgSrc}
          alt="payment"
          style={{ maxWidth: "4rem", maxHeight: "4rem" }}
        />
      </Box>
    </Box>
  );
};

const DialogPaymentMethod = ({
  onClose,
  open,
  onChange,
  value,
  setValue,
  onSelect,
  data = null,
  selectedPayment
}) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
      disableScrollLock
      PaperComponent={StyledPaper}
      PaperProps={{ close: onClose }}
      aria-labelledby="draggable-dialog-title"
    >
      <div id="draggable-dialog-title" className={classes.sliderBar} />
      <Typography className={classes.title}>
        {""}
        {intl.formatMessage({
          id: "paynmentMethod.requirements.1.0"
        })}
      </Typography>
      <div className={classes.radioContainer}>
        <RadioGroup
          name="shipment-time-method"
          value={selectedPayment?.id}
          onChange={onChange}
        >
          {!data && ""}
          {data?.length < 1 && (
            <Typography>
              {""}
              {intl.formatMessage({
                id: "paynmentMethod.requirements.2.0"
              })}
            </Typography>
          )}
          {data?.map(pay => (
            <CustomRadio
              value={pay.id}
              title={pay.label || pay.name}
              imgSrc={pay.imageUrl}
              onClick={v => {
                // setValue(v);
                onSelect({
                  id: pay.id,
                  name: pay.name,
                  imageUrl: pay.imageUrl,
                  label: pay.label
                });
                localStorage.setItem(
                  "selectedPayment",
                  JSON.stringify({
                    id: pay.id,
                    name: pay.name,
                    imageUrl: pay.imageUrl,
                    label: pay.label
                  })
                );
              }}
            />
          ))}
        </RadioGroup>
      </div>
    </Dialog>
  );
};

export default DialogPaymentMethod;
