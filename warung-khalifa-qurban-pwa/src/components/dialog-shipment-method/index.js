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
import Info from "../../vector/information";
// import Draggable from "react-draggable";
import currencyFormatter from "../../utilities/currency-formatter";

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
    fontSize: "14px",
    marginBottom: "12px"
  },
  infoText: {
    color: "#A6A6A6",
    fontWeight: 500,
    fontSize: "10px",
    alignSelf: "center",
    marginLeft: 12
  },
  infoBar: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    width: "4px",
    marginRight: 12
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

const DialogShipmentMethod = ({
  onClose,
  open,
  onChange,
  selectedShipping,
  setValue,
  onSelect,
  data
}) => {
  const classes = useStyles();

  const getOptionTitle = service => {
    console.log(service);
    if (service.code === "delivery" && service.gateway === "local") {
      return `${service.label ||
        process.env.REACT_APP_SHIPPING_DELIVERY_LABEL ||
        service.name} ${service.serviceName} ${
        service.estimatedTimeMaximum === 1
          ? `(${service.estimatedTimeMinimum} Hari)`
          : `(${service.estimatedTimeMinimum} - ${service.estimatedTimeMaximum} Hari)`
      } `;
    } else {
      return `${service.label || service.name} ${service.serviceName} ${
        service.estimatedTimeMaximum === 1
          ? `(${service.estimatedTimeMinimum} Hari)`
          : `(${service.estimatedTimeMinimum} - ${service.estimatedTimeMaximum} Hari)`
      } `;
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
      maxWidth="xs"
      PaperComponent={StyledPaper}
      PaperProps={{ close: onClose }}
      aria-labelledby="draggable-dialog-title"
    >
      <div id="draggable-dialog-title" className={classes.sliderBar}>
        &nbsp;
      </div>
      <Typography className={classes.title}>Pilih Metode Pengiriman</Typography>
      <Box
        borderRadius="8px"
        border="1px solid #F5F5F5;"
        display="flex"
        marginBottom="24px"
        padding="10px"
      >
        <Info />
        <Typography className={classes.infoText}>
          {process.env.REACT_APP_SHIPPING_METHOD_CHECKOUT_INFO ||
            "Waktu tiba dihitung setelah paket diserahkan ke kurir."}
        </Typography>
      </Box>
      <div className={classes.radioContainer}>
        <RadioGroup
          name="shipment-time-method"
          value={`${selectedShipping?.name}.${selectedShipping?.code}`}
          // onChange={onChange}
        >
          {data.length < 1 && <Typography>Kurir tidak tersedia</Typography>}
          {data.map((service, index) => {
            return (
              <CustomRadio
                key={service.code}
                title={getOptionTitle(service)}
                value={`${service.name}.${service.code}`}
                price={currencyFormatter.format(service.cost)}
                onClick={v => {
                  onSelect({
                    id: service.id,
                    name: service.name,
                    serviceName: service.serviceName,
                    code: service.code,
                    estimatedTimeMinimum: service.estimatedTimeMinimum,
                    estimatedTimeMaximum: service.estimatedTimeMaximum,
                    cost: service.cost,
                    gateway: service.gateway,
                    label: service.label
                  });
                  localStorage.setItem(
                    "selectedShipping",
                    JSON.stringify({
                      id: service.id,
                      name: service.name,
                      serviceName: service.serviceName,
                      code: service.code,
                      estimatedTimeMinimum: service.estimatedTimeMinimum,
                      estimatedTimeMaximum: service.estimatedTimeMaximum,
                      cost: service.cost,
                      gateway: service.gateway,
                      label: service.label
                    })
                  );
                }}
              />
            );
          })}
        </RadioGroup>
      </div>
    </Dialog>
  );
};

export default DialogShipmentMethod;
