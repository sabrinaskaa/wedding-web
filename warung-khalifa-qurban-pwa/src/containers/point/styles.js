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
  AppBarWrapper: {
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
    position: "fixed",
    width: "100%",
    maxWidth: 443,
    zIndex: 40,
    minHeight: 110,
    backgorundColor: "white"
  },
  headerPoint: {
    padding: "0px 16px 16px",
    backgroundColor: "white",
    position: "fixed",
    width: "100%",
    maxWidth: 443,
    zIndex: 999,
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  text: {
    fontSize: 14,
    fontWeight: 600
  },
  button: {
    padding: "4px 8px",
    backgroundColor: "#2DBE78",
    borderRadius: 4,
    color: "white",
    fontWeight: 600,
    fontSize: 12,
    cursor: "pointer"
  },
  skeleton: {
    marginBottom: 10,
    borderRadius: 4
  },
  points: {
    overflow: "hidden",
    fontSize: 30,
    fontWeight: 600,
    marginLeft: 12,
    width: 260,
    "@media (max-width: 425px)": {
      width: 205,
      fontSize: 26
    },
    "@media (max-width: 375px)": {
      width: 190,
      fontSize: 26
    },
    "@media (max-width: 320px)": {
      width: 150,
      fontSize: 26
    }
  },
  poinWave: {
    marginBottom: 10,
    borderRadius: 4,
    marginLeft: 8
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
