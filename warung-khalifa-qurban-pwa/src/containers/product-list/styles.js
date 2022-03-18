const styles = (theme) => ({
  container: {
    padding: 0,
    minHeight: "100vh",
    height: "100%",
    backgroundColor: "#FAFAFA",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
  },
  button: {
    backgroundColor: "#153b50",
    color: "white",
  },
  card: {
    borderRadius: 8,
    margin: 10,
  },
  media: {
    height: 160,
  },
  title: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    height: 55,
  },
  old: {
    textDecoration: "line-through",
    color: "grey",
  },
  price: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20,
  },
  cardMediaTitle: {
    color: "white",
    backgroundColor: "#FF4600",
    width: "fit-content",
    fontWeight: "bold",
    fontSize: 17,
    borderRadius: 3,
    opacity: 0.9,
    marginBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  cardMedia: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "-webkit-fill-available",
  },
  cardContent: {
    padding: 4,
  },
  cusappbar: {
    top: 64,
    marginBottom: 5,
    position: "fixed",
    width: "100%",
    maxWidth: 442,
    padding: 0,
  },
  appbarWrapper: {
    marginBottom: 10,
    width: "100%",
    maxWidth: 442,
    minHeight: 112,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.12)",
    position: "fixed",
    zIndex: 99,
  },
  appbarRoot: {
    minHeight: 64,
  },
  grid: {},
  paper: {
    borderRadius: 0,
    backgroundColor: "#FAFAFA",
    paddingTop: 115,
  },
  tab: {
    "@media(min-width: 960px)": {
      minWidth: 90,
    },
  },
  tabCustom: {
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: 700,
  },
});

export default styles;
