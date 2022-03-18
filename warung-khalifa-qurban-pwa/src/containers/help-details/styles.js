const styles = (theme) => ({
  container: {
    paddingTop: 64,
    // marginBottom: 56,
    maxWidth: 444,
    padding: 0,
    minHeight: "100vh",
    height: "100%",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    // boxShadow:
    //   '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  box: {
    paddingTop: 15,
    padding: 8,
  },
  stickToBottom: {
    width: "100%",
    position: "static",
    bottom: 0,
    fontSize: "small",
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  question: {
    padding: "5% 5% 3% 5%",
  },
  textQuestion: {
    fontSize: 13,
    maxWidth: 444,
  },
  textContainer: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)",
    padding: "5%",
  },
  textContainerTwo: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)",
    padding: "5%",
    marginTop: "4%",
  },
  bg: {
    backgroundColor: "#F2F2F2",
    padding: "3%",
    borderRadius: 5,
    color: "#9FA3A6",
  },
  skeleton: {
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default styles;
