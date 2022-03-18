const styles = theme => ({
  empty: { paddingTop: 50 },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    padding: "auto",
    backgroundColor: "white",
    maxWidth: 442
  },

  Button: {
    minHeight: 50
  },
  pesan: { backgroundColor: "#ED6B5A", color: "white" },
  button: { backgroundColor: "#FF4600", color: "white" },
  paperbtn: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    borderRadius: 0
  },
  container: {
    paddingTop: 64,
    paddingBottom: 169,
    padding: 0,
    minHeight: "100vh",
    height: "100%",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  body: {
    borderRadius: 0
  },
  caption: {
    color: "#616161"
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 4,
    marginLeft: 8,
    color: "#153b50"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    overflow: "auto"
  }
});
export default styles;
