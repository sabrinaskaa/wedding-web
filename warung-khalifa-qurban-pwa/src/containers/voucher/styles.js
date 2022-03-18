const styles = theme => ({
  root: {},
  container: {
    paddingTop: 55,
    padding: 0,
    minHeight: "100vh",
    height: "100%",
    backgroundColor: "white",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  body: {
    borderRadius: 0
  },
  addVoucher: {
    width: "100%",
    padding: "35px 0px 20px",
    height: 250
  },
  content: {
    padding: "0px 61px",
    display: "flex",
    flexDirection: "column"
  },
  searchWrapper: {
    padding: "0px 16px 80px"
  },
  searchDiv: {
    marginTop: 16,
    height: 45,
    width: "100%",
    borderRadius: 10,
    padding: "8px 16px ",
    backgroundColor: "#F1F2F6",
    display: "flex",
    alignItems: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    height: "100%"
  },
  inputInput: {
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    fontSize: "14px !important"
  },
  button: {
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 45
  },
  appBar: {
    left: "auto",
    right: "auto"
  },
  titleVoucherError: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 5
  },
  voucherErrorWrapper: {
    width: "100%",
    marginBottom: 70
  },
  voucherMessageWrapper: {
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    padding: 10
  }
});
export default styles;
