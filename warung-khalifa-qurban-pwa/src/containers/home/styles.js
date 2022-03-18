const styles = theme => ({
  container: {
    padding: 0,
    minHeight: "100vh",
    height: "100%",
    maxWidth: 444,
    backgroundColor: "#FAFAFA",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    paddingBottom: 56
  },
  scrollingWrapper: {
    padding: "8px 2px",
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
    "-webkit-overflow-scrolling": "touch",
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent"
    },
    "&::-webkit-scrollbar": {
      height: 1
    },
    backgroundColor: "#fff",
    height: "110%"
  },
  sliderMarginEnd: {
    flex: "0 0 auto",
    width: "1px"
  },
  moreText: {
    color: "#2F9CF1",
    fontSize: 10,
    fontWeight: "bold",
    "@media (max-width:375px)": {
      fontSize: "9px !important"
    },
    cursor: "pointer"
  },
  fullPaper: {
    maxWidth: 442,
    marginLeft: "-0.5%",
    bottom: 0,
    maxHeight: "70vh",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  header: {
    position: "fixed",
    height: 70,
    maxWidth: 420,
    backgroundColor: "white",
    margin: "10px 10px 0px",
    width: "100%"
  },
  contentWrapper: {
    position: "absolute",
    marginTop: 130,
    backgroundColor: "white",
    maxWidth: 444,
    width: "100%",
    borderRadius: "20px 20px 0 0",
    padding: 16,
    paddingBottom: 70,
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  divider: {
    backgroundColor: "#E8E8E8",
    height: 3,
    opacity: 0.5,
    margin: "16px 0"
  }
});

export default styles;
