const styles = theme => ({
  paper: {
    borderRadius: 10,
    padding: "14px 11px",
    margin: "8px 16px",
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
  bgpaper: {
    height: 500
  },
  image: {
    width: 50,
    height: 50
  },
  descWrapper: {
    paddingLeft: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    "@media (width: 430px)": {
      paddingLeft: "unset"
    }
  },
  img: {
    borderRadius: 8,
    height: 125,
    width: 125,
    display: "flex",
    "@media (max-width: 430px)": {
      width: 100,
      height: 100
    },
    "@media (max-width: 320px)": {
      width: 90,
      height: 90
    }
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "-webkit-fill-available",
    "@media (max-width: 430px)": {
      height: 24,
      marginTop: -8
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
    fontSize: 12
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
  cardMediaDigital: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    width: "100%",
    padding: "5px 10px",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 8,
    borderRadius: "0px 0px 5px 5px"
  },
  cardMedia: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    width: "100%",
    justifyContent: "flex-end"
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
    marginLeft: 2
  }
});

export default styles;
