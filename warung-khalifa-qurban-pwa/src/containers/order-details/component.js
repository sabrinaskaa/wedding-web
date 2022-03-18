import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  Box,
  makeStyles,
  Button,
  withStyles,
  CardMedia
} from "@material-ui/core";
import AppBar from "../../components/app-bar";
import CursorIcon from "../../vector/cursorIcon";
import { useIntl } from "react-intl";
import PickupIcon from "../../vector/pickupIcon";
import MoreIcon from "@material-ui/icons/ExpandMoreRounded";
import {
  getOrderDetails,
  cancelOrder,
  getOrderDetailGuest
} from "../../services/orders";
import Skeleton from "@material-ui/lab/Skeleton";
import CurrencyFormatter from "../../utilities/currency-formatter";
import { useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { withTransaction } from "@elastic/apm-rum-react";
import {
  getOrderPaymentStatusBackgroundColor,
  getOrderStatusPaymentLabel
} from "../../utils/order";

const CustomPaper = props => {
  return (
    <Box
      padding="16px"
      marginBottom="8px"
      {...props}
      style={{ backgroundColor: "white" }}
    >
      {props.title && (
        <Box
          display="flex"
          justifyContent="space-between"
          paddingBottom="16px"
          borderBottom="1px solid #f5f5f5"
          marginBottom="16px"
        >
          <Typography style={{ fontWeight: 600, fontSize: 14 }}>
            {props.title}
          </Typography>
          {props.subTitle && (
            <Typography
              style={{ fontWeight: 600, fontSize: 12, color: "#808080" }}
            >
              {props.subTitle}
            </Typography>
          )}
        </Box>
      )}
      {props.children}
    </Box>
  );
};

const itemListClasses = makeStyles({
  title: { fontWeight: 600, fontSize: 14, marginBottom: 8 },
  media: {
    height: 60,
    width: 60,
    display: "flex",
    marginRight: 16
  },
  cardMediaDigital: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    width: "100%",
    padding: "5px 10px",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 5,
    borderRadius: "0px 0px 5px 5px"
  },
  cardMedia: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    width: "100%",
    justifyContent: "flex-end"
  },
  note: { fontWeight: 400, fontSize: 10 },
  noteValue: { fontWeight: 600, fontSize: 10 },
  price: { fontWeight: 600, fontSize: 14, marginTop: 18 }
});

const ItemList = ({
  imageUrl,
  physical,
  name,
  note,
  price,
  addons,
  addonNote,
  quantity
}) => {
  const classes = itemListClasses();
  const intl = useIntl();

  return (
    <Box
      display="flex"
      paddingBottom="25px"
      borderBottom="1px solid #f5f5f5"
      marginBottom="16px"
      justifyContent="space-between"
    >
      <div style={{ display: "flex" }}>
        <CardMedia
          className={classes.media}
          image={imageUrl ? imageUrl : "https://via.placeholder.com/150"}
        >
          <div className={classes.cardMedia}>
            {physical === null && (
              <div className={classes.cardMediaDigital}>
                {""}
                {intl.formatMessage({
                  id: "orderDetails.requirements.1.0"
                })}
              </div>
            )}
          </div>
        </CardMedia>
        {addons?.length === 0 ? (
          <div>
            <Typography className={classes.title}>{name}</Typography>
            {/* <Typography className={classes.note}>
          Pilihan Kulit Kentang :{" "}
          <span className={classes.noteValue}>Kulit Dikupas</span>
        </Typography> */}

            <Typography className={classes.note}>
              {""}
              {intl.formatMessage({
                id: "orderDetails.requirements.2.0"
              })}{" "}
              <span className={classes.noteValue}>{note ? note : "-"}</span>
            </Typography>
            <Typography className={classes.price}>
              {CurrencyFormatter.format(price)}
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.title}>{name}</Typography>
            {/* <Typography className={classes.note}>
          Pilihan Kulit Kentang :{" "}
          <span className={classes.noteValue}>Kulit Dikupas</span>
        </Typography> */}

            {addons?.map(data => (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography className={classes.note}>
                  {data.name} :{" "}
                  <span className={classes.noteValue}>
                    {data?.option?.name}
                  </span>
                </Typography>
              </div>
            ))}

            <Typography className={classes.note}>
              {""}
              {intl.formatMessage({
                id: "orderDetails.requirements.2.0"
              })}{" "}
              <span className={classes.noteValue}>
                {addonNote !== null ? addonNote : "-"}
              </span>
            </Typography>
            <Typography className={classes.price}>
              {CurrencyFormatter.format(
                price +
                  addons
                    ?.map(data => data.option.price)
                    ?.reduce((x, y) => x + y)
              )}
            </Typography>
          </div>
        )}
      </div>
      <div>
        <Typography style={{ fontSize: 18, fontWeight: 700 }}>
          x{quantity}
        </Typography>
      </div>
    </Box>
  );
};

