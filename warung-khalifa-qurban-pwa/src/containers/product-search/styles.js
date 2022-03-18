const styles = theme => ({
  div: { marginRight: 70 },
  container: {
    paddingTop: 64,
    marginBottom: 0,
    padding: "0 0px",
    backgroundColor: "#FAFAFA",
    minHeight: "100vh",
    height: "100%",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    marginBottom: 56,
    backgroundColor: "#153b50",
    color: "white"
  },
  root: {
    flexGrow: 1
  },
  appbar: {
    backgroundColor: "white",
    color: "white",
    width: "100%",
    maxWidth: 442,
    position: "fixed",
    top: 0,
    height: 64
  },
  menuButton: {
    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
  },
  title: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: 100,
    backgroundColor: "#F2F2F2",
    marginLeft: 0,
    width: "100%"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#707585"
  },
  clearIcon: {
    right: 12,
    top: 10,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#707585",
    margin: 2
  },
  inputRoot: {
    color: "inherit",
    height: 40,
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1, 2, 1, 6),
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: "10px !important"
  },
  paper: {
    marginTop: 10,
    borderRadius: 0,
    minHeight: "80vh",
    backgroundColor: "#FAFAFA",
    padding: "0 16px",
    paddingBottom: 50
  }
});

export default styles;
