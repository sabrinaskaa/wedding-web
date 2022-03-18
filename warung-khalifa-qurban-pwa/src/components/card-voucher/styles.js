const styles = theme => ({
  card: {
    padding: 16,
    border: "1px solid #F5F5F5",
    borderRadius: 8
  },
  buttonVoucher: {
    fontSize: 12,
    fontWeight: 600,
    color: "white",
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    padding: "4px 8px",
    borderRadius: 4,
    cursor: "pointer",
    height: "fit-content",
    alignItems: "center",
    textAlign: "center"
  },
  titleVoucher: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 5
  },
  voucherWrapper: {
    width: "100%",
    marginBottom: 70
  },
  voucherMessageWrapper: {
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    padding: 10,
    marginBottom: 16
  },
  fullPaper: {
    maxWidth: 442,
    marginLeft: "-0.5%",
    position: "absolute",
    bottom: 0,
    maxHeight: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
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
  syarat: {
    borderRadius: 8,
    border: "1px solid #F5F5F5",
    display: "flex"
  }
});

export default styles;
