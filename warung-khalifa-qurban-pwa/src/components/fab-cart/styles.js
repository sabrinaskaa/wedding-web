const styles = theme => ({
  stickToBottom: {
    width: "100%",
    maxWidth: 442,
    position: "fixed",
    bottom: 30,
    backgroundColor: "white",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 0
  },
  fab: {
    marginTop: -10,
    maxHeight: 100,
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    color: "white",
    width: "100%",
    borderRadius: 5
  },
  badge: {
    margin: 16
  }
});

export default styles;
