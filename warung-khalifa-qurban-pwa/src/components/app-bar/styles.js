const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appbar: {
    width: "100%",
    maxWidth: 442,
    position: "fixed",
    top: 0,
    maxHeight: 120,
    boxShadow: " 0px 1px 5px rgba(0, 0, 0, 0.05)",
    zIndex: 999
  },
  appbar2: {
    background: "white",
    color: "white",
    width: "100%",
    maxWidth: 442,
    position: "fixed",
    top: 0,

    zIndex: 99
  },
  menuButton: {
    color: "#9FA3A6"
  },
  backButton: {
    marginRight: 0,
    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
  },
  title: {
    flexGrow: 1,
    fontSize: 14,
    fontWeight: 600
  },
  select: {},
  search: {
    position: "relative",
    borderRadius: 50,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white"
    },
    marginLeft: 0,
    width: "100%"

    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(1),
    //   width: 'auto'
    // }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    height: 40
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%"
  }
});

export default styles;
