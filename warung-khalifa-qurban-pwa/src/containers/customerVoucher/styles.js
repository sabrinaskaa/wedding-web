const styles = theme => ({
  container: {
    paddingTop: 64,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    maxWidth: 444,
    minHeight: "100vh",
    height: "100%",
    backgroundColor: "white",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
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
  }
});

export default styles;
