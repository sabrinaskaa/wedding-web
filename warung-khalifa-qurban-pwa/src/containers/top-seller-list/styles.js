const styles = theme => ({
  container: {
    paddingTop: 64,
    marginBottom: 0,
    padding: 0,
    minHeight: "100vh",
    height: "100%",
    backgroundColor: "#FAFAFA",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  button: {
    backgroundColor: "#153b50",
    color: "white"
  },
  card: {
    borderRadius: 8,
    margin: 10
  },
  media: {
    borderRadius: 8,
    height: 115,
    width: 115,
    "@media (max-width:375px)": {
      width: 85
    },
    display: "flex"
  },
  title: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    height: 55
  },
  old: {
    textDecoration: "line-through",
    color: "grey"
  },
  price: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20
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
    paddingRight: 4
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  cardMedia: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "-webkit-fill-available"
  },
  cardContent: {
    padding: 4
  },

  paper: {
    borderRadius: 0
  }
});

export default styles;