const CustomButton = withStyles({
  root: {
    padding: "12px 0",
    marginBottom: "16px",
    borderRadius: 8
  },
  text: {
    color: "#808080"
  },
  label: {
    textTransform: "initial",
    fontWeight: 600,
    fontSize: 14
  },
  containedPrimary: {
    color: "white"
  }
})(Button);

const KeyValue = ({ left, right, rightHighlight, totalPayment }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    marginBottom="8px"
    style={totalPayment && { borderTop: "1px dashed #f5f5f5", paddingTop: 16 }}
  >
    <Typography style={{ fontWeight: totalPayment ? 600 : 400, fontSize: 12 }}>
      {left}
    </Typography>
    <Typography
      style={{
        fontWeight: 600,
        fontSize: 12,
        whiteSpace: "pre-line",
        textAlign: "right",
        color: rightHighlight
          ? process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
          : "initial"
      }}
    >
      {right}
    </Typography>
  </Box>
);

const StyledSkeleton = props => (
  <Skeleton
    {...props}
    style={{ ...props.style, borderRadius: 4 }}
    variant="rect"
  />
);

const LoadingSkeleton = () => (
  <>
    <Container
      component="main"
      maxWidth="xs"
      style={{
        padding: 0,
        paddingTop: 64,
        backgroundColor: "#FAFAFA",
        borderLeft: "1px solid #f1f1f1",
        borderRight: "1px solid #f1f1f1"
      }}
    >
      <CssBaseline />
      <AppBar
        // title={`${intl.formatMessage({ id: "voucherCart.requirements.3.0" })}`}
        goBack={true}
      />
      <CustomPaper>
        <Box display="flex">
          <StyledSkeleton width={40} height={40} />
          <Box marginLeft="16px">
            <StyledSkeleton
              style={{ marginBottom: 6 }}
              width={108}
              height={20}
            />
            <StyledSkeleton width={82} height={14} />
          </Box>
        </Box>
      </CustomPaper>
      <CustomPaper
        // title={`${intl.formatMessage({ id: "voucherCart.requirements.4.0" })}`}
      >
        <Box
          display="flex"
          paddingBottom="24px"
          borderBottom="1px solid #f5f5f5"
          marginBottom="16px"
        >
          <StyledSkeleton width={60} height={60} />
          <Box marginLeft="16px">
            <StyledSkeleton
              style={{ marginBottom: 8 }}
              width={267}
              height={21}
            />
            <StyledSkeleton
              style={{ marginBottom: 4 }}
              width={177}
              height={15}
            />
            <StyledSkeleton
              style={{ marginBottom: 18 }}
              width={177}
              height={15}
            />
            <StyledSkeleton width={88} height={22} />
          </Box>
        </Box>
        <Box
          display="flex"
          paddingBottom="24px"
          borderBottom="1px solid #f5f5f5"
          marginBottom="16px"
        >
          <StyledSkeleton width={60} height={60} />
          <Box marginLeft="16px">
            <StyledSkeleton
              style={{ marginBottom: 8 }}
              width={267}
              height={21}
            />
            <StyledSkeleton
              style={{ marginBottom: 4 }}
              width={177}
              height={15}
            />
            <StyledSkeleton
              style={{ marginBottom: 18 }}
              width={177}
              height={15}
            />
            <StyledSkeleton width={88} height={22} />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <StyledSkeleton width={104} height={24} />
        </Box>
      </CustomPaper>
    </Container>
  </>
);


