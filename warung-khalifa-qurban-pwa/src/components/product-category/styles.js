const styles = theme => ({
  container: {
    width: "100%",
    padding: 16
  },
  boxCategories: {
    width: 64,
    height: 64,
    backgroundColor: "white",
    borderRadius: 10,
    border: "1px solid #E8E8E8",
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 6,
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease 0s",
    "&:hover": {
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
    },
    "@media (max-width:443px)": {
      width: 50,
      height: 50,
      marginRight: 8,
      marginLeft: 8,
      fontSize: 10
    },
    "@media (max-width:388px)": {
      width: 50,
      height: 50,
      fontSize: 9
    },
    "@media (max-width:363px)": {
      width: 47,
      height: 47,
      marginRight: 4,
      marginLeft: 4
    },
    "@media (max-width:320px)": {
      width: 45,
      height: 45
    }
  },
  imageCategories: {
    width: "100%",
    height: "100%"
  },
  boxGridCategories: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 6,
    cursor: "pointer",
    textAlign: "center"
  },
  textCategoriesTitle: {
    fontWeight: 500,
    color: "#707585",
    fontSize: 13,
    textAlign: "center",
    margin: "0px 5px",
    "@media (max-width:440px)": {
      fontSize: 10
    },
    "@media (max-width:375px)": {
      fontSize: 8
    }
  }
});

export default styles;
