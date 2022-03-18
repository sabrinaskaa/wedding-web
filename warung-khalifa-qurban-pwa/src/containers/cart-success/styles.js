const styles = theme => ({
  typography: {
    color: "black",
    width: "50%"
  },
  container: {
    marginTop: 50,
    marginBottom: 0,
    padding: 0,
    maxWidth: 444,
    minHeight: "100vh",
    height: "100%",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    padding: "auto"
  },
  paperbtn: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 442,
    borderRadius: 0
  },
  button: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    color: "white",
    textTransform: "none"
  },
  paper: {
    borderRadius: 0
  }
});
export default styles;
