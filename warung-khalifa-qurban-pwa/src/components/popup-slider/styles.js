import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  root: {
    marginTop: 64
  },
  wrapper: {
    position: "relative",
    marginTop: -64
    // paddingTop: 16,
  },
  slide: {
    padding: 8,
    marginRight: 20,
    color: "#000"
  },
  contentWrapper: {
    width: "100%",
    padding: "8px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  },
  headWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  capacity: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  priceWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  slider: {
    backgroundColor: "green"
  },
  closeWrapper: {
    position: "absolute",
    right: 5,
    top: 5
  },
  close: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: "100%",
    display: "flex",
    cursor: "pointer"
  },
  dots: {
    display: "none"
  },
  buttonControl: {
    minWidth: "unset"
  },
  buttonWrapper: {
    padding: "0px 16px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  buttonPopup: {
    color: "white",
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    borderRadius: 8,
    padding: 8,
    textAlign: "center",
    fontWeight: 700,
    textTransform: "uppercase",
    cursor: "pointer",
    width: "100%",
    fontSize: 12
  }
}));

export default styles;
