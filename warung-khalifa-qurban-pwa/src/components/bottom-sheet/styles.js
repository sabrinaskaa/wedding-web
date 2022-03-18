const styles = theme => ({
  stickToBottom: {
    width: "100%",
    maxWidth: 442,
    position: "fixed",
    bottom: 0,
    padding: "auto",
    backgroundColor: "white",
    borderTop: "1px solid #f1f1f1"
  },
  paperbtn: {
    padding: theme.spacing(2),
    borderRadius: 0
  },
  button: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    color: process.env.REACT_APP_COLOR_FONT || "#000000"
  }
});
export default styles;
