const styles = theme => ({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: "14px 11px",
    margin: "8px 16px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
  },
  media: {
    borderRadius: 8,
    height: 125,
    width: 125,
    display: "flex",
    "@media (max-width: 375px)": {
      width: 99,
      height: "100%"
    },
    "@media (max-width: 320px)": {
      width: 92,
      height: "100%"
    }
  },
  priceWrapper: {
    height: 35,
    "@media (max-width: 375px)": {
      marginTop: -16
    },
    "@media (max-width: 320px)": {
      marginTop: -16
    }
  },
  old: {
    textDecoration: "line-through",
    color: "#C7C7C9",
    "@media (max-width: 320px)": {
      fontSize: 11
    }
  },
  price: {
    fontWeight: 700,
    fontSize: 13,
    "@media (max-width: 320px)": {
      fontSize: 12
    }
  },
  unit: {
    fontSize: 10,
    marginLeft: 2
  },
  buttonAdd: {
    borderRadius: 5,
    width: 95,
    height: 28,
    fontSize: 13,
    padding: "5px 9px",
    textTransform: "none",
    fontWeight: 700,
    "@media (max-width: 375px)": {
      width: 85,
      marginTop: -12,
      height: 25
    },
    "@media (max-width: 320px)": {
      width: 70,
      marginTop: -12,
      height: 20,
      fontSize: 12
    }
  },
  buttonAddon: {
    padding: "4px 12px",
    border: "1px solid",
    borderColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    fontWeight: 600,
    fontSize: 12
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
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "-webkit-fill-available",
    "@media (max-width: 375px)": {
      marginTop: -7
    }
  },
  buttonMinus: {
    maxWidth: 28,
    minWidth: 28,
    maxHeight: 28,
    minHeight: 28,
    fontWeight: 700,
    "@media (max-width: 375px)": {
      maxWidth: 25,
      minWidth: 25,
      maxHeight: 25,
      minHeight: 25
    },
    "@media (max-width: 320px)": {
      maxWidth: 20,
      minWidth: 20,
      maxHeight: 20,
      minHeight: 20
    }
  },
  buttonQty: {
    border: "0",
    fontWeight: 800,
    fontSize: 12,
    "@media (max-width: 320px)": {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  buttonPlus: {
    maxWidth: 28,
    minWidth: 28,
    maxHeight: 28,
    minHeight: 28,
    fontWeight: 700,
    "@media (max-width: 375px)": {
      maxWidth: 25,
      minWidth: 25,
      maxHeight: 25,
      minHeight: 25
    },
    "@media (max-width: 320px)": {
      maxWidth: 20,
      minWidth: 20,
      maxHeight: 20,
      minHeight: 20
    }
  },
  buttonEmpty: {
    borderRadius: 5,
    width: 95,
    padding: "5px 9px",
    height: 28,
    fontSize: 13,
    textTransform: "none",
    fontWeight: 700,
    "@media (max-width: 375px)": {
      width: 85,
      marginTop: -12,
      height: 25,
      fontSize: 11
    },
    "@media (max-width: 320px)": {
      width: 70,
      marginTop: -12,
      height: 20,
      fontSize: 9
    }
  },
  cardMedia: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    margin: 0,
    width: "100%"
  },
  cardMediaDisc: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    color: process.env.REACT_APP_COLOR_FONT || "#000000",
    width: "fit-content",
    padding: "8px",
    fontWeight: "bold",
    fontSize: 10,
    borderRadius: "5px 0 5px 0",
    opacity: 0.8,
    marginTop: 0,
    marginBottom: 46
  },
  cardMediaDigital: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    width: "100%",
    padding: "5px 10px",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 8,
    borderRadius: "0px 0px 5px 5px"
  }
});

export default styles;
