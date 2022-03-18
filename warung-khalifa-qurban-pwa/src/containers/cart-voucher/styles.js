const styles = theme => ({
  container: {
    paddingTop: 106,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    maxWidth: 444,
    minHeight: "100vh",
    height: "100%",
    backgroundColor: "white",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    cursor: "pointer"
  },
  notFoundWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50vh",
    textAlign: "center"
  },
  appBar: {
    left: "auto",
    right: "auto"
  },
  searchDiv: {
    height: 40,
    width: "100%",
    borderRadius: 8,
    padding: "8px 16px ",
    backgroundColor: "#F1F2F6",
    display: "flex",
    alignItems: "center",
    zIndex: 999,
    marginTop: 16
  },
  searchIcon: {
    color: "#707585",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    marginLeft: 32,
    color: "inherit",
    width: "100%",
    height: "100%"
  },
  inputInput: {
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    fontSize: "14px !important",
    fontWeight: 500,
    color: "#808080"
  }
});

export default styles;