const StatusOrder = ({ status }) => (
  <div
    style={{
      backgroundColor: getOrderPaymentStatusBackgroundColor(status)
    }}
  >
    <Typography
      style={{
        color: "white",
        fontSize: 12,
        fontWeight: 600,
        textAlign: "center",
        padding: 8
      }}
    >
      {getOrderStatusPaymentLabel(status)}
    </Typography>
  </div>
);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const OrderDetail = props => {
  const [isMoreTwoItems, setIsMoreTwoItems] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPickup, setIsPickup] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [hideMoreItem, setHideMoreItem] = useState(false);
  const { classes } = props;
  const query = useQuery();
  const email = query.get("email");
  const intl = useIntl();
  const user = JSON.parse(localStorage.getItem("users"));
  const label = process.env.REACT_APP_SHIPPING_COST_LABEL || "Ongkir";

  useEffect(() => {
    const GetData = async () => {
      const response = await getOrderDetails(props.match.params.id);

      setData(response.data.data);
      setIsLoading(false);
    };
    const GetDataGuest = async () => {
      const response = await getOrderDetailGuest(props.match.params.id, email);

      setData(response.data.data);
      setIsLoading(false);
    };

    if (email?.length > 0) {
      GetDataGuest();
    } else {
      GetData();
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data?.shippings[0]?.shippingChannel?.code === "pickup")
      setIsPickup(true);
  }, [data]);

  if (isLoading) return <LoadingSkeleton />;

  const getShippingMethod = () => {
    if (
      data.shippings[0]?.shippingChannel?.code === "delivery" &&
      data.shippings[0]?.shippingChannel?.gateway === "local"
    ) {
      return `${data.shippings[0]?.shippingChannel?.label ||
        process.env.REACT_APP_SHIPPING_DELIVERY_LABEL ||
        data.shippings[0]?.shippingChannel?.name ||
        "-"} • ${data.shippings[0]?.shippingChannel?.service.name || "-"}`;
    } else {
      return `${data.shippings[0]?.shippingChannel?.label ||
        data.shippings[0]?.shippingChannel?.name ||
        "-"} • ${data.shippings[0]?.shippingChannel?.service.name || "-"}`;
    }
  };

  const distanceLabel = data => {
    if (data?.shippings[0]?.shippingChannel?.code === "delivery") {
      return (
        <div>
          {label}{" "}
          <span style={{ textTransform: "uppercase" }}>
            ({data.distance.value} {data.distance.unit})
          </span>
        </div>
      );
    }
    return label;
  };

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <AppBar title="Detail Transaksi" goBack={true} />
        <StatusOrder status={data} />

        <CustomPaper>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex">
              {isPickup ? <PickupIcon /> : <CursorIcon />}
              <Box marginLeft="16px">
                <Typography className={classes.shippingTypeText}>
                  {isPickup ? "Ambil Sendiri" : "Pesan Antar"}
                </Typography>
                <Typography className={classes.shippingIdText}>
                  {data.id}
                </Typography>
              </Box>
            </Box>
            {/* <Button
              style={{ alignSelf: "center" }}
              classes={{
                label: classes.checkStatusText,
                outlined: classes.buttonCheckStatus,
              }}
              variant="outlined"
              color="primary"
            >
              Cek Status
            </Button> */}
          </Box>
        </CustomPaper>

        {isPickup && (
          <CustomPaper>
            <Typography className={classes.marketName}>
              {data.location.name}
            </Typography>
            <Typography
              className={classes.marketLocation}
            >{`${data.location.address} ${data.location.city}`}</Typography>
            {/* <Box display="flex" marginTop="16px">
              <Button
                style={{ marginRight: 8 }}
                classes={{
                  label: classes.checkStatusText,
                  outlined: classes.buttonCheckStatus,
                }}
                variant="outlined"
                color="primary"
              >
                Petunjuk Arah
              </Button>
              <Button
                classes={{
                  label: classes.checkStatusText,
                  outlined: classes.buttonCheckStatus,
                }}
                variant="outlined"
                color="primary"
              >
                Telepon
              </Button>
            </Box> */}
          </CustomPaper>
        )}

        <CustomPaper
          title={`${intl.formatMessage({
            id: "voucherCart.requirements.4.0"
          })}`}
          subTitle={new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
          }).format(new Date(data.createdAt))}
        >
          {data.items.map((item, index) => {
            if (!isMoreTwoItems) {
              // eslint-disable-next-line
              if (index > 1) return;
              return (
                <ItemList
                  key={index}
                  imageUrl={item.image.url}
                  physical={item.size}
                  name={item.name}
                  price={item.price}
                  note={data.customerNote}
                  addons={item.addons}
                  addonNote={item?.note}
                  quantity={item.quantity}
                />
              );
            } else {
              return (
                <ItemList
                  key={index}
                  imageUrl={item.image.url}
                  physical={item.size}
                  name={item.name}
                  price={item.price}
                  note={data.customerNote}
                  addons={item.addons}
                  addonNote={item?.note}
                  quantity={item.quantity}
                />
              );
            }
          })}
          {data.items.length > 2 && !hideMoreItem && (
            <Box display="flex" justifyContent="center">
              <Button
                color="primary"
                classes={{ label: classes.moreItemText }}
                endIcon={<MoreIcon />}
                onClick={() => {
                  setIsMoreTwoItems(true);
                  setHideMoreItem(true);
                }}
              >
                +{data.items.length - 2} {""}
                {intl.formatMessage({ id: "voucherCart.requirements.5.0" })}
              </Button>
            </Box>
          )}
        </CustomPaper>

        {!isPickup && (
          <CustomPaper
            title={`${intl.formatMessage({
              id: "voucherCart.requirements.23.0"
            })}`}
          >
            {!isPickup && (
              <KeyValue
                left={`${intl.formatMessage({
                  id: "voucherCart.requirements.7.0"
                })}`}
                right={getShippingMethod()}
              />
            )}
            <KeyValue
              left={`${intl.formatMessage({
                id: "voucherCart.requirements.8.0"
              })}`}
              right={data.shippings[0]?.trackingNumber || "-"}
            />
            <KeyValue
              left={`${intl.formatMessage({
                id: "voucherCart.requirements.6.0"
              })}`}
              right={`${data.shipping.name} 
              +${data.shipping.phone} 
              ${data.shipping.address},  
              ${data.shipping.city}, ${data.shipping.province}, ${data.shipping.postcode}`}
            />
          </CustomPaper>
        )}

        <CustomPaper
          title={`${intl.formatMessage({
            id: "voucherCart.requirements.10.0"
          })}`}
        >
          {!isPickup && (
            <KeyValue
              left={`${intl.formatMessage({
                id: "voucherCart.requirements.11.0"
              })}`}
              right={data.payments[0].paymentChannel.name}
            />
          )}
          <KeyValue
            left={`${intl.formatMessage({
              id: "voucherCart.requirements.12.0"
            })}`}
            right={CurrencyFormatter.format(data.subTotalPrice)}
          />
          <KeyValue
            left={`${intl.formatMessage({
              id: "voucherCart.requirements.13.0"
            })}`}
            right={CurrencyFormatter.format(data.totalDiscount)}
            rightHighlight
          />
          <KeyValue
            left={distanceLabel(data)}
            right={
              !isPickup ? CurrencyFormatter.format(data.totalShipping) : "-"
            }
          />
          <KeyValue
            left={`${intl.formatMessage({
              id: "voucherCart.requirements.14.0"
            })}`}
            right={data.totalPoints}
          />
          <KeyValue
            left={`${intl.formatMessage({
              id: "voucherCart.requirements.15.0"
            })}`}
            right={CurrencyFormatter.format(data.totalPrice)}
            totalPayment
          />
        </CustomPaper>

        <CustomPaper marginBottom="unset" paddingBottom="unset">
          <Box display="flex" flexDirection="column">
            {data.status === "PENDING" && (
              <CustomButton
                onClick={() => (window.location = data.payments[0].url)}
                color="primary"
                variant="contained"
                disableElevation={true}
              >
                {""}
                {intl.formatMessage({
                  id: "voucherCart.requirements.16.0"
                })}
              </CustomButton>
            )}
            {data.status === "CANCELLED" && (
              <CustomButton
                onClick={() => props.history.push("/")}
                color="primary"
                variant="contained"
                disableElevation={true}
              >
                {""}
                {intl.formatMessage({
                  id: "voucherCart.requirements.17.0"
                })}
              </CustomButton>
            )}
            <CustomButton
              onClick={() => props.history.push("/help")}
              color="primary"
              variant="outlined"
            >
              {""}
              {intl.formatMessage({
                id: "voucherCart.requirements.18.0"
              })}
            </CustomButton>
            {data.status !== "CANCELLED" && (
              <CustomButton
                onClick={() => setDialog(true)}
                variant="text"
                style={{
                  display:
                    data.status !== "PENDING" ||
                    (data.status === "PENDING" && !user)
                      ? "none"
                      : ""
                }}
              >
                {""}
                {intl.formatMessage({
                  id: "voucherCart.requirements.19.0"
                })}
              </CustomButton>
            )}
          </Box>
        </CustomPaper>
        <Dialog open={dialog} onClose={() => setDialog(false)}>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ textAlign: "center" }}
            >
              <Typography>
                {""}
                {intl.formatMessage({
                  id: "voucherCart.requirements.20.0"
                })}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions align="center">
            <Button
              onClick={() => setDialog(false)}
              color="primary"
              style={{
                backgroundColor: "none",
                color: "#9FA3A6",
                fontWeight: "bold"
              }}
            >
              {""}
              {intl.formatMessage({
                id: "voucherCart.requirements.21.0"
              })}
            </Button>
            <Button
              onClick={async () => {
                try {
                  const response = await cancelOrder(data.id);
                  if (response.data) {
                    window.location.reload();
                  }
                } catch (error) {
                  alert(
                    `${intl.formatMessage({
                      id: "voucherCart.requirements.24.0"
                    })}`
                  );
                  setDialog(false);
                }
              }}
              autoFocus
              style={{
                fontWeight: "bold",
                color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
              }}
            >
              {""}
              {intl.formatMessage({
                id: "voucherCart.requirements.22.0"
              })}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default withTransaction("OrderDetail", "component")(OrderDetail);
