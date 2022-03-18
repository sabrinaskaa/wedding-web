const styles = theme => ({
  media: {
    height: 400,
    borderRadius: 5
  },
  title: {
    color: "#252525",
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 6
  },
  old: {
    textDecoration: "line-through",
    color: "grey",
    marginRight: 10,
    fontSize: 10
  },
  price: {
    color: "#25282B",
    fontWeight: 700,
    fontSize: 13
  },
  unit: {
    color: "#25282B",
    fontSize: 10,
    marginLeft: 2,
    marginTop: 3
  },
  container: {
    padding: 0,
    paddingTop: 64,
    marginBottom: 0,
    height: "100vh",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  cardMediaTitle: {
    color: process.env.REACT_APP_COLOR_FONT || "#000000",
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    width: "fit-content",
    height: 42,
    fontWeight: "bold",
    fontSize: 17,
    borderRadius: "0 0 10px 0",
    padding: "8px 12px",
    opacity: 0.9,
    margin: 0
    // marginBottom: 226,
  },
  descript: {
    padding: 20
  },
  paper: {
    borderRadius: 0,
    height: "100%",
    maxWidth: 444
  },
  card: {
    minHeight: 600,
    borderRadius: 0
  },
  btn: {
    justifyContent: "space-between",
    display: "flex",
    marginBottom: 10
  },
  box: {
    marginTop: 8,
    padding: 4
  },
  stickToBottom: {
    width: "100%",
    maxWidth: 442,
    position: "fixed",
    bottom: 0,
    padding: "auto",
    backgroundColor: "white"
  },
  paperbtn: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 442,
    borderRadius: 0
  },
  button: { backgroundColor: "#ED6B5A", color: "white" },

  buttonAddon: {
    padding: "4px 12px",
    border: "1px solid",
    borderColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    fontWeight: 600,
    fontSize: 12,
    textAlign: "center"
  },
  addonInfo: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    fontWeight: 700,
    fontSize: 6,
    color: "white",
    textAlign: "center",
    padding: "1px 0px"
  }
});

export default styles;
