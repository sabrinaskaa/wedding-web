const styles = theme => ({
  container: {
    padding: 0,
    height: "100vh",
    background: "#FBFDFF",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  appbar: {
    width: "100%",
    maxWidth: 442,
    position: "fixed",
    top: 0,
    minHeight: 120,
    background: "white",
    zIndex: 0,
    boxShadow: " 0px 1px 5px rgba(0, 0, 0, 0.05)"
  },
  backButton: {
    marginRight: 0,
    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
  },
  input: {
    marginBottom: 10,
    background: "#F2F2F2",
    borderRadius: 100,
    padding: "2%",
    display: "flex",
    alignItems: "center",
    marginTop: "3%"
  },
  baseInput: {
    color: "#707585",
    fontSize: 12,
    paddingLeft: "2%",
    width: "90%"
  },
  textLok: {
    marginTop: 10,
    paddingRight: 0,
    color: "black",
    fontSize: 12,
    fontWeight: 600
  },
  textLokasi: {
    paddingRight: 0,
    color: "black",
    fontSize: 12,
    fontWeight: 600
  },
  gridPasar: {
    paddingTop: 136
  },
  Kosong: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    justifyContent: "center"
  },
  dialog: {
    fontSize: 14
  },
  ganti: {
    fontSize: 12
  },
  gantiText: {
    fontSize: 12,
    paddingTop: "5%"
  }
});
export default styles;
