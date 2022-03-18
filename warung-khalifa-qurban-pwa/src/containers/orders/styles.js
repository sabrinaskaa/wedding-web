const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: 64,
    paddingBottom: 56,
    padding: 0,
    backgroundColor: "white",
    minHeight: "100vh",
    height: "100%",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
  },
  menunggu: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "silver",
    color: "black",
  },
  proses: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFAA00",
    color: "black",
  },
  paper: {
    borderRadius: 0,
    backgroundColor: "white",
    width: "100%",
    // marginTop: 60
  },
});

export default styles;
