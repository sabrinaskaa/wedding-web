import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 0, 3, 0),
    marginTop: 70
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
  cardMedia: {
    position: "absolute",
    right: 0,
    bottom: 0
  },
  cardMediaDigital: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    width: "103px",
    padding: "5px 10px",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 8,
    borderRadius: "0px 0px 5px 0px"
  },
  dots: {
    display: "none"
  },
  buttonControl: {
    minWidth: "unset"
  }
}));

export default styles;
