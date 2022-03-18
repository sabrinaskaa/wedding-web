const styles = theme => ({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: "14px 11px",
    margin: "8px 0px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
  },
  wrapper: {
    "@media (max-width: 430px)": {
      minHeight: 95
    },
    "@media (max-width: 320px)": {
      minHeight: 90
    }
  },
  media: {
    borderRadius: 8,
    height: 125,
    width: 125,
    display: "flex",
    "@media (max-width: 430px)": {
      width: 104,
      height: 104
    },
    "@media (max-width: 320px)": {
      width: 90,
      height: 90
    }
  },
  priceWrapper: {
    height: 35,
    display: "flex",
    flexDirection: "column",
    // "@media (max-width: 430px)": {
    //   marginTop: -16
    // },
    "@media (max-width: 320px)": {
      marginTop: -2
    }
  },
  old: {
    textDecoration: "line-through",
    color: "#C7C7C9",
    "@media (max-width: 430px)": {
      fontSize: 10
    },
    "@media (max-width: 320px)": {
      fontSize: 9
    }
  },
  price: {
    fontWeight: 700,
    fontSize: 13,
    "@media (max-width: 430px)": {
      fontSize: 11
    },
    "@media (max-width: 320px)": {
      fontSize: 10
    }
  },
  unit: {
    fontSize: 10,
    marginLeft: 2,
    "@media (max-width: 430px)": {
      fontSize: 9
    }
  },
  buttonAdd: {
    borderRadius: 5,
    width: 95,
    height: 28,
    fontSize: 13,
    padding: "5px 9px",
    textTransform: "none",
    fontWeight: 700,
    marginTop: 17,
    "@media (max-width: 430px)": {
      width: 85,
      marginTop: 4,
      height: 25
    },
    "@media (max-width: 320px)": {
      width: 70,
      marginTop: 2,
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
    fontSize: 12,
    textAlign: "center",
    width: 95,
    height: 28,
    "@media (max-width: 430px)": {
      width: 85,
      marginTop: 4,
      height: 25
    },
    "@media (max-width: 320px)": {
      width: 70,
      marginTop: 2,
      height: 20,
      fontSize: 10
    }
  },
  addonInfo: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    fontWeight: 700,
    fontSize: 6,
    color: "white",
    textAlign: "center",
    padding: "1px 0px",
    width: 95,
    "@media (max-width: 430px)": {
      width: 85
    },
    "@media (max-width: 320px)": {
      width: 70
    }
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "-webkit-fill-available",
    marginTop: 17,
    "@media (max-width: 430px)": {
      height: 25,
      marginTop: 3,
      marginBottom: 1
    },
    "@media (max-width: 320px)": {
      height: 24,
      marginBottom: -4,
      marginTop: 2
    }
  },
  buttonMinus: {
    maxWidth: 28,
    minWidth: 28,
    maxHeight: 28,
    minHeight: 28,
    fontWeight: 700,
    "@media (max-width: 430px)": {
      maxWidth: 25,
      minWidth: 25,
      maxHeight: 25,
      minHeight: 25
    },
    "@media (max-width: 320px)": {
      maxWidth: 20,
      minWidth: 20,
      maxHeight: 20,
      minHeight: 20,
      marginRight: -6
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
    "@media (max-width: 430px)": {
      maxWidth: 25,
      minWidth: 25,
      maxHeight: 25,
      minHeight: 25
    },
    "@media (max-width: 320px)": {
      maxWidth: 20,
      minWidth: 20,
      maxHeight: 20,
      minHeight: 20,
      marginLeft: -6
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
    marginTop: 17,
    "@media (max-width: 430px)": {
      width: 85,
      marginTop: 4,
      height: 25,
      fontSize: 11
    },
    "@media (max-width: 320px)": {
      width: 70,
      marginTop: 4,
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
    borderRadius: "0px 0px 5px 5px",
    "@media (max-width: 430px)": {
      marginTop: -2
    },
    "@media (max-width: 320px)": {
      marginTop: -7
    }
  }
});

export default styles;
