const styles = theme => ({
  icon: {
    paddingTop: 10
  },
  kupon: {
    marginTop: 15,
    marginRight: 10
  },
  paperbtn: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 442,
    borderRadius: 0
  },
  container: {
    paddingTop: 64,
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 150,
    padding: 0,
    maxWidth: 444,
    minHeight: "100vh",
    height: "100%",
    backgroundColor: "#FAFAFA",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  button: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    color: process.env.REACT_APP_COLOR_FONT || "#000000",
    fontWeight: 700
  },
  pasar: {
    marginTop: 0
  },
  transfer: {
    marginTop: 70
  },
  rumah: {
    marginTop: 5
  },
  tf: {
    marginTop: 110
  },
  rumahdetail: {
    color: "#757575",
    fontSize: 10
  },
  transferdetail: {
    color: "#757575",
    fontSize: 12
  },
  divider: {
    marginTop: 10
  },
  body: {
    borderRadius: 0,
    padding: 16,
    marginBottom: 8
  },
  grid: { padding: 0 },

  stickToBottom: {
    width: "100%",
    maxWidth: 442,
    position: "fixed",
    bottom: 0,
    padding: "auto",
    backgroundColor: "white",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
  },
  fullPaper: {
    maxWidth: 442,
    marginLeft: "-0.5%",
    position: "absolute",
    bottom: 0,
    // maxHeight: 350,
    maxHeight: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  btnCoppy: {
    marginLeft: 30,
    maxWidth: 50,
    minWidth: 50,
    maxHeight: 30,
    minHeight: 30,
    [theme.breakpoints.up("md")]: {
      marginLeft: 65
    }
  },
  gridText: {
    padding: "4% 4% 0% 4%",
    width: "100%",
    maxWidth: 450
  },
  text: {
    fontSize: 13
  },
  shipmentMethodItemsText: {
    fontSize: 12,
    fontWeight: 500
  },
  voucher: {
    marginBottom: 8
  },
  content: {
    fontSize: 12,
    fontWeight: 600,
    color: "white"
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end"
  },
  buttonVoucher: {
    height: 25,
    width: 88,
    background: "#A6A6A6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 600,
    color: "white"
  },
  flagButton: {
    border: "unset",
    "&:focus": {
      outline: "unset"
    }
  },
  buttonContainer: {
    padding: "0px 15px",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },
  buttonError: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    color: process.env.REACT_APP_COLOR_FONT || "#000000",
    width: "100%",
    maxWidth: 414,
    fontWeight: 700
  },
  voucherInfo: {
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    padding: 10
  }
});

export default styles;
