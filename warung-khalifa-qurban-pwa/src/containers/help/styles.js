const styles = (theme) => ({
  container: {
    paddingTop: 64,
    paddingBottom: 56,
    maxWidth: 444,
    padding: 0,
    minHeight: "100vh",
    height: "100%",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    // boxShadow:
    //   '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  link: {
    textDecoration: "none",
    color: "black",
    display: "flex",
    justifyContent: "space-between",
  },
  gridList: {
    background: "#FFFFFF",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)",
    padding: 16,
  },
  textLixt: {
    fontSize: 12,
  },
  what: {
    marginTop: 16,
  },
  gridListTwo: {
    background: "#FFFFFF",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)",
    padding: 16,
    marginTop: "3%",
  },
  skeleton: {
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default styles;
